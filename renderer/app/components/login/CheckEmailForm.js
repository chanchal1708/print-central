import React from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

export default function CheckEmailForm({
  setForgotPasswordForm,
  setCheckEmailForm,
}) {
  const backToForgotPassword = () => {
    setCheckEmailForm(false);
  };
  const backToLogin = () => {
    setForgotPasswordForm(false);
    setCheckEmailForm(false);
  };

  return (
    <>
      <div className="qc_mb_3">
        <Button type="link" onClick={backToForgotPassword} className="link">
          <LeftOutlined /> Back
        </Button>
      </div>
      <h1 className="qc_mb_1">Check Your Email!</h1>
      <p className="qc_mb_5">One time password will send to your email ID</p>

      <Button type="primary" onClick={backToLogin} size="large" block>
        Login with one time password
      </Button>
      <div className="qc_mt_5 text_center">
        <Button type="link" className="link">
          Resend Email
        </Button>
      </div>
    </>
  );
}
