import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardHeader,
  Divider,
  ListItemSecondaryAction,
  Badge
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { chatUsersSelector, chatSelectedRoomSelector, connectRoom } from '../../store/chat';
const styles = theme => ({
  column: {
    // backgroundColor: '#494949',
    height: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column'
  }
});

const ChannelsList = ({ classes, users, selectedRoom, dispatch }) => {
  const selectRoom = user => {
    dispatch(connectRoom({ userId: user.userId, socketId: user.socketId }));
  };
  return (
    <Paper className={classes.column} square>
      <CardHeader title={<Typography variant="h5">Личные чаты</Typography>} />
      <Divider />
      <List>
        {users.map((user, index) => (
          <ListItem
            button
            key={user.userId}
            selected={user.userId === selectedRoom && selectedRoom.userId}
            onClick={() => selectRoom(user)}
          >
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
const mapStateToProps = state => ({
  users: chatUsersSelector(state),
  selectedRoom: chatSelectedRoomSelector(state)
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(ChannelsList);
