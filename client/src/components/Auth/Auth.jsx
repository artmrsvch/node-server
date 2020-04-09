import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { isAuthorizedSelector } from '../../store/auth';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import LogoutForm from './LogoutForm';

const styles = () => ({
  wrapper: {
    background: 'url("/assets/img/background.png") no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '100%',
    flex: '1 1 100%',
    paddingTop: '40px'
  }
});

class Auth extends PureComponent {
  render() {
    const { classes, isAuthorized } = this.props;
    return (
      <div className={classes.wrapper}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ваше уютное
            <br />
            рабочее пространство
          </Typography>
          {isAuthorized ? (
            <LogoutForm />
          ) : (
            <>
              <Route path="/" exact component={LoginForm} />
              <Route path="/registration" component={RegistrationForm} />
            </>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withRouter
)(Auth);
