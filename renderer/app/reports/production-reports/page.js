"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function ProductionReports() {
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
                title: "Production Reports",
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
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Please select Batch "
                      options={[
                        {
                          value: "Batch 1",
                          label: "Batch 1",
                        },
                        {
                          value: "Batch 2",
                          label: "Batch 2",
                        },
                        {
                          value: "Batch 3",
                          label: "Batch 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="production_report_container">
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">ProductName</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">MaterialCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">BatchNumber</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">BatchSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">LineNo</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">ProductCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">DateOfManufacture</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">DateOfExpiry</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">createdAt</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">ProductionQty</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">RejectedSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">SampleQty</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 1
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 2
                      </Button>
                    </Space>
                  </Col>
                  <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">ProductName</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">MaterialCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">BatchNumber</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">BatchSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">LineNo</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">ProductCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">DateOfManufacture</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">DateOfExpiry</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">createdAt</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">ProductionQty</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">RejectedSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">SampleQty</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 1
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 2
                      </Button>
                    </Space>
                  </Col>
                  <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">ProductName</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">MaterialCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">BatchNumber</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">BatchSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">LineNo</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">ProductCode</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">DateOfManufacture</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">DateOfExpiry</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">createdAt</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">ProductionQty</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">RejectedSize</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">SampleQty</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 1
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Custom Button 2
                      </Button>
                    </Space>
                  </Col>
                  <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
