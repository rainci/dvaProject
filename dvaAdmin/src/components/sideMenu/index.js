import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import * as TOOLS from '../../utils';
import styles from './css/index.less'

const SubMenu = Menu.SubMenu;

class MyMenu extends React.Component {
  state = {
    collapsed: "true",
  }

  handleClick = e => {
    let SelectedKey = {
      key: e.key
    }
    TOOLS.setList('SelectedKey', SelectedKey)
  }
  renderMenuHtml = (data = []) => {//渲染menu
    let _this = this
    return data.map(({ id, sub: { type, url, title, icon }, list = [] }) => {
      if (type === 'title' && list && list.length) {
        return (
          <SubMenu key={id} title={<span>{icon ? <Icon type={icon} /> : null}{title}</span>}>
            {_this.renderMenuHtml(list)}
          </SubMenu>
        )
      }
      if (type === 'menu') {
        // if (list && list.length) {
        //   return (
        //     <SubMenu key={id} title={title}>
        //       {_this.renderMenuHtml(list)}
        //     </SubMenu>
        //   )
        // }
        return <Menu.Item key={id}><Link to={url}>{title}</Link></Menu.Item>
      }
      return null
    })
  }
  /****************生命周期begin ****************/
  componentDidMount() {
    this.setState({
      subNav: TOOLS.getList('subNav') || []
    })
    console.log('state.subNav:', this.state.subNav)
  }
  /****************生命周期end ****************/

  render() {
    // const menuList = this.returnMenuListBySys(TOOLS.getList('subNav')); //菜单系统控制
    // let defaultOpenKeys = menuList.map((val,index)=>{
    //   if(val.id){
    //     return val.id.toString()
    //   }
    // })
    // const SelectedKey = TOOLS.getList('SelectedKey');
    //console.log(this.props)
    // var selectedKeys = pathname || "";
    const menuProps = {
      defaultOpenKeys:['10401'],
      // defaultSelectedKeys: [SelectedKey.key?SelectedKey.key + '':"120300"],
      // selectedKeys:[selectedKeys],
      theme: "dark",
      mode: "inline",
      onClick: this.handleClick,
      collapsed: this.state.collapsed
    }
    return (
      <div className={styles.sideMenu}>
        <Menu
          {...menuProps}
        >
          {
            this.renderMenuHtml(this.state.subNav)
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(MyMenu);





