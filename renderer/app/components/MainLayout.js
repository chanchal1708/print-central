"use client";

import {
  DownOutlined,
  LockOutlined,
  SettingOutlined,
  SyncOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import "../../styles/styles.scss";
import "../../styles/ant-styles.scss";
import { Image, Space, Tree, Spin } from "antd";
import Header from "./Header";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const { DirectoryTree } = Tree;

export default function MainLayout(props) {
  const { children } = props;
  const [expandedKeys] = useState(["Master"]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavRouting = (path) => {
    router.push(path);
  };

  const treeData = [
    {
      title: "Configuration",
      key: "configuration",
      icon: <SettingOutlined />,
      children: [
        {
          title: (
            <span
              className="menu-link"
              onClick={() =>
                handleNavRouting("/configuration/hardware-configuration")
              }
            >
              Hardware Configuration
            </span>
          ),
          key: "password_policy",
          icon: <LockOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <span
              className="menu-link"
              onClick={() =>
                handleNavRouting("/configuration/print-configuration")
              }
            >
              Print Configuration
            </span>
          ),
          key: "general_setting",
          icon: <SettingOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: "Transaction",
      key: "transaction",
      icon: <SyncOutlined />,
      children: [
        {
          title: (
            <span
              className="menu-link"
              onClick={() => handleNavRouting("/transaction/production")}
            >
              Production List
            </span>
          ),
          key: "production_list",
          icon: <UnorderedListOutlined />,
          isLeaf: true,
        },
        {
          title: (
            <span
              className="menu-link"
              onClick={() => handleNavRouting("/transaction/LineManager")}
            >
              Line Manager
            </span>
          ),
          key: "line_master",
          icon: <SettingOutlined />,
          isLeaf: true,
        },
      ],
    },
  ];

  // const onSelect = (keys, info) => {
  //   console.log("Trigger Select--->>--", keys, info);
  // };

  // const onExpand = (keys, info) => {
  //   console.log("Trigger Expand--->>--", keys, info);
  // };

  // useEffect(() => {
  //   const handleStart = () => setLoading(true);
  //   const handleStop = () => setLoading(false);

  //   // Start loading when clicking links
  //   const observer = new MutationObserver(() => {
  //     document.querySelectorAll("a").forEach((el) => {
  //       el.addEventListener("click", handleStart);
  //     });
  //   });

  //   observer.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //   });

  //   handleStop();

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, [pathname]);

  return (
    <main className="qc_main_layout">
      <section className="qc_main_wrapper">
        <aside className="qc_main_side_bar">
          <div className="qc__logo_cpl_logo">
            <Space>
              <Image
                src="/images/qriouscodes-logo.png"
                alt="Qrious Codes Logo"
                preview={false}
              />
              <Image
                src="/images/Control-Print-Logo.png"
                alt="Control Print Limited"
                preview={false}
              />
            </Space>
          </div>
          <div className="tree_nav">
            <DirectoryTree
              multiple
              defaultExpandedKeys={expandedKeys}
              switcherIcon={<DownOutlined />}
              // onSelect={onSelect}
              // onExpand={onExpand}
              treeData={treeData}
            />
          </div>
        </aside>
        <section className="qc_content_right_sec">
          <Header />
          <Spin spinning={loading}>
            <div className="qc_container">{children}</div>
          </Spin>
        </section>
      </section>
    </main>
  );
}
