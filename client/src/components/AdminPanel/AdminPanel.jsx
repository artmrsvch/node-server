import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _cloneDeep from 'lodash/cloneDeep';
import {
  isLoadingUsersSelector,
  usersSelector,
  getUsers,
  updateUserPermission,
  deleteUser
} from '../../store/adminPanel';
import {
  Container,
  Avatar,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SettingsFormGroup from './AdminPanelSettingsFormGroup';

const styles = theme => ({
  wrapper: {
    width: '100%',
    flex: '1 1 100%',
    paddingTop: '40px'
  },
  formCard: {
    padding: theme.spacing(2)
  },
  userSelect: {
    width: '100%'
  },
  userAvatar: {
    marginRight: theme.spacing(2)
  },
  mb3: {
    marginBottom: theme.spacing(3)
  }
});

const defaultState = {
  selectedUserId: '',
  selectedUser: null,
  permission: {
    chat: {
      C: true,
      R: true,
      U: false,
      D: false
    },
    news: {
      C: true,
      R: true,
      U: false,
      D: false
    },
    settings: {
      C: true,
      R: true,
      U: false,
      D: false
    }
  }
};

class AdminPanel extends PureComponent {
  state = defaultState;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUsers());
  }

  handleChange = part => partRule => event => {
    const { checked } = event.target;
    const { permission } = this.state;
    this.setState({
      permission: {
        ...permission,
        [part]: { ...permission[part], [partRule]: checked }
      }
    });
  };
  handleChangeUser = event => {
    const { users } = this.props;
    const { value } = event.target;
    const selectedUser = value ? _cloneDeep(users.find(u => u.id === value)) : null;
    this.setState({
      selectedUserId: value,
      selectedUser,
      permission: selectedUser.permission
    });
  };

  submitHandler = () => {
    const { permission, selectedUserId } = this.state;
    const { dispatch } = this.props;
    dispatch(updateUserPermission(selectedUserId, permission));
  };

  cancelHandler = () => {
    const { users } = this.props;
    const { selectedUserId } = this.state;
    const selectedUser = _cloneDeep(users.find(u => u.id === selectedUserId));
    selectedUserId &&
      this.setState({
        selectedUser,
        permission: selectedUser.permission
      });
  };

  deleteHandler = () => {
    const { selectedUserId } = this.state;
    const { dispatch } = this.props;
    selectedUserId && dispatch(deleteUser(selectedUserId)).then(() => this.setState(defaultState));
  };

  render() {
    const { classes, users } = this.props;
    const { selectedUserId, selectedUser } = this.state;
    return (
      <div className={classes.wrapper}>
        <Container>
          <Paper className={classes.formCard}>
            <Grid container wrap="nowrap" alignItems="center" className={classes.mb3}>
              <Avatar
                src={(selectedUser && selectedUser.image) || '/assets/img/no-user-image.png'}
                className={classes.userAvatar}
              ></Avatar>
              <FormControl className={classes.userSelect}>
                <InputLabel htmlFor="age-simple">Выберите пользователя</InputLabel>
                <Select value={selectedUserId} onChange={this.handleChangeUser}>
                  <MenuItem value={null}>Не выбран</MenuItem>
                  {users.map(user => (
                    <MenuItem value={user.id} key={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {selectedUser && this.renderForms()}
          </Paper>
        </Container>
      </div>
    );
  }
  renderForms() {
    const { classes } = this.props;
    const { permission } = this.state;
    return (
      <>
        <Grid container spacing={2} className={classes.mb3}>
          <Grid item xs={4}>
            <SettingsFormGroup
              label="Настройки системы"
              values={permission['settings']}
              handleChange={this.handleChange('settings')}
            />
          </Grid>
          <Grid item xs={4}>
            <SettingsFormGroup
              label="Новости"
              values={permission['news']}
              handleChange={this.handleChange('news')}
            />
          </Grid>
          <Grid item xs={4}>
            <SettingsFormGroup
              label="Чат"
              values={permission['chat']}
              handleChange={this.handleChange('chat')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" alignItems="center">
          <ButtonGroup>
            <Button variant="contained" color="secondary" onClick={this.submitHandler}>
              Сохранить
            </Button>
            <Button variant="contained" onClick={this.cancelHandler}>
              Отменить
            </Button>
            <Button variant="contained" onClick={this.deleteHandler}>
              Удалить пользователя
            </Button>
          </ButtonGroup>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoadingUsersSelector(state),
  users: usersSelector(state)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AdminPanel);
