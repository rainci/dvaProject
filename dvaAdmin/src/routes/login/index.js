import * as React from 'react'
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd';
import styles from './index.less'
const FormItem = Form.Item;

class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }
    loginSubmit = () => {//登录按钮
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let { userName, password } = values;
                if (userName === 'xixi' && password === '11111111') {
                    this.props.dispatch({type:'fetchLogin',payload: {userName,password}})
                    // this.props.history.push('/main') 
                }
            }
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.loginBody}>
                <div className={styles.loginlogo}></div>
                <div className={styles.textBox}>
                    <div className={styles.textLine}></div>
                    <div>
                        <h3>CMS管理系统</h3>
                        <p>让视频的每一秒都是人工智能</p>
                    </div>
                </div>
                <div className={styles.loginBox}>
                    <h2>欢迎登录</h2>
                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入帐号!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码!' },
                                    { min: 8, max: 20, message: '密码长度限制在8到20位' },
                                ],
                                validateTrigger: 'onBlur'
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" className="login-form-button" onClick={this.loginSubmit} style={{ width: '100%' }}>
                                登录
                            </Button>
                        </FormItem>

                    </Form>
                </div>

            </div>
        )
    }
}
const mapStateToProps = ({ loginPage, loading }) => {
    const { userName, password } = loginPage;
    return {
        loading,
        userName,
        password,
    };
}
export default connect(mapStateToProps)(Form.create()(LoginPage));
