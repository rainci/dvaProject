import * as React from 'react';
import { connect } from 'dva';
import { FCUserList } from '../components/userlist'
class IndexPage extends React.Component<{}, { userData: any[],title?:string }> {
  state = {
    userData: [{ id: 1, name: 'xixi', gender: 'male' }, { id: 2, name: 'star', gender: 'female' }],
    title:'Hello typescript!'
  }
  render() {
    let {title, userData} = this.state;
    return (
      <div>
        {title}
        <FCUserList
          data={userData}
        />
      </div>
    );
  }

}

export default connect()(IndexPage);
