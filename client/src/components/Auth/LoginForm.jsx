import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Paper, Button } from '@material-ui/core';
import AuthFormInput from '../common/AuthFormInput';
import PasswordInput from '../common/PasswordInput';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { compose } from 'recompose';
import { loginUser } from '../../store/auth';
import routes from '../../constants/routes';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
    maxWidth: '300px'
  },
  textCenter: {
    textAlign: 'center'
  }
});

const LoginForm = ({ classes, dispatch }) => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const { username, password } = values;
    dispatch(loginUser({ username, password }));
  };
  return (
    <>
      <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
        <AuthFormInput
          handleChange={handleChange('username')}
          value={values.username}
          id="username"
          label="Имя пользователя"
          required
        />
        <PasswordInput
          handleChange={handleChange('password')}
          value={values.password}
          id="password"
          label="Пароль"
        />
        <Button color="primary" variant="contained" type="submit">
          Войти
        </Button>
      </Paper>
      <Typography className={classNames(classes.textCenter, classes.form)}>
        Впервые на сайте? <Link to={routes.registration}>Регистрация</Link>
      </Typography>
    </>
  );
};

export default compose(
  withStyles(styles),
  connect()
)(LoginForm);
