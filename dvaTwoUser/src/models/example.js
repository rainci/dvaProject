
const fn = (y) => {
  return Promise.resolve(y)
}

export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      console.log('start');
      dispatch({
        type: 'fetch'
      })
      
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log(1);
      
      
      yield call(fn, (yield put({ type: 'fetch2' })))
      console.log(4);
    },
    *fetch2({ payload }, { call, put }) {  // eslint-disable-line
      console.log(2);
      yield put({ type: 'save' });
      console.log(3);
    },
  },

  reducers: {
    save(state, action) {
      console.log(5);
      
      return { ...state, ...action.payload };
    },
  },

};
