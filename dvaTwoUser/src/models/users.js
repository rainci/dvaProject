import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [{name:123,id:1}],
    total: null,
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      return { ...state, list, total };
    },
  },
  effects: {
    *fetchData({ payload }, { call, put }) {
      const { page } = payload || {};
      const resault = yield call(usersService.fetch, { page });
      console.log('result:',resault);
      const { data, headers } = resault
      yield put({type:'save',payload:{data, total: headers['x-total-count']}})
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetchData', payload: { page:1 } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'fetchData',payload:{page:1} });
    },
  },
};