/**
 * @author rainci
 */
import React, { PureComponent } from "react";
import { Form, Input, Row, Col, Button, message, Checkbox, Modal, Spin, Table } from 'antd';
import { connect } from 'dva'
import BreadCrumbs from '../../components/breadCrumb'

import TableList from '../../components/tableList'
import Search from '../../components/search'
import styles from './css/tenant.less'

const FormItem = Form.Item;
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};
const searchTreeNames = [
    { 'name': '标签树名称', 'value': 'name', 'num': 8 },
];

class AddTenant extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            treeData: [],//tree列表数据
            tenantListPage: 0,//列表总数
            tenantFliter: {},//filter
            treeVisible: false,//model显隐
            getTreeLoad: false,//tree 加载loading
        }
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//设置state值
        this.setState({
            [key]: value
        })
    }
    // getTreeData = ({ filter, page, type }) => {//获取tree data
    //     return serverLogin.getTreeList({ filter, page, type }).then(({ code, data = [], msg }) => {
    //         if (code === '200' || code === 200) {
    //             return data;
    //         } else {
    //             message.warn(`获取列表失败:${msg}`)
    //         }
    //     }).catch((err) => {
    //         console.log('获取失败:', err)
    //     })
    // }
    // addTenantData = (filter) => {//创建租户
    //     return serverLogin.getAddTenantData(filter).then(({ code, data = {}, msg }) => {
    //         if (code === '200' || code === 200) {
    //             return code;
    //         } else {
    //             message.warn(`创建租户失败:${msg}`)
    //         }
    //     }).catch((err) => {
    //         console.log('创建租户失败:', err)
    //     })
    // }
    // updateTenantData = filter => {//更新租户
    //     return serverLogin.getUpdateTenantData(filter).then(({ code, data = {}, msg }) => {
    //         if (code === '200' || code === 200) {
    //             return code;
    //         } else {
    //             message.warn(`更新租户失败:${msg}`)
    //         }
    //     }).catch((err) => {
    //         console.log('更新租户失败:', err)
    //     })
    // }
    // getTenantIdDetailData = tenantId => {//获取此tenantId的详情值
    //     return serverLogin.getTenantIdDetail(tenantId).then(({ code, data = {}, msg }) => {
    //         if (code === '200' || code === 200) {
    //             return data;
    //         } else {
    //             message.warn(`获取租户信息失败:${msg}`)
    //         }
    //     }).catch(err => {
    //         console.log('租户信息失败:', err)
    //     })
    // }
    // getTreeCodeMap = type => {//获取tree map
    //     return server.getCodeMap(type).then(({code, data = {}, msg})=>{
    //         if(code === ('200' || 200)){
    //             return data
    //         }else{
    //             message.warn(`获取tree码表失败:${msg}`)
    //         }
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }
    /***********公共方法 end *****************/
    /***************************页面业务逻辑 begin ******************************/
    /***************tree 业务 begin **************/
    getTreeListDataFn = ({ filter, page, type }) => {//获取标签树业务逻辑
        this.setStateValueFn('getTreeLoad', true)
        this.getTreeData({ filter, page, type }).then((data = []) => {
            this.setStateValueFn('getTreeLoad', false)
            this.setStateValueFn('treeData', data)
        })
    }
    treeCheckedFn = (selectedRowKeys, selectedRows) => {//标签树checkbox选择回调
        let { tagType } = this.state
        this.props[`on${tagType}CheckedFn`] && this.props[`on${tagType}CheckedFn`](selectedRows, selectedRowKeys)
    }
    treeDeleteFn = ({ tagId, type }) => {//页面上删除按钮
        let tagType = type.charAt(0).toUpperCase() + type.substr(1)
        this.props[`on${tagType}DeleteFn`] && this.props[`on${tagType}DeleteFn`](tagId)
    }
    setTreeKeyAndDataFn = ({typeData, typeKey, type}) => {//弹框点击确定按钮时，保存一下数据，为了当点击取消按钮时，找到上次保存的源数据
        this[`${type}KeyAndData`] = { typeData: this.props.addTenantPageReducer[typeData], typeKey: this.props.addTenantPageReducer[typeKey] };
        console.log(555, type, typeData, typeKey, this.props.addTenantPageReducer[typeData], this.props.addTenantPageReducer[typeKey])
    }
    chooseTreeFn = type => {//选择标签树按钮
        let tagType = type.charAt(0).toUpperCase() + type.substr(1)
        this.setStateValueFn('treeVisible', true)
        this.setStateValueFn('tagType', tagType)
        this.getTreeListDataFn({ type })
        let { treeCodeMap } = this.state
        if(treeCodeMap && Object.keys(treeCodeMap).length)return;
        this.getTreeCodeFn()//获取code map
    }
    cancelTreeModalFn = () => {//tree取消按钮
        this.setStateValueFn('treeVisible', false)
        let { tagType } = this.state
        this.props[`onCancel${tagType}ModalFn`] && this.props[`onCancel${tagType}ModalFn`](this[`${tagType}KeyAndData`])
    }
    okTreeModalFn = () => {//tree确定按钮
        let { tagType } = this.state;
        let type = tagType.toLowerCase(),
            typeData = `${type}CheckedData`,
            typeKey = `${type}CheckedKeys`;
        if(this.props.addTenantPageReducer[typeKey].length > 1) {
            return message.warn('仅可以选择1个标签树')
        }    
        this.setStateValueFn('treeVisible', false)
        this.setTreeKeyAndDataFn({typeData, typeKey, type})

    }
    searchTreeFn = filter => {//tree search 按钮
        let type = this.state.tagType.toLowerCase()
        this.getTreeListDataFn({filter,type})

    }
    getTreeCodeFn = () => {//获取tree codeMap
        this.getTreeCodeMap('tag_tree')
        .then( data => {
            this.setStateValueFn('treeCodeMap', data)
        })
    }
    /***************tree 业务 end **************/
    dealSampleDataFn = (data = []) => { //将有多属性的data列表处理成简单属性的data列表  
        if(!data || !data.length) return [];
        return data.map(({ tagId, name, code, type }) => {
            return { dataId: tagId, dataName: name, dataCode: code, type }
        });

    }
    addTenantBtnFn = (filter) => {//创建租户后逻辑
        if(this.state.tenantModifyFlag){
            filter.tenantId = this.state.tenantId*1
            return this.updateTenantData(filter)
            .then(code => {
                if (code === ('200' || 200)) {
                    message.info('更新租户成功', 2, () => {
                        this.props.history.push('/main/tenantList')
                    })
                }
            })
        }
        this.addTenantData(filter)
            .then(code => {
                if (code === ('200' || 200)) {
                    message.info('创建租户成功', 2, () => {
                        this.props.history.push('/main/tenantList')
                    })
                }
            })
    }
    addTenantFn = e => {//搜索
        e && e.preventDefault()
        const { placeCheckedData, humanCheckedData, labelCheckedData, } = this.props.addTenantPageReducer;
        let tenantDataVoList = [
            ...this.dealSampleDataFn(placeCheckedData),
            ...this.dealSampleDataFn(humanCheckedData),
            ...this.dealSampleDataFn(labelCheckedData)
        ];
        this.props.form.setFieldsValue({
            tenantDataVoList,
        })
        let _this = this
        this.props.form.validateFields((err, filter) => {
            _this.addTenantBtnFn(filter)
        })
    }
    goBackFn = () => {//返回
        this.props.history.goBack()
    }
    dealTenantVoListFn = (data = []) => {//将选中的tree对应存入redux中
        if(!data || !data.length) return;
        let typeData = {},
            typeId = {};
        data.forEach(({ dataId, dataName, dataCode, type } = {}) => {
            if(!typeData[type]){
                typeData[type] = [];
                typeId[type] = [];
            }
            typeData[type].push({tagId: dataId, name: dataName, code: dataCode,  type})
            typeId[type].push(dataId)
        })
        Object.keys(typeData).forEach( item => {
            let type = item.charAt(0).toUpperCase() + item.substr(1)
            this.props[`on${type}CheckedFn`] && this.props[`on${type}CheckedFn`](typeData[item], typeId[item])
        })
    }
    getTenantIdDetailFn = tenantId => { //获取详情信息，回显form表单函数
        let _this = this
        this.getTenantIdDetailData(tenantId)
            .then(({ name, tenantDataVoList } = {}) => {
                this.props.form && this.props.form.setFieldsValue({//form内容回显
                    name,
                })
                _this.dealTenantVoListFn(tenantDataVoList)
            })
    }
    isGetTenantDetailFn = () => { //是否是修改租户并获取租户详情
        // var tenantId = T.getQueryString('tenantId')
        // if (tenantId) {
        //     this.getTenantIdDetailFn(tenantId);
        //     this.setState({ tenantModifyFlag: true, tenantId })
        // }
    }
    /***************************页面业务逻辑 end ******************************/
    /***************************生命周期 begin *******************************/
    componentDidMount() {
        let {onPlaceInitFn, onHumanInitFn, onLabelInitFn } = this.props;
        onPlaceInitFn && onPlaceInitFn()
        onHumanInitFn && onHumanInitFn()
        onLabelInitFn && onLabelInitFn()
        this.isGetTenantDetailFn()
    }
    /***************************生命周期 end *******************************/
    render() {
        const { getFieldDecorator } = this.props.form;
        let { treeVisible, getTreeLoad, tagType, treeCodeMap } = this.state;
        const columnsTagTree = [
            {
                title: '标签树名称',
                dataIndex: 'name',
                key: 'name',
                width: '50%',
            }, {
                title: '操作',
                key: 'tagId',
                dataIndex: 'tagId',
                render: (tagId, data) => {
                    return (
                        <div>
                            <span className='tenantDel' style={{ 'position': 'relative' }} onClick={() => this.treeDeleteFn({ tagId, type: data.type })}>删除</span>
                        </div>
                    )
                },
            }
        ];
        const columnsTree = [
            {
                title: '标签树名称',
                dataIndex: 'name',
                key: 'name',
                width: '50%',
            }, {
                title: '标签树类型',
                dataIndex: 'type',
                key: 'type',
                width: '50%',
                render: type => (treeCodeMap && treeCodeMap[type]) ? treeCodeMap[type] : type
            }
        ];
        return (
            <div className='tenantBox'>
                <BreadCrumbs name={this.state.tenantModifyFlag ? '编辑租户':'新建租户'} rootName='帐号中心' />
                <Form  >
                    <FormItem label='租户名称' {...formItemLayout}>
                        {getFieldDecorator('name',{
                            validateTrigger: "onBlur",
                            rules: [
                                { required: true, message: '请输入租户名称，限制32个字符' },
                                { max: 32, message: '租户名称限制32个字符' },
                            ],
                        })(
                            <Input placeholder="租户名称" />
                        )}
                    </FormItem>
                    <Row>
                        <Col span={2} style={{ textAlign: 'right' }}>关联内容：</Col>
                        <Col>
                            <span>地点标签树（最多选择一个）</span>
                            <Checkbox disabled checked>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this.chooseTreeFn('place')}>选择内容</Button>
                        </Col>
                    </Row>
                    {/* {
                        this.props.addTenantPageReducer && this.props.addTenantPageReducer.placeCheckedData && this.props.addTenantPageReducer.placeCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.addTenantPageReducer.placeCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>

                            </div>
                            : null
                    } */}
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>人名标签树（最多选择一个）</span>
                            <Checkbox disabled checked>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this.chooseTreeFn('human')}>选择内容</Button>
                        </Col>
                    </Row>
                    {/* {
                        this.props.addTenantPageReducer && this.props.addTenantPageReducer.humanCheckedData && this.props.addTenantPageReducer.humanCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.addTenantPageReducer.humanCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>

                            </div>
                            : null
                    } */}
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>数据来源（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>网站来源（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>舆情标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this.chooseTreeFn('label')}>选择内容</Button>
                        </Col>
                    </Row>
                    {/* {
                        this.props.addTenantPageReducer && this.props.addTenantPageReducer.labelCheckedData && this.props.addTenantPageReducer.labelCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.addTenantPageReducer.labelCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>

                            </div>
                            : null
                    } */}
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>场景标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>身份标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>物体标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <span>其他标签树（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    {getFieldDecorator('tenantDataVoList', {
                        initialValue: []
                    })(
                        <Input type='hidden' />
                    )}
                    {getFieldDecorator('status', {
                        initialValue: 'enabled'
                    })(
                        <Input type='hidden' />
                    )}
                    <FormItem>
                        <Button type="primary" htmlType="submit">保存</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.goBackFn}>取消</Button>
                    </FormItem>
                </Form>
                <Modal
                    // title='选择数据集'
                    cancelText='取消'
                    okText='确定'
                    visible={treeVisible}
                    width={'50%'}
                    onOk={this.okTreeModalFn}
                    onCancel={this.cancelTreeModalFn}
                >
                    {/* <UserSearch searchNames={searchTreeNames} onSearchFn={this.searchTreeFn}  /> */}
                    <Spin spinning={getTreeLoad} >
                        {console.log(1, `${tagType && tagType.toLowerCase()}CheckedKeys`, this.props.addTenantPageReducer[`${tagType && tagType.toLowerCase()}CheckedKeys`])}
                        <TableList
                            resourceData={this.state.treeData}
                            columnsUser={columnsTree}
                            emptyText={'暂无信息'}
                            pageChangeFn={this.dataSetPageFn}
                            total={this.state.dataSetTotalNum}
                            current={this.state.dataSetCurrent}
                            isRowSelection={true}
                            selectedRowKeys={this.props.addTenantPageReducer[`${tagType && tagType.toLowerCase()}CheckedKeys`]}
                            onCheckFn={this.treeCheckedFn}
                        />
                        <p style={{ color: 'red', textAlign: 'right' }}>*仅可以选择1个标签树</p>
                    </Spin>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = ({ addTenantPageReducer }) => ({
    addTenantPageReducer,
})

export default Form.create()(AddTenant)
// export default connect(mapStateToProps)(Form.create()(AddTenant))