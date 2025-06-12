"use client";
import React from "react";
import { Breadcrumb, Button, Col, Input, Row, Space, Table, Tag } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
const { Search } = Input;

export default function Line() {
  const handleOpenPage = () => {
    redirect("/master/line-add");
  };

  const columns = [
    {
      title: "Line Code",
      dataIndex: "lineCode",
      key: "lineCode",
    },
    {
      title: "Line Name",
      dataIndex: "lineName",
      key: "lineName",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Printer IP:Port ",
      dataIndex: "printerIPPort",
      key: "printerIPPort",
    },
    {
      title: "Scanner IP Address, Port",
      dataIndex: "scannerIPPort",
      key: "scannerIPPort",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = [
    {
      key: "1",
      lineCode: "Line-360-001",
      lineName: "Line-MH",
      company: "Control Print Ltd.",
      printerIPPort: "192.168.68.00, 8080",
      scannerIPPort: "For Software related",
      products: "CEFAKIND-500 TABLETS 10TAB",
      status: <Tag>Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "2",
      lineCode: "Line-360-001",
      lineName: "Line-MH",
      company: "Control Print Ltd.",
      printerIPPort: "192.168.68.00, 8080",
      scannerIPPort: "For Software related",
      products: "CEFAKIND-500 TABLETS 10TAB",
      status: <Tag>Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "3",
      lineCode: "Line-360-001",
      lineName: "Line-MH",
      company: "Control Print Ltd.",
      printerIPPort: "192.168.68.00, 8080",
      scannerIPPort: "For Software related",
      products: "CEFAKIND-500 TABLETS 10TAB",
      status: <Tag>Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "4",
      lineCode: "Line-360-001",
      lineName: "Line-MH",
      company: "Control Print Ltd.",
      printerIPPort: "192.168.68.00, 8080",
      scannerIPPort: "For Software related",
      products: "CEFAKIND-500 TABLETS 10TAB",
      status: <Tag>Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "5",
      lineCode: "Line-360-001",
      lineName: "Line-MH",
      company: "Control Print Ltd.",
      printerIPPort: "192.168.68.00, 8080",
      scannerIPPort: "For Software related",
      products: "CEFAKIND-500 TABLETS 10TAB",
      status: <Tag>Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Master</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Line",
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
                    <Search placeholder="Search Line Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Line Name" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Line
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
