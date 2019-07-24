/**
 * @author rainci
 */
import * as React from 'react'
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less'
import { setList } from '../../utils'
const FormItem = Form.Item;

class LoginPage extends React.PureComponent {
    state={

    }
    /***********公共方法 begin *****************/
    setStateValueFn = (key, value) => {//设置state值
        this.setState({
            [key]: value
        })
    }
    /***********公共方法 end *****************/
    /***************************页面业务逻辑 begin ******************************/
    loginSubmit = () => {//登录按钮
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let { userName, password } = values;
                if (userName === 'xixi' && password === '111111') {
                    this.props.dispatch({type:'loginPage/fetchLogin',payload: {userName,password}})
                    setTimeout(()=>{
                        setList('userInfo', { userName:this.props.userName, token: this.props.token})
                        this.props.history.push('/main') 
                    },3000)
                    
                }
            }
        })

    }
    /***************************页面业务逻辑 end ******************************/
    /***************************生命周期 begin *******************************/
    componentDidMount() {
        
    }
    /***************************生命周期 end *******************************/
    
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
                                validateTrigger: "onBlur",
                                validateFirst: true,
                                rules: [{ required: true, message: '请输入帐号!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                validateTrigger: "onBlur",
                                validateFirst: true,
                                rules: [
                                    { required: true, message: '请输入密码!' },
                                    { min: 6, max: 20, message: '密码长度限制在8到20位' },
                                ],
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
    const { userName, token } = loginPage;
    console.log(111,loginPage,userName,token )
    return {
        loading,
        userName,
        token,
    };
}
export default connect(mapStateToProps)(Form.create()(LoginPage));
