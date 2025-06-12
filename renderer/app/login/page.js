"use client";
import { useState } from "react";
import styles from "@/styles/Login.module.scss";
import { Image } from "antd";
import LoginForm from "../components/login/LoginForm";
import ForgotPassword from "../components/login/ForgotPassword";
import CheckEmailForm from "../components/login/CheckEmailForm";

export default function Login() {
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
  const [checkEmailForm, setCheckEmailForm] = useState(false);

  return (
    <main className={styles.login_wrapper}>
      <div className={styles.login_info_grid}>
        <div className={styles.brand__logo}>
          <Image
            src="/images/qriouscodes-logo.png"
            alt="Qrious Codes Logo"
            preview={false}
          />
        </div>
        <div className={styles.qriouscodes__img}>
          <Image
            src="/images/qriouscodes-img.png"
            alt="qriouscodes img"
            preview={false}
          />
        </div>
        <div className={styles.brand__name}>
          <Image
            src="/images/iAggregate.png"
            alt="iAggregate"
            preview={false}
          />
        </div>
      </div>
      <div className={styles.login_form_col}>
        <div className={styles.login_form_grid}>
          {/* ==========form========== */}
          {forgotPasswordForm ? (
            <>
              {checkEmailForm ? (
                <CheckEmailForm
                  setForgotPasswordForm={setForgotPasswordForm}
                  setCheckEmailForm={setCheckEmailForm}
                />
              ) : (
                <ForgotPassword
                  setForgotPasswordForm={setForgotPasswordForm}
                  setCheckEmailForm={setCheckEmailForm}
                />
              )}
            </>
          ) : (
            <LoginForm setForgotPasswordForm={setForgotPasswordForm} />
          )}

          {/* ==========form========== */}
        </div>
      </div>
    </main>
  );
}
