"use client";
import React from "react";
import { Breadcrumb, Card, Col, Image, Row, Tag } from "antd";
import MainLayout from "@/app/components/MainLayout";

export default function Video() {
  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Help & Support</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Video",
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
                  <Image
                    src="/images/videoThumbnail.png"
                    alt="video"
                    preview={false}
                  />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>Dos & Donts Video </div>
                    </Col>
                    <Col>
                      <Tag>1:20 Mins</Tag>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image
                    src="/images/videoThumbnail.png"
                    alt="video"
                    preview={false}
                  />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>Dos & Donts Video </div>
                    </Col>
                    <Col>
                      <Tag>1:20 Mins</Tag>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image
                    src="/images/videoThumbnail.png"
                    alt="video"
                    preview={false}
                  />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>Dos & Donts Video </div>
                    </Col>
                    <Col>
                      <Tag>1:20 Mins</Tag>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div className="video_container">
                  <Image
                    src="/images/videoThumbnail.png"
                    alt="video"
                    preview={false}
                  />
                </div>
                <div>
                  <Row justify={"space-between"}>
                    <Col>
                      <div>Dos & Donts Video </div>
                    </Col>
                    <Col>
                      <Tag>1:20 Mins</Tag>
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
