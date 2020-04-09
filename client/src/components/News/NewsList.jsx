import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  getNews,
  isLoadingNewsListSelector,
  isLoadedSelector,
  newsListSelector
} from '../../store/news';
import ButtonLink from '../common/ButtonLink';
import NewsListCard from './NewsListCard';
import { userPermissionsSelector } from '../../store/auth';
import _get from 'lodash.get';
import routes from '../../constants/routes';

class NewsList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getNews());
  }
  render() {
    const { isLoading, isLoaded, news, permission } = this.props;
    const isCreateAllowed = !!_get(permission, 'news.C', false);
    return (
      <>
        {isCreateAllowed && (
          <ButtonLink color="primary" path={`${routes.news}/add`}>
            Добавить
          </ButtonLink>
        )}
        <div>
          {isLoading ? <div>Loading...</div> : null}
          {isLoaded ? (
            news.length ? (
              news.map(post => <NewsListCard post={post} key={post.id} />)
            ) : (
              <div>Нет новостей</div>
            )
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoadingNewsListSelector(state),
  isLoaded: isLoadedSelector(state),
  news: newsListSelector(state),
  permission: userPermissionsSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(NewsList);
