function delay(timeout){
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
export default {
    namespace: 'count',
    state: 0,
    reducers: {
        add(state) { 
            return state + 1;
        },
        minus(state) { 
            return state - 1;
        },
    },
    effects: {
        *addE(action, {call, put}){
            yield call(delay,1000);
            yield put({ type: 'add' })
        },
    },    
}