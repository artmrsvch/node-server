import { createActions, handleActions } from 'redux-actions';

export const { openNotification, closeNotification } = createActions(
  {
    OPEN_NOTIFICATION: n => n,
    CLOSE_NOTIFICATION: n => n
  },
  { prefix: 'notifications' }
);

export const notificationsSelector = state => state.notifications;

const notifications = handleActions(
  {
    [openNotification]: (state, action) => {
      const { text, variant } = action.payload;
      return [
        ...state,
        { text, variant, id: state.length + 1, isActive: !state.length }
      ];
    },
    [closeNotification]: (state, action) => {
      const withoutDeletedNotification = state.filter(
        notification => notification.id !== action.payload
      );
      return withoutDeletedNotification.length
        ? withoutDeletedNotification.map((not, i) => {
            if (i === withoutDeletedNotification.length - 1) {
              not.isActive = true;
            }
            return not;
          })
        : withoutDeletedNotification;
    }
  },
  []
);

export default notifications;
