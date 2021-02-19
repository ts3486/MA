import React from 'react';
import {connect} from "react-redux";
import {
  Form,
  Input,
  Tooltip,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { registerUser } from '../../store/actions/auth_actions';
import * as actionTypes_auth from "../../store/actions/auth_actions";



const RegistrationForm = (props: any) => {

  const onFinish = (values: any) => {

    JSON.stringify(values);
    props.registerUser(values.username, values.email, values.password);

    // props.history.push("/");
  };

  const [form] = Form.useForm();

  // const handleSubmit = (e: any) => {
    // e.preventDefault();
      //   props.form.validateFields((err: any, values: any) => {
      //   if(!err){
      //       props.onAuth(
      //           values.userName, 
      //           values.email,
      //           values.password,
      //           values.confirm);
      //   }
      // })
    // after logged in, redirects you to the "/" page.
    // props.history.push("/");
  // }; 
 
  return (
    <div>
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

    <Form.Item
        name="username"
        label={
          <span>
            Username
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
        >
          
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
    return{
        loading: state.auth.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return{
      registerUser: (username:any, email:any, password:any) => dispatch(actionTypes_auth.registerUser({username, email, password}))
      // onAuth: (username: string, email: string, password1: any, password2: any) => dispatch(actionTypes_auth.authSignup(username, email, password1, password2)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

