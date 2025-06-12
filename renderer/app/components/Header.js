"use client";
import styles from "@/styles/main-layout/Header.module.scss";
import { DownOutlined, LogoutOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Dropdown, Image, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Header({ user }) {
  const [dataLoading, setDataLoading] = useState(false);
  const router = useRouter();

  const logoutFunction = async () => {
    router.push("/login");
  };

  const items = [
    {
      label: <div>Welcome username!</div>,
      key: "0",
    },
    {
      label: (
        <div>
          <SyncOutlined /> Change Password
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Spin spinning={dataLoading}>
          <div onClick={logoutFunction}>
            <LogoutOutlined /> Logout
          </div>
        </Spin>
      ),
      key: "2",
    },
  ];

  return (
    <>
      <header className={`sec_padding ${styles.qc_main_header}`}>
        <div className={styles.qc__brand__name}>Print Central Demo</div>
        <div className={styles.qc_header_right_col}>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Button
                onClick={(e) => e.preventDefault()}
                className={styles.qc_header_user_info}
              >
                <div className={styles.user_title}>
                  <div className={styles.role}>Admin</div>
                  <div className={styles.user__name}>User Name</div>
                </div>
                <div>
                  <DownOutlined />
                </div>
              </Button>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}
