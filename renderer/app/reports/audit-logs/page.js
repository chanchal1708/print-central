"use client";
import React from "react";
import { Breadcrumb, Button, Col, DatePicker, Row, Select, Table } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function AuditLogs() {
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Before",
      dataIndex: "before",
      key: "before",
    },
    {
      title: "After",
      dataIndex: "after",
      key: "after",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
  ];

  const dataSource = [
    {
      key: "1",
      dateTime: "5-JUL-2024 - 01:59:56 ",
      name: "Krunal Kumar",
      role: "Admin",
      before: "Printer add",
      after: "Printer remove",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
    },
    {
      key: "2",
      dateTime: "5-JUL-2024 - 01:59:56 ",
      name: "Krunal Kumar",
      role: "Admin",
      before: "Printer add",
      after: "Printer remove",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
    },
    {
      key: "3",
      dateTime: "5-JUL-2024 - 01:59:56 ",
      name: "Krunal Kumar",
      role: "Admin",
      before: "Printer add",
      after: "Printer remove",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
    },
    {
      key: "4",
      dateTime: "5-JUL-2024 - 01:59:56 ",
      name: "Krunal Kumar",
      role: "Admin",
      before: "Printer add",
      after: "Printer remove",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
    },
    {
      key: "5",
      dateTime: "5-JUL-2024 - 01:59:56 ",
      name: "Krunal Kumar",
      role: "Admin",
      before: "Printer add",
      after: "Printer remove",
      reason:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry......",
    },
  ];

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Reports</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Audit Logs",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="qc_page_filter">
          <Row justify={"space-between"}>
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item__search">
                    <RangePicker size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Please select user "
                      options={[
                        {
                          value: "User 1",
                          label: "User 1",
                        },
                        {
                          value: "User 2",
                          label: "User 2",
                        },
                        {
                          value: "User 3",
                          label: "User 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button icon={<DownloadOutlined />} type="primary" size="large">
                  Download
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="grid_list_container">
          <Table
            className="qc_mt_2"
            dataSource={dataSource}
            columns={columns}
            size="small"
          />
        </div>
      </div>
    </MainLayout>
  );
}
