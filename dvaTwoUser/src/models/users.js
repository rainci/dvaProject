import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { page } = payload || {};
      const resault = yield call(usersService.fetch, { page });
      console.log(resault);
      
      const { data, headers } = resault
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'fetch' });
    },
  },
};