import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import request from '../../helpers/request';
import _get from 'lodash.get'
import { openNotification } from '../notifications';
import { userProfileSelector, getUserProfileFromToken } from '../auth'

export const isLoadingUsersSelector = state => state.adminPanel.isLoadingUsers;
export const usersSelector = state => state.adminPanel.users;

const actionsPrefix = 'ADMIN_PANEL';
export const setIsLoadingUsers = createAction(`${actionsPrefix}/SET_IS_LOADING_USERS`);
export const setIsLoadingForm = createAction(`${actionsPrefix}/SET_IS_LOADING_FORM`);
export const setUsers = createAction(`${actionsPrefix}/SET_USERS`);
export const setToZeroUsers = createAction(`${actionsPrefix}/SET_TO_ZERO_USERS`);

const isLoadingUsers = handleActions(
  {
    [setIsLoadingUsers]: (_, action) => action.payload
  },
  false
);

const isLoadingForm = handleActions({ [setIsLoadingForm]: (_, action) => action.payload }, false);

const users = handleActions(
  {
    [setUsers]: (_, action) => action.payload,
    [setToZeroUsers]: () => []
  },
  []
);

export default combineReducers({
  isLoadingUsers,
  isLoadingForm,
  users
});

export const getUsers = () => (dispatch, getState) => {
  dispatch(setIsLoadingUsers(true));
  request({ url: '/users', getState, dispatch })
    .then(data => {
      dispatch(setUsers(data));
    })
    .catch(error =>
      openNotification({
        text: error.message,
        variant: 'error'
      })
    )
    .finally(() => dispatch(setIsLoadingUsers(false)));
};

export const updateUserPermission = (userId, permission) => (dispatch, getState) => new Promise((resolve) => {
  dispatch(setIsLoadingForm(true));
  request({
    url: `/users/${userId}/permission`,
    method: 'PATCH',
    data: { permission },
    getState,
    dispatch
  })
    .then(() => {
      openNotification({ text: 'Успешно!', variant: 'success' });
      dispatch(getUsers());
      const isSelf = _get(userProfileSelector(getState()), 'id', null) === userId;
      isSelf && dispatch(getUserProfileFromToken())
      resolve(true)
    })
    .catch(error => {
      openNotification({
        text: error.message,
        variant: 'error'
      })
    })
    .finally(() => dispatch(setIsLoadingForm(false)))
});


export const deleteUser = userId => (dispatch, getState) => new Promise((resolve) => {
  dispatch(setIsLoadingForm(true));
  request({ url: `/users/${userId}`, method: 'DELETE', getState, dispatch })
    .then(data => {
      dispatch(getUsers(data));
      resolve(true)
    })
    .catch(error => {
      openNotification({
        text: error.message,
        variant: 'error'
      })
    })
    .finally(() => dispatch(setIsLoadingForm(false)));
});