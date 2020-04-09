import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { AppBar, Toolbar, Container  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ButtonLink from '../common/ButtonLink';
import routes from '../../constants/routes'
import {
  userPermissionsSelector,
  isAuthorizedSelector,
  userProfileSelector
} from '../../store/auth';
import _get from 'lodash.get'

const styles = () => ({
  logo: {
    flexGrow: 1
  }
});

class AppHeader extends PureComponent {
  renderAuthorizedNav() {
    const { permissions, profile } = this.props;
    return (
      <>
        {_get(permissions, 'news.R', false) && (
          <ButtonLink path={routes.news} isRouterLink>
            Новости
          </ButtonLink>
        )}
        {_get(permissions, 'chat.R', false) && (
          <ButtonLink path={routes.chat} isRouterLink>
            Чат
          </ButtonLink>
        )}

        {_get(permissions, 'settings.R', false) && (
          <ButtonLink path={routes.adminPanel} isRouterLink>
            Админка
          </ButtonLink>
        )}
        <ButtonLink path={routes.profile} isRouterLink>
        { profile ? profile.username : '' }
        </ButtonLink>
      </>
    );
  }
  render() {
    const { classes, isAuthorized } = this.props;
    return (
      <div>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Container>
            <Toolbar>
              <div className={classes.logo}>
                <img src="../../assets/img/logo.png" alt="logo" />
              </div>
              <ButtonLink path={routes.home} isRouterLink>
                Главная
              </ButtonLink>
              {isAuthorized ? this.renderAuthorizedNav() : null}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state),
  permissions: userPermissionsSelector(state),
  profile: userProfileSelector(state)
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AppHeader);
