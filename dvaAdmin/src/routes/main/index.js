import React from 'react';
import { Layout, } from 'antd';
import {  Route } from 'react-router-dom';
import MyHeader from '../../components/header'
import MainIndex from './helloMain'
import TenantList from '../user/tenantList'
import MyMenu from '../../components/sideMenu'
const { Content, Sider } = Layout;

const Main = (props) => {
        return(
            <Layout>
                <MyHeader />
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <MyMenu />
                    </Sider>
                    <Content style={{ padding: '10px' }}>
                        <div style={{ background: '#fff', padding: 24, height:'100%',overflow:'auto' }}>
                            {props.children}
                            {/* <Route path='/tenantList'  component={TenantList} exact />
                            <Route path='/main' component={MainIndex} /> */}
                        </div>
                    </Content>
                </Layout>
            </Layout>                                  
        )
    }
export default Main;
