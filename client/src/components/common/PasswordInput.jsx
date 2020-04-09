import React from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff, Https } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
const styles = theme => ({
  textField: {
    display: 200,
    marginBottom: theme.spacing(3)
  }
});

const PasswordInput = withStyles(styles)(
  ({ id, classes, handleChange, value, label, className, name }) => {
    const [values, setValues] = React.useState({
      showPassword: false
    });
    const handleClickShowPassword = () => {
      setValues({ showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
      event.preventDefault();
    };

    return (
      <FormControl
        className={classNames(classes.textField, className)}
        required
      >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          id={id}
          autoComplete={id}
          type={values.showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <Https />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);

export default PasswordInput;
