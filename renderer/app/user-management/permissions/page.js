"use client";
import { useState } from "react";
import { Breadcrumb, Tabs } from "antd";
import MainLayout from "@/app/components/MainLayout";
import UserPermissions from "@/app/components/UserPermission";
import GroupPermissions from "@/app/components/GroupPermissions";

export default function Permissions() {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Permissions",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Tabs
          className="tab_permissions"
          defaultActiveKey="1"
          onChange={handleTabChange}
          activeKey={activeTab}
          items={[
            {
              label: "User Group Role Management",
              key: "1",
              children: <GroupPermissions activeTab={activeTab} />,
            },
            {
              label: "User Role Management",
              key: "2",
              children: <UserPermissions activeTab={activeTab} />,
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
