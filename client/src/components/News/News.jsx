import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import NewsList from './NewsList';
import NewsAdd from './NewsAdd';

const styles = theme => ({
  wrapper: {
    width: '100%',
    flex: '1 1 100%',
    paddingTop: '40px'
  }
});

class News extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Новости компании
          </Typography>

          <Route path="/news" exact component={NewsList} />
          <Route path="/news/add" component={NewsAdd} />
          <Route path="/news/:id/edit" component={NewsAdd} />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(News);
