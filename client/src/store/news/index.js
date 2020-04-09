import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import request from '../../helpers/request';

export const isLoadingNewsListSelector = state => state.news.isLoadingNewsList;
export const isLoadingNewsFormSelector = state => state.news.isLoadingNewsForm;
export const isLoadedSelector = state => state.news.isLoaded;
export const newsListSelector = state => state.news.news;

const actionsPrefix = 'NEWS'
export const setIsLoadingNewsList = createAction(`${actionsPrefix}/SET_IS_LOADING_NEWS_LIST`)
export const setIsLoadingNewsForm = createAction(`${actionsPrefix}/SET_IS_LOADING_NEWS_FORM`)
export const setNewsList = createAction(`${actionsPrefix}/SET_NEWS_LIST`)
export const appendNews = createAction(`${actionsPrefix}/APPEND_NEWS`)
export const setToZeroNewsList = createAction(`${actionsPrefix}/SET_TO_ZERO_NEWS_LIST`)
export const setIsLoaded = createAction(`${actionsPrefix}/SET_IS_LOADED`)


const isLoadingNewsList = handleActions({
  [setIsLoadingNewsList]: (_, action) => action.payload
}, false)

const isLoadingNewsForm = handleActions({
  [setIsLoadingNewsForm]: (_, action) => action.payload
}, false)

const isLoaded = handleActions({
  [setNewsList]: (_, action) => true
}, false)

const news = handleActions({
  [setNewsList]: (_, action) => action.payload,
  [appendNews]: (state, action) => [action.payload, ...state],
  [setToZeroNewsList]: () => []
}, [])

export default combineReducers({
  isLoadingNewsList,
  isLoadingNewsForm,
  isLoaded,
  news
})

export const getNews = () => (dispatch, getState) => {
  if (isLoadedSelector(getState())) return;
  dispatch(setIsLoadingNewsList(true))
  request({ url: '/news', method: 'GET', getState, dispatch })
    .then(data => dispatch(setNewsList(data)))
    .catch(error => console.log(error))
    .finally(() => dispatch(setIsLoadingNewsList(false)))
}

export const createNews = ({ title, text }) => (dispatch, getState) => new Promise((resolve, reject) => {
  const data = { title, text }
  dispatch(setIsLoadingNewsForm(true))
  request({ url: '/news', method: 'POST', data, getState, dispatch })
    .then(data => {
      dispatch(setNewsList(data))
      resolve(data)
    })
    .catch(error => {
      reject(error)
    })
    .finally(() =>  dispatch(setIsLoadingNewsForm(false)))
})

export const updateNews = ({ id, title, text }) => (dispatch, getState) => new Promise((resolve, reject) => {
  const data = { title, text }
  dispatch(setIsLoadingNewsForm(true))
  request({ url: `/news/${id}`, method: 'PATCH', data, getState, dispatch })
    .then(data => {
      dispatch(setNewsList(data))
      resolve(data)
    })
    .catch(error => {
      reject(error)
    })
    .finally(() =>  dispatch(setIsLoadingNewsForm(false)))
})

export const deleteNews = ({ id }) => (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch(setIsLoadingNewsList(true))
  request({ url: `/news/${id}`, method: 'DELETE', getState, dispatch })
    .then(data => {
      dispatch(setNewsList(data))
      resolve(data)
    })
    .catch(error => {
      reject(error)
    })
    .finally(() =>  dispatch(setIsLoadingNewsList(false)))
})