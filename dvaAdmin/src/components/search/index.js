/**
 * 
 * @param {Array} searchNames
 * @param {Boolen} emptyFlag 
 * @param {Function} onSearch 搜索功能 
 * @param {Function} onBlur 失焦
 * @return {component} SearchCom 
 * @author rainci(刘雨熙)
 */
import React, { useEffect } from "react";
import { Form, Input, Row, Col, Button, } from 'antd';

const FormItem = Form.Item;

const SearchCom = (props) => {
    let { form, searchNames, emptyFlag } = props;
    const { getFieldDecorator } = form;    

    const _onSearch = (e, fnName) => {//搜索
        e && e.preventDefault();
        form.validateFields((err, filter) => {
            props[fnName] && props[fnName](filter)
        })    
    }
    const _onReset = () => {//重置
        form.resetFields();
    }
    useEffect(() => {//异步 模拟生命周期
        if(emptyFlag){
            _onReset()
        }
    }, [emptyFlag])
    return (
        <Form onSubmit={ e => { _onSearch(e, 'onSearch') }} >
            <Row gutter={15}>
                <Col span={24}>
                    {
                        searchNames.map(item => {
                            const { name, value, num } = item;
                            return (
                                <Col key={name} span={num}>
                                    <FormItem>
                                        {getFieldDecorator(value)(
                                            <Input placeholder={name} onBlur={(e) => { _onSearch(e, 'onBlur') }} />
                                        )}
                                    </FormItem>
                                </Col>
                            )
                        })

                    }
                    <Col span={4}>
                        <FormItem>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button type="primary" onClick={_onReset}>重置</Button>
                        </FormItem>
                    </Col>
                </Col>

            </Row>
        </Form>
    )
}
export default Form.create()(SearchCom)
