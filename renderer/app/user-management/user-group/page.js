"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Space,
  Switch,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function UserGroup() {
  const [form] = Form.useForm();
  const [editform] = Form.useForm();
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState(false);

  const onFinish = async (values) => {
    console.log("values--->>--", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishEdit = async (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleEdit = () => {
    setIsEditingGroup(true);
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "User Group",
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
                    <Search placeholder="Search Group Name/Code" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="user_group_container">
          {/* ===== add group item =====  */}
          <div className="user_group_item">
            <Form
              name="basic"
              form={form}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                Active: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Row gutter={[24, 16]} align="middle">
                <Col span={6}>
                  <Form.Item
                    label="Group Name"
                    name="RoleName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Group Name!",
                      },
                    ]}>
                    {isAddingGroup ? <Input /> : <div>----</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Group Code"
                    name="RoleId"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Group Code!",
                      },
                    ]}>
                    {isAddingGroup ? <Input /> : <div>----</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Status" name="Active">
                    {isAddingGroup ? (
                      <Space>
                        <Switch checkedChildren="On" unCheckedChildren="Off" />
                        <Tag color="green">Active</Tag>
                      </Space>
                    ) : (
                      <div>----</div>
                    )}
                  </Form.Item>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  <Form.Item label={null}>
                    {!isAddingGroup ? (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => setIsAddingGroup(true)}>
                        Add New Group
                      </Button>
                    ) : (
                      <div>
                        <Space size="large">
                          <Button
                            className="link_primary"
                            type="link"
                            htmlType="submit">
                            Save
                          </Button>
                          <Button
                            className="link"
                            type="link"
                            htmlType="submit"
                            onClick={() => setIsAddingGroup(false)}>
                            Cancel
                          </Button>
                        </Space>
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          {/* ===== group row =====  */}
          <div className="user_group_item">
            <Form
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              form={editform}
              onFinish={onFinishEdit}>
              <Row gutter={[24, 16]} align="middle">
                <Col span={6}>
                  <Form.Item
                    label="Group Name"
                    name="RoleName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Group Name!",
                      },
                    ]}>
                    {isEditingGroup ? <Input /> : <div>Role Name</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Group Code" name="RoleId">
                    {isEditingGroup ? <Input /> : <div>Role Id</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  {isEditingGroup ? (
                    <Form.Item label="Status" name="Active">
                      <Switch checkedChildren="On" unCheckedChildren="Off" />
                    </Form.Item>
                  ) : (
                    <Form.Item label="Status" name="Active1">
                      <Switch checkedChildren="On" unCheckedChildren="Off" />
                    </Form.Item>
                  )}
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  {!isEditingGroup ? (
                    <Form.Item label="Action" name="Action">
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit()}
                        size="small"
                      />
                    </Form.Item>
                  ) : (
                    <Space size="large">
                      <Button
                        className="link_primary"
                        type="link"
                        htmlType="submit">
                        Save
                      </Button>
                      <Button
                        className="link"
                        type="link"
                        htmlType="submit"
                        onClick={() => setIsEditingGroup(false)}>
                        Cancel
                      </Button>
                    </Space>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </MainLayout>
  );
}
