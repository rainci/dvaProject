import React from 'react';
import { connect } from 'dva';
class TestError extends React.Component {
    componentDidCatch(e) {
      alert(e.message);
    }
    componentDidMount() {
      // throw new Error('a');
    }
    render() {
      return <div>TestError</div>
    }
  }
  const CountPage = ({dispatch,count:{count}}) => {
    return (
        <div>
          <TestError />
          <h2>{ count }</h2>
          <button key="addE" onClick={() => { dispatch({type: 'count/addE'})}}>+E</button>
          <button key="add" onClick={() => { dispatch({type: 'count/add'})}}>+</button>
          <button key="minus" onClick={() => { dispatch({type: 'count/minus'})}}>-</button>
        </div>
    );
  }
  const mapStateToProps = ({count})=> ({
    count
  })
export default connect(mapStateToProps)(CountPage);
  