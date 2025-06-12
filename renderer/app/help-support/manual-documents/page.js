"use client";
import React from "react";
import { Breadcrumb, Button, Card, Col, Image, Row, Space } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";

export default function ManualDocuments() {
  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Help & Support</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Manual Documents",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="video_wrapper">
          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image src="/images/pdf.png" alt="video" preview={false} />
                </div>
                <div>
                  <Row justify={"space-between"} align={"middle"}>
                    <Col>
                      <div>How to Add Company.pdf</div>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EyeOutlined />} size="small" />
                        <Button icon={<DownloadOutlined />} size="small" />
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image src="/images/pdf.png" alt="video" preview={false} />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>How to Add Company.pdf</div>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EyeOutlined />} size="small" />
                        <Button icon={<DownloadOutlined />} size="small" />
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image src="/images/pdf.png" alt="video" preview={false} />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>How to Add Company.pdf</div>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EyeOutlined />} size="small" />
                        <Button icon={<DownloadOutlined />} size="small" />
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image src="/images/pdf.png" alt="video" preview={false} />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>How to Add Company.pdf</div>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EyeOutlined />} size="small" />
                        <Button icon={<DownloadOutlined />} size="small" />
                      </Space>
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
