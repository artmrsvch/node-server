import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { isLoadingNewsFormSelector, createNews, updateNews, newsListSelector } from '../../store/news';
import { withStyles } from '@material-ui/styles';
import { Paper, Grid, TextField, ButtonGroup, Button } from '@material-ui/core';
import ButtonLink from '../common/ButtonLink';
import routes from '../../constants/routes';

const styles = theme => ({
  formCard: {
    padding: theme.spacing(2)
  },
  textField: {
    display: 'block',
    width: '100%'
  }
});

class NewsAdd extends PureComponent {
  state = {
    title: '',
    text: '',
    createdAt: new Date(),
    user: ''
  };
  componentDidMount() {
    const { match, newsList } = this.props;
    if (match.params.id) {
      const { title, text, created_at, user } = newsList.find(news => news.id === match.params.id)
      this.setState({
        title,
        text,
        createdAt: created_at,
        user: user.username
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, text } = this.state;
    const { history, dispatch, match } = this.props;
    dispatch(match.params.id ? updateNews({ title, text, id: match.params.id }) : createNews({ title, text })).then(() => history.push(routes.news));
  };
  render() {
    const { classes } = this.props;
    const { title, text, createdAt, user } = this.state;
    return (
      <Paper
        className={classes.formCard}
        component="form"
        onSubmit={this.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Автор"
              value={user}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              disabled
              fullWidth
            />
            <TextField
              label="Дата"
              value={createdAt}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              disabled
              fullWidth
            />
            <TextField
              label="Заголовок"
              name="title"
              value={title}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Текст"
              name="text"
              value={text}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
              multiline
              fullWidth
              rows={5}
            />
            <ButtonGroup>
              <Button variant="contained" color="secondary" type="submit">
                Сохранить
              </Button>
              <ButtonLink path="/news" variant="contained">
                Отменить
              </ButtonLink>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: isLoadingNewsFormSelector(state),
  newsList: newsListSelector(state)
});
export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(NewsAdd);
