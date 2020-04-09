import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, CardActions, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import _get from 'lodash.get';
import { sendMessage, setMessageText, chatMessageText } from '../../store/chat';
import { compose } from 'recompose';
import { userProfileSelector, userPermissionsSelector } from '../../store/auth';
const styles = theme => ({
  messageContainer: {
    marginBottom: theme.spacing(2)
  },
  message: {
    padding: theme.spacing(1)
  },
  messagePrimary: {
    backgroundColor: theme.palette.grey.A700
  },
  messageSecondary: {
    backgroundColor: theme.palette.secondary.main
  },
  isMyMessage: {
    alignSelf: 'end'
  },
  isAnotherMessage: {
    alignSelf: 'flex-end'
  },
  chatArea: {
    height: '100%',
    overflowY: 'scroll'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }
});

class ActiveChannelArea extends PureComponent {
  handleChange = event => {
    const { dispatch } = this.props;
    dispatch(setMessageText(event.target.value));
  };
  handleSubmit = event => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(sendMessage());
  };
  render() {
    const { classes, messages, messageText, userId, permission } = this.props;
    const isCreateAllowed = !!_get(permission, 'chat.C', false);
    return (
      <>
        <CardContent className={classes.chatArea}>
          <Grid container direction="column" wrap="nowrap">
            {messages.map((message, i) => (
              <Grid
                item
                key={i}
                className={classNames(
                  classes.messageContainer,
                  message.senderId !== userId ? classes.isMyMessage : classes.isAnotherMessage
                )}
              >
                <Card
                  className={classNames(
                    classes.message,
                    message.senderId !== userId ? classes.messagePrimary : classes.messageSecondary
                  )}
                >
                  {message.text}
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        {isCreateAllowed && (
          <CardActions>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <TextField
                label="Label"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="filled"
                InputLabelProps={{
                  shrink: true
                }}
                value={messageText}
                onChange={this.handleChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Отправить
              </Button>
            </form>
          </CardActions>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  messageText: chatMessageText(state),
  userId: userProfileSelector(state).id,
  permission: userPermissionsSelector(state)
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ActiveChannelArea);
