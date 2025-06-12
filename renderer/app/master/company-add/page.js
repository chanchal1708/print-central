"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

export default function CompanyAdd() {
  const [form] = Form.useForm();
  const [formContact] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleBackToList = () => {
    redirect("/master/company");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
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
      name: "Mike",
      contactNo: 9988776655,
      email: "user@cpl.com",
      designation: "IT Head",
      purpose: "For Software related",
      action: (
        <Space>
          {contextHolder}
          <Button icon={<EditOutlined />} size="small" />
          <Popconfirm
            title="Delete the contact"
            description="Are you sure to delete this contact?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<CloseOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleSave = async () => {};

  const handleSubmit = async (values) => {
    console.log("values--->>--", values);
  };

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
                    Company
                  </div>
                ),
              },
              {
                title: "Add Company",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="grid_list_container">
          <div>
            <Form
              style={{ width: "736px" }}
              form={form}
              name="basic"
              layout={"vertical"}
              autoComplete="off"
              initialValues={{
                Active: true,
              }}
              onFinish={handleSubmit}
            >
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Company Code"
                    name="CompanyCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input your company code!",
                      },
                    ]}
                  >
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
                        message: "Please input your company name!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Company Type"
                    name="CompanyType"
                    rules={[
                      {
                        required: true,
                        message: "Please input your company type!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select Type"
                      options={[
                        {
                          value: "Type 1",
                          label: "Type 1",
                        },
                        {
                          value: "Type 2",
                          label: "Type 2",
                        },
                        {
                          value: "Type 3",
                          label: "Type 3",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="License No."
                    name="LicenseNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input your License No.!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="IP Address"
                    name="IpAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input your IP Address!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Active"
                    name="Active"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Switch
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      defaultChecked
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Company Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Address!",
                      },
                    ]}
                  >
                    <TextArea showCount type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Pin Code"
                    name="PinCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Pin Code!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Country"
                    name="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Country!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="State"
                    name="State"
                    rules={[
                      {
                        required: true,
                        message: "Please input your State!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="City"
                    name="City"
                    rules={[
                      {
                        required: true,
                        message: "Please input your City!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Divider />
                  <h3>Contact</h3>
                  <div className="qc_mt_5">
                    <Button
                      icon={<PlusOutlined />}
                      onClick={showModal}
                      type="primary"
                    >
                      Add a row
                    </Button>
                    <div className="qc_mb_5">
                      <Table
                        className="qc_mt_2"
                        dataSource={dataSource}
                        columns={columns}
                        size="small"
                        pagination={false}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Col span={24}>
                <Form.Item>
                  <Space size="large" className="qc_mt_5">
                    <Button type="primary" htmlType="submit" size="large">
                      Update
                    </Button>
                    <Button htmlType="button" size="large">
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Form>
            <Modal
              title="Add Contact"
              open={modalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form form={formContact} onFinish={handleSave} layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="Name"
                      rules={[{ required: true, message: "Please enter name" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Contact No."
                      name="ContactNo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="Email"
                      rules={[
                        { required: true, message: "Please enter email" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Designation"
                      name="Designation"
                      rules={[
                        { required: true, message: "Please enter designation" },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Purpose"
                      name="Purpose"
                      rules={[
                        { required: true, message: "Please enter purpose" },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>

                    <Button onClick={handleCancel}> Cancel</Button>
                  </Space>
                </Row>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
