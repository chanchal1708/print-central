import React, { useState } from "react";
import styles from "@/styles/Login.module.scss";
import { Form, Input, Button, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";

export default function ForgotPassword({
  setForgotPasswordForm,
  setCheckEmailForm,
}) {
  const [dataLoading, setDataLoading] = useState(false);

  // back to login
  const backToLogin = () => {
    setForgotPasswordForm(false);
  };

  // on click check email
  const onClickCheckEmail = () => {
    setDataLoading(true);
    setCheckEmailForm(true);
    setDataLoading(false);
  };

  const handleOnSubmit = async (values) => {
    console.log("values forgot password", values);
    onClickCheckEmail();
  };
  return (
    <>
      <div className="qc_mb_3">
        <Button type="link" onClick={backToLogin} className="link">
          <LeftOutlined /> Back
        </Button>
      </div>
      <h1 className="qc_mb_1">Forgot Your Password?</h1>
      <p className="qc_mb_5">
        Enter your e-mail ID and plant ID so that we can send you password reset
        link.
      </p>
      <Spin spinning={dataLoading}>
        <Form
          name="basic"
          layout={"vertical"}
          autoComplete="off"
          onFinish={handleOnSubmit}>
          <Form.Item
            label="Plant ID"
            name="plant_id"
            rules={[
              {
                required: true,
                message: "Please enter your Plant ID!",
              },
            ]}>
            <Input
              style={{ textTransform: "uppercase" }}
              type="text"
              className={`${styles.inputText}`}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}>
            <Input type="text" className={`${styles.inputText}`} size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
