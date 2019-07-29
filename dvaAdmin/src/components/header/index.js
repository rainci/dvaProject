
import React,  {PureComponent } from "react";
import { Layout } from 'antd';
import styles from './css/header.less';
import logo from './img/pic_logo_copy_9.svg';
import UserInfo from './userInfo';
import * as TOOLS from '../../utils';

const { Header } = Layout;
class  MyHeader extends PureComponent {
    state = {
        isShowUserInfo: false,
        userName: '',    
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//设置state值
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /********** 业务逻辑begin ***********/
     _getUserInfo = () => { //判断是否存在用户信息，即是否登录，登录后，则头部右上角显示用户信息
        let { userName } = TOOLS.getList('userInfo');
        console.log('userName:', userName)
        if(userName){
            this.setStateValueFn('isShowUserInfo', true)
            this.setStateValueFn('userName', userName)
        }
    }
    /********** 业务逻辑end ***********/
    /********** 生命周期begin ***********/
    componentDidMount(){
        this._getUserInfo();
    }
    /********** 生命周期end ***********/
    render(){
        let { isShowUserInfo, userName, } = this.state
        return (
            <Header className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt='logo' />
                </div>
                <div className={styles.title}>{this.props.title || '数据管理平台'}</div>
                {
                    isShowUserInfo ? <UserInfo userName={userName}/> : null
                }
            </Header>
        )
    }
}
export default MyHeader;