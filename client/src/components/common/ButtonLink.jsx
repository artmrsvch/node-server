import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const ButtonLink = withRouter(
  ({ path, location, children, isRouterLink, color = 'primary' }) => (
    <Button
      color={
        isRouterLink ? (location.pathname === path ? color : 'default') : color
      }
      component={AdapterLink}
      to={path}
    >
      {children}
    </Button>
  )
);

export default ButtonLink;
