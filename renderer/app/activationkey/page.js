"use client";

import styles from "@/styles/Login.module.scss";
import { Form, Input, Button, Image, Col, Row, Spin } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const activationkey = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async (values) => {
    console.log("values--->>--", values);
    setLoading(true); // 🔹 Start loading

    setTimeout(() => {
      setLoading(false); // 🔹 Stop loading after done
      router.push("/login");
    }, 3500);
  };

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
          <Image src="/images/Frame 381.png" alt="iAggregate" preview={false} />
        </div>
      </div>
      <Row>
        <Col span={6} offset={6}>
          {" "}
        </Col>
        <Spin spinning={loading}>
          {" "}
          <Form
            onFinish={handleOnSubmit}
            name="basic"
            layout={"vertical"}
            autoComplete="off"
          >
            <h1 className="qc_actkey">Activation Key</h1>
            <Form.Item label="Trail Activation Key*" name="activation key">
              <Input
                style={{ textTransform: "uppercase" }}
                type="text"
                className={`${styles.inputText}`}
                size="large"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Activation
            </Button>
          </Form>
        </Spin>
      </Row>
    </main>
  );
};
export default activationkey;
