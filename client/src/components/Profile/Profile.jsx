import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  TextField,
  CardActions
} from '@material-ui/core';
import AspectRatio from 'react-aspect-ratio';
import PasswordInput from '../common/PasswordInput';
import { withStyles } from '@material-ui/styles';
import { userProfileSelector, saveProfile, isLoadingUserProfileSelector } from '../../store/auth';

const styles = theme => ({
  wrapper: {
    width: '100%',
    flex: '1 1 100%',
    paddingTop: '40px'
  },
  formCard: {
    padding: theme.spacing(2)
  },
  avatarPreview: {
    width: '100%',
    height: '100%',
    borderRadius: '8px'
  },
  avatarPreviewWrapper: {
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  uploadButton: {
    display: 'block',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formActions: {
    marginTop: 'auto',
    padding: 0
  }
});

class Profile extends PureComponent {
  state = {
    firstName: '',
    middleName: '',
    surName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    image: '',
    fileRef: React.createRef()
  };

  componentDidMount() {
    const { userProfile } = this.props;
    this.setState({
      firstName: userProfile.firstName,
      middleName: userProfile.middleName,
      surName: userProfile.surName,
      image: userProfile.image
    });
  }

  cancelHandler = () => {
    const { userProfile } = this.props;
    this.setState({
      firstName: userProfile.firstName,
      middleName: userProfile.middleName,
      surName: userProfile.surName,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      image: userProfile.image
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeFile = () => {
    const { fileRef } = this.state;

    const reader = new FileReader();

    reader.onload = e => {
      this.setState({ image: e.target.result });
    };

    fileRef.current.files[0] && reader.readAsDataURL(fileRef.current.files[0]);
  };

  submitHandler = () => {
    const { dispatch } = this.props;
    const { firstName, surName, middleName, oldPassword, newPassword, fileRef } = this.state;
    dispatch(
      saveProfile({
        firstName,
        surName,
        middleName,
        oldPassword,
        newPassword,
        avatar: fileRef.current.files[0] || null
      })
    ).then(() => {
      this.cancelHandler();
    });
  };

  render() {
    const { classes, isLoading } = this.props;
    const {
      firstName,
      surName,
      middleName,
      oldPassword,
      newPassword,
      confirmPassword,
      image,
      fileRef
    } = this.state;
    return (
      <div className={classes.wrapper}>
        <Container>
          <Paper className={classes.formCard}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <AspectRatio className={classes.avatarPreviewWrapper}>
                  <Avatar
                    className={classes.avatarPreview}
                    src={image || '/assets/img/no-user-image-big.png'}
                  ></Avatar>
                </AspectRatio>
                <Button
                  className={classes.uploadButton}
                  variant="contained"
                  component="label"
                  color="primary"
                >
                  Выбрать файл
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileRef}
                    onChange={this.handleChangeFile}
                  />
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Grid container direction="column" style={{ height: '100%' }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Общая информация
                  </Typography>
                  <div className={classes.form}>
                    <TextField
                      label="Фамилия"
                      className={classes.textField}
                      margin="normal"
                      name="surName"
                      value={surName}
                      onChange={this.handleChange}
                    />
                    <TextField
                      label="Имя"
                      className={classes.textField}
                      margin="normal"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleChange}
                    />
                    <TextField
                      label="Отчество"
                      className={classes.textField}
                      margin="normal"
                      name="middleName"
                      value={middleName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Пароль
                  </Typography>
                  <div className={classes.form}>
                    <PasswordInput
                      label="Старый пароль"
                      className={classes.textField}
                      name="oldPassword"
                      value={oldPassword}
                      handleChange={this.handleChange}
                    />
                    <PasswordInput
                      label="Новый пароль"
                      className={classes.textField}
                      name="newPassword"
                      value={newPassword}
                      handleChange={this.handleChange}
                    />
                    <PasswordInput
                      label="Подтверждение пароля"
                      className={classes.textField}
                      name="confirmPassword"
                      value={confirmPassword}
                      handleChange={this.handleChange}
                    />
                  </div>
                  <CardActions className={classes.formActions}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isLoading}
                      onClick={this.submitHandler}
                    >
                      Сохранить
                    </Button>
                    <Button variant="outlined" onClick={this.cancelHandler} disabled={isLoading}>
                      Сбросить
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: userProfileSelector(state),
  isLoading: isLoadingUserProfileSelector(state)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Profile);
