"use client";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";

export default function UserAdd() {
  const [form] = Form.useForm();

  const handleBackToList = () => {
    redirect("/user-management/users");
  };

  const handleLineSubmit = async (values) => {
    console.log("---->>--", values);
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Users
                  </div>
                ),
              },
              {
                title: "Add User",
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
          onFinish={handleLineSubmit}
        >
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="User ID"
                  name="UserID"
                  rules={[{ required: true, message: "User ID is required" }]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="User Name"
                  name="UserName"
                  rules={[{ required: true, message: "User name is required" }]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Employee Code"
                  name="EmployeeCode"
                  rules={[
                    {
                      required: true,
                      message: "Please select your employee code!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="User Group"
                  name="UserGroup"
                  rules={[
                    {
                      required: true,
                      message: "Please select your user group!",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Please select user group"
                    options={[
                      {
                        value: "User Group 1",
                        label: "User Group 1",
                      },
                      {
                        value: "User Group 2",
                        label: "User Group 2",
                      },
                      {
                        value: "User Group 3",
                        label: "User Group 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input.Password name="password" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="ConfirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input.Password name="password" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email ID"
                  name="EmailID"
                  rules={[
                    {
                      required: true,
                      message: "Please select your email ID!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Company Code"
                  name="CompanyCode"
                  rules={[
                    {
                      required: true,
                      message: "Please select company code!",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Please select company code"
                    options={[
                      {
                        value: "Company Code 1",
                        label: "Company Code 1",
                      },
                      {
                        value: "Company Code 2",
                        label: "Company Code 2",
                      },
                      {
                        value: "Company Code 3",
                        label: "Company Code 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Status" name="Status">
                  <Space>
                    <Switch
                      defaultChecked
                      checkedChildren="On"
                      unCheckedChildren="Off"
                    />
                    <Tag color="green">Active</Tag>
                  </Space>
                </Form.Item>
              </Col>
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
