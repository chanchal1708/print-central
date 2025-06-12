"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "@/styles/login.module.scss";
import { Form, Input, Button, Spin, Breadcrumb, message } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function LoginForm({ setForgotPasswordForm }) {
  const [dataLoading, setDataLoading] = useState(false);
  const { data: session, status } = useSession();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleBackToList = () => {
    router.push("/activationkey");
  };

  const onClickForgotPassword = () => {
    setDataLoading(true);
    // Simulate loading delay for UX
    setTimeout(() => {
      setForgotPasswordForm(true);
      setDataLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (status === "authenticated" && window.location.pathname === "/login") {
      setDataLoading(false);
      router.push("/configuration/hardware-configuration");
    }
  }, [status, router]);

  const handleOnSubmit = async (values) => {
    setDataLoading(true);
    try {
      let finalData = {
        email: String(values?.Email),
        password: values?.Password,
      };

      let res = await axios.post(
        "http://127.0.0.1:3005/v1/user/loginUser",
        finalData,
        {
          validateStatus: () => true,
        }
      );

      if (res.data && res?.data?.status === 1) {
        messageApi.open({
          type: "success",
          content: "Login successful",
        });
        router.push("/configuration/hardware-configuration");
      } else {
        messageApi.open({
          type: "error",
          content: res?.data?.data || "Invalid credentials",
        });
        setDataLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.open({
        type: "error",
        content: "Something went wrong. Please try again.",
      });
      setDataLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setDataLoading(true);
    signIn("google", {
      callbackUrl: "/configuration/hardware-configuration",
    });
  };

  return (
    <>
      {contextHolder}
      <div className="page_title_container">
        <div>
          <Breadcrumb
            items={[
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Back
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <h1 className="qc_mb_3">Login</h1>

      <Spin spinning={dataLoading} tip="Please wait...">
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={handleOnSubmit}
        >
          <Form.Item
            label="Email ID"
            name="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input type="text" className={styles.inputText} size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              name="password"
              className={styles.inputText}
              size="large"
            />
          </Form.Item>

          <div className="text_right qc_mb_5">
            <Button
              onClick={onClickForgotPassword}
              className={`link ${styles.forgot__link}`}
              type="link"
            >
              Forgot Password ?
            </Button>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>

          {/* <Form.Item>
            <Button
              type="default"
              onClick={handleGoogleLogin}
              size="large"
              block
            >
              Sign in with Google
            </Button>
          </Form.Item> */}
        </Form>
      </Spin>
    </>
  );
}
