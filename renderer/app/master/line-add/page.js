"use client";
import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

export default function LineAdd() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleBackToList = () => {
    redirect("/master/line");
  };

  const handleLineSubmit = async (values) => {
    console.log("---->>--", values);
  };

  const confirm = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const cancel = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Generic Name",
      dataIndex: "genericName",
      key: "genericName",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "GTIN",
      dataIndex: "gtin",
      key: "gtin",
    },
    {
      title: "Pack Size",
      dataIndex: "packSize",
      key: "packSize",
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
      productName: "CEFAKIND-500 TABLETS 10TAB",
      productCode: "CEFA-001",
      brandName: "Cefakind",
      genericName: "Cefuroxime (500mg)",
      uom: "Strip",
      gtin: "MANK654-2213-2201",
      packSize: "10 Pils/Strip",
      action: (
        <Space>
          {contextHolder}
          <Popconfirm
            title="Delete the contact"
            description="Are you sure to delete this contact?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            <Button icon={<CloseOutlined />} size="small" danger />
          </Popconfirm>
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
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Line
                  </div>
                ),
              },
              {
                title: "Add Line",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Form
          name="basic"
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleLineSubmit}>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="Line Code"
                  name="LineCode"
                  rules={[
                    { required: true, message: "Line Code is required" },
                    {
                      max: 20,
                      message: "Line Code cannot exceed 20 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Line Name"
                  name="LineName"
                  rules={[
                    { required: true, message: "Line Name is required" },
                    {
                      max: 100,
                      message: "Line Name cannot exceed 100 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Company Name"
                  name="CompanyName"
                  rules={[
                    {
                      required: true,
                      message: "Please select your company Name!",
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Add Products*" name="AddProducts">
                  <Select
                    size="large"
                    placeholder="Please select product"
                    options={[
                      {
                        value: "Product 1",
                        label: "Product 1",
                      },
                      {
                        value: "Product 2",
                        label: "Product 2",
                      },
                      {
                        value: "Product 3",
                        label: "Product 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row gutter={[32]}>
            <Col span={20}>
              <Table
                className="qc_mt_2"
                dataSource={dataSource}
                columns={columns}
                size="small"
              />
            </Col>
          </Row>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item label="Status" name="Status">
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[32]}>
              <Col span={24}>
                <Form.Item>
                  <Space size="large">
                    <Button type="primary" htmlType="submit" size="large">
                      Save
                    </Button>
                    <Button htmlType="button" size="large">
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}
