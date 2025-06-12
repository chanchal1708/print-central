"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Switch,
  Tag,
  Typography,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
const { Search } = Input;
const { Text } = Typography;

export default function Users() {
  const handleOpenPage = () => {
    redirect("/user-management/user-add");
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "User",
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
                    <Search placeholder="Search User Name" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add User
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="grid_list_container">
          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Card
                className="grid_card user_card"
                title={
                  <div className="card_title qc_mt_2">
                    <div>Montu Yadav</div>
                    <Tag color="green">Role - Admin</Tag>
                  </div>
                }
                actions={[
                  <Row key="row" align={"middle"} justify={"space-between"}>
                    <Col>
                      <Checkbox checked>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Text className="qc_key">User ID</Text>
                      <div className="qc_value">montu</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Employee Code</Text>
                      <div className="qc_value">100024</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Email ID</Text>
                      <div className="qc_value">montu@gmail.com</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card user_card"
                title={
                  <div className="card_title qc_mt_2">
                    <div>Montu Yadav</div>
                    <Tag color="green">Role - Admin</Tag>
                  </div>
                }
                actions={[
                  <Row key="row" align={"middle"} justify={"space-between"}>
                    <Col>
                      <Checkbox checked>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Text className="qc_key">User ID</Text>
                      <div className="qc_value">montu</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Employee Code</Text>
                      <div className="qc_value">100024</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Email ID</Text>
                      <div className="qc_value">montu@gmail.com</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card user_card"
                title={
                  <div className="card_title qc_mt_2">
                    <div>Montu Yadav</div>
                    <Tag color="green">Role - Admin</Tag>
                  </div>
                }
                actions={[
                  <Row key="row" align={"middle"} justify={"space-between"}>
                    <Col>
                      <Checkbox checked>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Text className="qc_key">User ID</Text>
                      <div className="qc_value">montu</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Employee Code</Text>
                      <div className="qc_value">100024</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Email ID</Text>
                      <div className="qc_value">montu@gmail.com</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card user_card"
                title={
                  <div className="card_title qc_mt_2">
                    <div>Montu Yadav</div>
                    <Tag color="green">Role - Admin</Tag>
                  </div>
                }
                actions={[
                  <Row key="row" align={"middle"} justify={"space-between"}>
                    <Col>
                      <Checkbox checked>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Text className="qc_key">User ID</Text>
                      <div className="qc_value">montu</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Employee Code</Text>
                      <div className="qc_value">100024</div>
                    </Col>
                    <Col span={12}>
                      <Text className="qc_key">Email ID</Text>
                      <div className="qc_value">montu@gmail.com</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
