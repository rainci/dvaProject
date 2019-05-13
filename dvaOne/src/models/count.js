function delay(timeout){
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
export default {
    namespace: 'count',
    state: {
        count: 0,
    },
    reducers: {
        add(state) { 
            return {
                ...state,
                count: state.count + 1,
            }
        },
        minus(state) { 
            return {
                ...state,
                count: state.count - 1,
            }    
        },
    },
    effects: {
        *add(action, {call, put}){
            yield call(delay,1000);
            yield put({ type: 'minus' })
        },
    },    
}