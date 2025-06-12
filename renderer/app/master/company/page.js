"use client";
import React from "react";
import { Breadcrumb, Button, Card, Col, Input, Row } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
const { Search } = Input;

export default function Company() {
  const handleOpenPage = () => {
    redirect("/master/company-add");
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Master</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Company",
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
                    <Search placeholder="Company Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Company Name" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Company
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="grid_list_container">
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Card
                className="grid_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Company Name</small>
                    <div>Control Print Pvt. Ltd.</div>
                  </div>
                }
                actions={[
                  <Row key="row" align={"middle"} justify={"space-between"}>
                    <Col>
                      <Button key="view-contact" aria-label="View Contact">
                        View Contact
                      </Button>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <>
                  <div className="card_content">
                    <Row gutter={[10, 10]}>
                      <Col span={12}>
                        <div className="qc_key">Company Code</div>
                        <div className="qc_value">CPL-001</div>
                      </Col>
                      <Col span={12}>
                        <div className="qc_key">Company Type</div>
                        <div className="qc_value">Manufacturing</div>
                      </Col>
                      <Col span={12}>
                        <div className="qc_key">License No.</div>
                        <div className="qc_value">WHC-002-236541</div>
                      </Col>
                      <Col span={12}>
                        <div className="qc_key">IP Address</div>
                        <div className="qc_value">101.02..30.001</div>
                      </Col>
                    </Row>
                  </div>
                  <div className="qc_mt_5">
                    <Row gutter={[30, 10]}>
                      <Col span={10}>
                        <div className="qc_key">Address</div>
                        <div className="qc_value">
                          A-36, First Floor, Sector 4 Noida, Uttar Pradesh,
                          India
                        </div>
                      </Col>
                      <Col span={7}>
                        <div className="qc_key">City Name</div>
                        <div className="qc_value">Noida</div>
                      </Col>
                      <Col span={7}>
                        <div className="qc_key">State Name</div>
                        <div className="qc_value">Uttar Pradesh</div>
                      </Col>
                    </Row>
                  </div>
                </>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
