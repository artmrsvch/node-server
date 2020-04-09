import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';
import {
  userPermissionsSelector,
  isAuthorizedSelector
} from '../../store/auth';
import routes from '../../constants/routes';
const PrivateRoute = ({
  permissionPath,
  path,
  component,
  permissions,
  isAuthorized
}) => {
  if (!isAuthorized || (permissionPath && !_.get(permissions, [permissionPath, 'R'], false)))
    return <Redirect from={path} to={routes.home} />;

  return <Route path={path} component={component} />;
};

export default connect(state => ({
  permissions: userPermissionsSelector(state),
  isAuthorized: isAuthorizedSelector(state)
}))(PrivateRoute);
