import React from 'react';
import { Menu, Icon, Button } from 'antd';
import {Link,withRouter} from 'react-router-dom';
import * as TOOLS from '../../utils';
const SubMenu = Menu.SubMenu;

class MyMenu extends React.Component {
  state = {
    collapsed: "true",
  }

  handleClick = e => {
    let SelectedKey = {
      key:e.key
    }
    TOOLS.setList('SelectedKey',SelectedKey)
  }
  renderHtml = data => {//渲染menu
    data.map(({id, sub, list = []}) => {
      
    })
  }
  /****************生命周期begin ****************/
  componentDidMount(){
    this.subNav = TOOLS.getList('subNav') || [];
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
    const pathname = this.props.location.pathname;
    //console.log(this.props)
    // var selectedKeys = pathname || "";
    const menuProps = {
      // defaultOpenKeys,
      // defaultSelectedKeys: [SelectedKey.key?SelectedKey.key + '':"120300"],
      // selectedKeys:[selectedKeys],
      theme: "dark",
      mode: "inline",
      onClick:this.handleClick,
      collapsed: this.state.collapsed
    }
    return (
      <div className='sideMenu'>
        <Menu
          {...menuProps}
        >
          {
            menuList.map(item => {
              const { id, sub, list = [] } = item;
              return (
                <SubMenu key={id} title={<span>{sub.icon ? <Icon type={sub.icon} /> : null}{sub.title}</span>}>
                  {
                    list.map(({ id,list, sub }) => {
                      if(sub.type != "interface"){
                        if(sub.type == "menu" || list.length == "0"){  
                          return <Menu.Item key={sub.url}><Link to={sub.url}>{sub.title}</Link></Menu.Item>
                        }else{
                          return <SubMenu key={id} title={sub.title}>
                            {
                              list.map(({ id,sub }) => {
                                if(sub.type != "interface"){
                                  return <Menu.Item key={sub.url}><Link to={sub.url}>{sub.title}</Link></Menu.Item>
                                }
                              })
                            }
                          </SubMenu>
                        }
                      }  
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(MyMenu);





