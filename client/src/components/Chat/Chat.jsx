import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { connectSocket, disconnectSocket, chatUsersSelector, chatSelectedRoomSelector, chatMessagesList } from '../../store/chat'
import {
  Grid,
  Container,
  Card
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ChatChannelsList from './ChatChannelList'
import ChatActiveChatArea from './ChatActiveChatArea'
import { compose } from 'recompose';
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  column: {
    // backgroundColor: '#494949',
    height: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    width: '100%',
    flex: '1 1 100%',
    paddingTop: theme.spacing(1)
  },
  empty: {
    padding: theme.spacing(3)
  }
});

class Chat extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(connectSocket())
  }

  componentWillUnmount () {
    const { dispatch } = this.props;
    dispatch(disconnectSocket())
  }
  render() {
    const { classes, users, messages, selectedRoom } = this.props;
    return (
      <div className={classes.wrapper}>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ChatChannelsList users={users} selected={selectedRoom} />
            </Grid>
            <Grid item xs={8}>
              <Card className={classes.column} square>
                { selectedRoom ? <ChatActiveChatArea messages={messages} /> : <div className={classes.empty}>Выберите чат</div> }
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: chatUsersSelector(state),
  selectedRoom: chatSelectedRoomSelector(state),
  messages: chatMessagesList(state)
})
export default compose(withStyles(styles), connect(mapStateToProps))(Chat);
