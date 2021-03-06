/**
 * @author rainci
 */
import React, { PureComponent } from "react";
import { Form, Input, Row, Col, Button, message, Checkbox, Modal, Table, } from 'antd';
import { connect } from 'dva'
import BreadCrumbs from '../../components/breadCrumb'

import TableList from '../../components/tableList'
// import SearchCom from '../../components/search'
import styles from './css/tenant.less'
import { getParams } from '../../utils'
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
// const searchTreeNames = [
//     { 'name': '标签树名称', 'value': 'name', 'num': 8 },
// ];

class AddTenant extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            treeData: [],//tree列表数据
            tenantListPage: 0,//列表总数
            tenantFliter: {},//filter
            treeVisible: false,//model显隐
        }
    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//设置state值
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /***************************页面业务逻辑 begin ******************************/
    /***************tree 业务 begin **************/
    treeCheckedFn = (key, data) => {//标签树checkbox选择回调
        let { tagType: type } = this.state
        this.props.dispatch({ type: 'addTenantPageModal/checkedTree', payload: { type, key, data } })
    }
    searchTreeFn = ({ filter = {}, page, type }) => {//tree search 按钮
        this.props.dispatch({ type: 'addTenantPageModal/fetchTreeList', payload: { ...filter, type: (type || this.state.tagType), page } })
    }
    _chooseTreeFn = type => {//选择标签树按钮
        this.setStateValueFn('treeVisible', true)
        this.setStateValueFn('tagType', type)
        if (this.props[`${type}ListData`].length) return;
        this.searchTreeFn({ type })
    }
    _onPageChange = page => {//分页
        this.searchTreeFn({ page })
    }
    cancelTreeModalFn = () => {//tree取消按钮
        this.setStateValueFn('treeVisible', false)
        let { tagType: type } = this.state
        this.props.dispatch({ type: 'addTenantPageModal/cancelTree', payload: { type, ...this[`${type}KeyAndData`] } })
    }
    okTreeModalFn = () => {//tree确定按钮
        let { tagType } = this.state,
            typeData = `${tagType}CheckedData`,
            typeKey = `${tagType}CheckedKeys`;
        if (this.props[typeKey].length > 1) {
            return message.warn('仅可以选择1个标签树')
        }
        this.setStateValueFn('treeVisible', false)
        this[`${tagType}KeyAndData`] = { data: this.props[typeData], key: this.props[typeKey] }//弹框点击确定按钮时，保存一下数据，为了当点击取消按钮时，找到上次保存的源数据
    }
    treeDeleteFn = ({ tagId, type }) => {//页面上删除按钮
        let tagType = type.charAt(0).toUpperCase() + type.substr(1)
        this.props[`on${tagType}DeleteFn`] && this.props[`on${tagType}DeleteFn`](tagId)
    }
    /***************tree 业务 end **************/
    dealSampleDataFn = (data = []) => { //将有多属性的data列表处理成简单属性的data列表  
        if (!data || !data.length) return [];
        return data.map(({ tagId, name, code, type }) => {
            return { dataId: tagId, dataName: name, dataCode: code, type }
        });
    }
    addTenantBtnFn = (filter) => {//创建租户后逻辑
        let { tenantModifyFlag, tenantId } = this.state;
        if (tenantModifyFlag) {
            filter.tenantId = tenantId * 1
            this.props.dispatch({ type: 'addTenantPageModal/fetchAddTenant', payload: filter })
        }
        this.props.dispatch({ type: 'addTenantPageModal/fetchAddTenant', payload: filter })
    }
    addTenantFn = e => {//搜索
        e && e.preventDefault()
        const { placeCheckedData, humanCheckedData, labelCheckedData, } = this.props;
        let tenantDataVoList = [//组装数据
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
        if (!data || !data.length) return;
        let typeData = {},
            typeId = {};
        data.forEach(({ dataId, dataName, dataCode, type } = {}) => {
            if (!typeData[type]) {
                typeData[type] = [];
                typeId[type] = [];
            }
            typeData[type].push({ tagId: dataId, name: dataName, code: dataCode, type })
            typeId[type].push(dataId)
        })
        Object.keys(typeData).forEach(type => {
            this.props.dispatch({ type: 'addTenantPageModal/checkedTree', payload: { type, key: typeId[type], data: typeData[type] } })
        })
    }
    getTenantIdDetailFn = tenantId => { //获取详情信息，回显form表单函数
        let _this = this;
        this.props.dispatch({ type: 'addTenantPageModal/fetchTenantDetail', payload: { tenantId } })
            .then(({ name, tenantDataVoList } = {}) => {
                this.props.form && this.props.form.setFieldsValue({//form内容回显
                    name,
                })
                _this.dealTenantVoListFn(tenantDataVoList)
            })
    }
    isGetTenantDetailFn = () => { //是否是修改租户并获取租户详情
        let tenantId = getParams().tenantId;
        console.log(11111, tenantId)
        if (tenantId) {
            this.getTenantIdDetailFn(tenantId);
            this.setState({ tenantModifyFlag: true, tenantId })
        }
    }
    /***************************页面业务逻辑 end ******************************/
    /***************************生命周期 begin *******************************/
    componentDidMount() {
        // let { onPlaceInitFn, onHumanInitFn, onLabelInitFn } = this.props;
        // onPlaceInitFn && onPlaceInitFn()
        // onHumanInitFn && onHumanInitFn()
        // onLabelInitFn && onLabelInitFn()
        this.isGetTenantDetailFn()
    }
    /***************************生命周期 end *******************************/
    render() {
        const { getFieldDecorator } = this.props.form;
        let { treeVisible, tagType, treeCodeMap } = this.state;
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
            <div className={styles.tenantBox}>
                <BreadCrumbs name={this.state.tenantModifyFlag ? '编辑租户' : '新建租户'} rootName='帐号中心' />
                <Form  >
                    <FormItem label='租户名称' {...formItemLayout}>
                        {getFieldDecorator('name', {
                            validateTrigger: "onBlur",
                            rules: [
                                { required: true, message: '请输入租户名称，限制32个字符' },
                                { max: 32, message: '租户名称限制32个字符' },
                            ],
                        })(
                            <Input placeholder="租户名称" />
                        )}
                    </FormItem>
                    <Row className={styles.antRow}>
                        <Col span={2} style={{ textAlign: 'right' }}>关联内容：</Col>
                        <Col>
                            <span>地点标签树（最多选择一个）</span>
                            <Checkbox disabled checked>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this._chooseTreeFn('place')}>选择内容</Button>
                        </Col>
                    </Row>
                    {
                        this.props.placeCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.placeCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>
                            </div>
                            : null
                    }
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>人名标签树（最多选择一个）</span>
                            <Checkbox disabled checked>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this._chooseTreeFn('human')}>选择内容</Button>
                        </Col>
                    </Row>
                    {
                        this.props.humanCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.humanCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>

                            </div>
                            : null
                    }
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>数据来源（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤 </Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>网站来源（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>舆情标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' onClick={() => this._chooseTreeFn('label')}>选择内容</Button>
                        </Col>
                    </Row>
                    {
                        this.props.labelCheckedData.length ?
                            <div className='tableBox' style={{ 'clear': 'both', 'overflow': 'hidden' }}>
                                <div className='ant-col-2'></div>
                                <div className='ant-col-10'>
                                    <Table
                                        columns={columnsTagTree}
                                        dataSource={this.props.labelCheckedData}
                                        rowKey={(record, index) => `${record.tagId}${index}`}
                                        pagination={false}
                                        size={'small'}
                                    />
                                </div>

                            </div>
                            : null
                    }
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>场景标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>身份标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>物体标签树（最多选择一个）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <Button type="primary" size='small' disabled>选择内容</Button>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
                        <Col span={2}></Col>
                        <Col>
                            <span>其他标签树（可多选）</span>
                            <Checkbox disabled>是否作为数据权限过滤</Checkbox>
                        </Col>
                    </Row>
                    <Row className={styles.antRow}>
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
                        <Button type="primary" onClick={this.addTenantFn}>保存</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.goBackFn}>取消</Button>
                    </FormItem>
                </Form>
                <Modal
                    title={tagType}
                    cancelText='取消'
                    okText='确定'
                    visible={treeVisible}
                    width={'50%'}
                    onOk={this.okTreeModalFn}
                    onCancel={this.cancelTreeModalFn}
                >
                    {/* <SearchCom searchNames={searchTreeNames} onSearch={this.searchTreeFn}  /> */}
                    <TableList
                        resourceData={this.props[`${tagType}ListData`]}
                        columnsUser={columnsTree}
                        emptyText={'暂无信息'}
                        pageChangeFn={this._onPageChange}
                        total={this.props[`${tagType}ListDataTotal`] * 1}
                        current={this.props[`${tagType}ListDataCurrent`]}
                        isRowSelection={true}
                        selectedRowKeys={this.props[`${tagType}CheckedKeys`]}
                        onCheckFn={this.treeCheckedFn}
                    />
                    <p style={{ color: 'red', textAlign: 'right' }}>*仅可以选择1个标签树</p>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = ({ addTenantPageModal, loading }) => ({
    loading,
    ...addTenantPageModal,
})

// export default Form.create()(AddTenant)
export default connect(mapStateToProps)(Form.create()(AddTenant))