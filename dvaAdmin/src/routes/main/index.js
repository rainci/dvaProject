import React from "react";
import { Layout, } from 'antd';
import {  Route } from 'react-router-dom';
import MyHeader from '../../components/header'
import MainIndex from './helloMain'

const { Content, Sider } = Layout;

const Main = () => {
        return(
            <Layout>
                <MyHeader />
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        {/* <MyMenu /> */}
                    </Sider>
                    <Content style={{ padding: '10px' }}>
                        <div style={{ background: '#fff', padding: 24, height:"100%",overflow:"auto" }}>
                            <Route path="/main" component={MainIndex} exact/>
                        </div>
                    </Content>
                </Layout>
            </Layout>                                  
        )
    }
export default Main;
