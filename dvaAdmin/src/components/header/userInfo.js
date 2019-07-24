import React from "react";
import { Menu, Dropdown, Icon } from 'antd';
import {Link} from 'react-router-dom';

const UserInfo = ({ userName }) => {
    const _logOut = (e) => {
        // serverlogin.logOut()
        // .then(db=>{
        //     if(db.code === '200'){
        //         sessionStorage.clear();
        //         message.success('   退出成功！   ', 2);
        //     }else{
        //         alert(db.msg)
        //     }    
        // })
    }
    const menu = (
        <Menu>
            <Menu.Item key="0">
            <Link to='/login/changepassword'>修改密码</Link>
            </Menu.Item>
            <Menu.Item key="1">
            <Link to='/' onClick={_logOut}>退出登录</Link>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['hover']}>
            <span style={{paddingLeft:'15px', color: 'white', float: 'right'}}>
                {userName}<Icon type="down" style={{paddingLeft:'15px', color: 'white'}}/>
            </span>
        </Dropdown>
    )
}
export default UserInfo;
