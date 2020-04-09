import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { deleteNews } from '../../store/news';
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardActions,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ButtonLink from '../common/ButtonLink';
import { userPermissionsSelector } from '../../store/auth';
import _get from 'lodash.get'

const styles = theme => ({
  wrapper: {
    width: '100%',
    flex: '1 1 100%',
    paddingTop: '40px'
  },
  card: {
    marginBottom: theme.spacing(2)
  }
});

const NewsListCard = withStyles(styles)(({ classes, post, dispatch, permission }) => {
  const removeNews = () => {
    dispatch(deleteNews({ id: post.id }));
  };
  const isUpdateAllowed = !!_get(permission, 'news.U', false);
  const isDeleteAllowed = !!_get(permission, 'news.D', false);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={post.user.image || '/assets/img/no-user-image.png'}
            alt={post.user.username}
          ></Avatar>
        }
        title={post.title}
        subheader={post.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions>
      { isUpdateAllowed && <ButtonLink path={`/news/${post.id}/edit`}>Редактировать</ButtonLink> }
      { isDeleteAllowed && <Button onClick={removeNews}>Удалить</Button> }
      </CardActions>
    </Card>
  );
});

const mapStateToProps = state => ({
  permission: userPermissionsSelector(state)
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(NewsListCard);
