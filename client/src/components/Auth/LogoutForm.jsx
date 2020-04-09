import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { logout } from '../../store/auth';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
    maxWidth: '300px'
  }
});
const LogoutForm = ({ classes, dispatch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(logout());
  };
  return (
    <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
      <Button color="primary" variant="contained" type="submit">
        Выйти
      </Button>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  connect()
)(LogoutForm);
