/**
 * @author rainci
 */
import React, { PureComponent } from "react";
import { Table, Form, Input, Row, Col, Button, message, Popconfirm } from 'antd';
import BreadCrumbs from '../../components/breadCrumb'
import { Link } from 'react-router-dom';
import { connect } from 'dva';

const FormItem = Form.Item;
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};
class TenantList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            // tenantListData: [],//列表数据
            // tenantListPage: 0,//列表总数
            tenantFliter: {},//filter
        }
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//设置state值
        this.setState({
            [key]: value
        })
    }
    // getTenantData = (filter, page) => {//获取tenant data
    //     return serverLogin.getTenantList(filter, page).then(({ code, data = {}, msg }) => {
    //         if (code === '200' || code === 200) {
    //             return data;
    //         } else {
    //             message.warn(`获取租户列表失败:${msg}`)
    //         }
    //     }).catch((err) => {
    //         console.log('租户列表失败:', err)
    //     })
    // }
    // getDeleteTenantData = id => {//删除tenant
    //     return serverLogin.deleteTenant(id).then(({ code, msg }) => {
    //         if (code === '200' || code === 200) {
    //             return code
    //         } else {
    //             message.warn(`删除租户失败:${msg}`)
    //         }
    //     }).catch((err) => {
    //         console.log('删除租户失败:', err)
    //     })
    // }
    /***********公共方法 end *****************/
    /***************************页面业务逻辑 begin ******************************/
    searchTenantListBtn = (filter, page) => {
        this.props.dispatch({type:'tenantPage/fetchTenantList',payload:{filter,page}})
        // this.getTenantData(filter, page)
        //     .then(({ list, total } = {}) => {
        //         this.setStateValueFn('tenantListData', list)
        //         this.setStateValueFn('tenantListPage', total)
        //     })
    }
    searchTenantFn = e => {//搜索
        e && e.preventDefault()
        let _this = this
        this.props.form.validateFields((err, filter) => {
            this.setStateValueFn('tenantFliter', filter)
            _this.searchTenantListBtn(filter)
        })
    }
    // deleteTenantFn = (id, userCount) => {//删除
    //     if(userCount){//如果有成员，则不能删除 
    //         return message.warn('租户不允许删除')
    //     }
    //     this.getDeleteTenantData(id)
    //         .then(code => {
    //             if(code === ('200' || 200)){
    //                 message.info('租户删除成功',1,()=>{
    //                     this.searchTenantFn()
    //                 })
    //             }
    //         })
    // }
    handleReset = () => {//重置
        this.props.form.resetFields();
    }
    onPaginationChange = current => {//分页
        this.searchTenantListBtn(this.state.tenantFliter, current)
    }
    /***************************页面业务逻辑 end ******************************/
    /***************************生命周期 begin *******************************/
    componentDidMount() {
        // this.searchTenantFn()
    }
    /***************************生命周期 end *******************************/
    render() {
        const { result, totalNum } = this.props || {};//从redux中拿list data 和list totalNum
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '租户名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            }, {
                title: '成员数量',
                key: 'userCount',
                dataIndex: 'userCount',
            }, {
                title: '操作',
                key: 'tenantId',
                dataIndex: 'tenantId',
                render: (tenantId, data) => {
                    //console.log(data)
                    return (
                        <div>
                            <Link to={"/main/addTenant?tenantId=" + tenantId}>编辑</Link>&nbsp;|&nbsp;
                            <Popconfirm 
                            title="确定要删除租户吗？" 
                            okText="Yes" 
                            cancelText="No"
                            // onConfirm={this.deleteTenantFn.bind(this,tenantId,data.userCount)}
                            >
                                <span className='tenantDel'>删除</span>
                            </Popconfirm>
                        </div>
                    )
                },
            }
        ];
        return (
            <div>
                <BreadCrumbs goUrl='/main/addTenant' goName='新建租户' name='租户管理' rootName='账号中心' />
                <Form onSubmit={this.searchTenantFn} >
                    <Row>
                        <Col span={10} style={{ padding: "0 8px" }}>
                            <FormItem label='租户名称' {...formItemLayout}>
                                {getFieldDecorator('name')(
                                    <Input placeholder="帐号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    重置
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Table
                    columns={columns}
                    dataSource={result}
                    rowKey={record => record.tenantId}
                    pagination={{  //分页
                        total: totalNum*1, //数据总数量
                        //pageSize: this.state.userListPage,  //显示几条一页
                        defaultPageSize: 10, //默认显示几条一页
                        onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                            console.log(current, pageSize)
                        },
                        onChange: this.onPaginationChange,
                        showTotal: function () {  //设置显示一共几条数据
                            return '共 ' + this.total + ' 条数据';
                        },
                        hideOnSinglePage: true,
                    }}
                />
                panent page !
            </div>
        )
    }
}

const mapStateToProps = ({ tenantPage, loading }) => {
    // console.log(111,tenantPage )
    return {
        loading,
        ...tenantPage,
    };
}
export default connect(mapStateToProps)(Form.create()(TenantList));
// export default Form.create()(TenantList)