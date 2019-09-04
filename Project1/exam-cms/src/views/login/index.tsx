import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {WrappedFormUtils} from 'antd/lib/form/Form'
import {inject, observer} from 'mobx-react'
import './index.css'

interface Props {
  form: WrappedFormUtils,
  user: any,
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
        const result = await this.props.user.login(values);
        console.log('result...', result);
        if (result === 1){
          // 跳转路由
        }else{
          // 提示错误
        }
      }
    });
  };

  render(){
    console.log('props...', this.props, this.props.user.login);

    // 表单校验的高阶组件
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <span>{this.props.user.isLogin?'true': 'false'}</span>
        <Form.Item>
          {getFieldDecorator('user_name', {
            validateTrigger: 'onBlur',
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