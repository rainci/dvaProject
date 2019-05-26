import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './IndexPage.css';


function F(props, context = {}) {
  console.log('context', context);
  
  return (
    <div>{context.name}</div>
  )
}
F.contextTypes = {
  name: PropTypes.string
}

export default class IndexPage extends React.Component {
  static childContextTypes = {
    name: PropTypes.string
  }
  getChildContext() {
    return {
      name: 'ronffy'
    }

    this.dispatch({
      type: 'exceple/updateState',
      payload: {
        name: 'ronci'
      }
    })
  }
  render() {
    return (
      <div className={styles.normal}>
        <F></F>
      </div>
    )
  }
}


// function IndexPage() {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to dva!</h1>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
//         <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
//       </ul>
//     </div>
//   );
// }

// IndexPage.propTypes = {
// };

// export default connect({})(IndexPage);
