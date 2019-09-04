import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {WrappedFormUtils} from 'antd/lib/form/Form'
import {History} from 'history/index'
import {inject, observer} from 'mobx-react'
import './index.css'

interface Props {
  form: WrappedFormUtils,
  user: any,
  history: History,
  abc?: string
}

@inject('user')
@observer
class LoginPage extends React.Component<Props>{
  constructor(props: Props){
    super(props);
    
    // 1. ts中的变量，尽量少用any
    // let a:object = {form: this.props.form};

    // 2. ts中的函数，尽量少用void
    // function add(num1: number, num2: any): object[]{
    //   // return num1+num2;
    //   return [{}]
    // }
    
    // let add: (num1: number, num2: any)=>object[] = (num1, num2)=>{
    //   return [{}]
    // }

    // add(1, 1);

    // console.log(add(1, '2', 100));

    // // 3. 接口和枚举
    // interface Props{

    // }

    // enum Enum{

    // }

    // // 4.泛型
    // function add<T>(num1: T, num2: T): T{
    //   return num1;
    // }
    // add<string>('abc', 'def');
  }

  // 登陆处理函数 
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {code, msg} = await this.props.user.login(values);

        if (code === 1){
          // 跳转路由
          this.props.history.replace('/main');
        }else{
          // 提示错误
          message.error(msg || '用户名或密码错误');
        }
      }
    });
  };

  render(){
    console.log('props...', this.props, this.props.user.login);

    // 表单校验的高阶组件
    const { getFieldDecorator } = this.props.form;
    const {user_name, user_pwd} = this.props.user.account;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('user_name', {
            validateTrigger: 'onBlur',
            initialValue: user_name,
            rules: [
              { validator: (ruler, value, callback)=>{
                console.log('value...', value);
                if (/[a-z]{5,20}/.test(value)){
                  callback();
                }else{
                  callback('Please input valid username!')
                }
              }}
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('user_pwd', {
            validateTrigger: 'onBlur',
            initialValue: user_pwd,
            rules: [
              { validator: (ruler, value, callback)=>{
                console.log('value...', value);
                if (/^(?![a-z]+$)(?![A-Z]+$)(?!([^(a-zA-Z\!\*\.\#)])+$)^.{8,16}$/.test(value)){
                  callback();
                }else{
                  callback('Please input valid password!')
                }
              }}
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
        </Form.Item>
        <Form.Item>
           {getFieldDecorator('autoLogin', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Auto login in 7 days</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LoginPage);