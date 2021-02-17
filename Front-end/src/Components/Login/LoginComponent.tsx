import React from "react";
import {connect} from "react-redux";
import * as actionTypes_auth from "../../store/actions/auth_actions";
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface Types {
    userName: string,
    email: string,
    password: string,
}

const NormalLoginForm = (props: any) => {


const onFinish = (values: any) => {
    props.login(values.email, values.password);

    props.history.push("/");
  };

  const [form] = Form.useForm<Types>();

  let errorMessage = null;
  if (props.error){
      errorMessage = (
          <p>{props.auth.error.message}</p>
      )
    }

  return (
    <div>
        {errorMessage}
        {
        props.loading ? 

        <Spin/> :

        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        >
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgotpassword">
            Forgot password
            </a>
        </Form.Item> */}

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
            Log in
            </Button>
            Or <a href="/signup">Signup</a>
        </Form.Item>
        </Form>
        }
    </div>   
  );
};



const mapStateToProps = (state: any) => {
    return{
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return{
        login: (email: string, password: string) => dispatch(actionTypes_auth.login({email, password}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);