"use client";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  Select,
  InputNumber,
  Form,
  Row,
  Space,
  Button,
  Spin,
} from "antd";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/navigation";
import { message as antdMessage } from "antd";

export default function Configuration() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 🔹 Loading state
  const [printerOptions, setPrinterOptions] = useState([]);
  const [softwareOptions, setSoftwareOptions] = useState([]);
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const handleOnCancel = async () => {
    router.push("/login");
  };
  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const res1 = await axios.post(
        "http://127.0.0.1:3005/v1/dropdown/getDropdown",
        { flag: 1 }
      );
      const res2 = await axios.post(
        "http://127.0.0.1:3005/v1/dropdown/getDropdown",
        { flag: 2 }
      );

      setPrinterOptions(res1?.data?.data || []);
      setSoftwareOptions(res2?.data?.data || []);
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    }
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      const finalData = {
        printer: String(values?.printer),
        printerHead: Number(values?.printerHead),
        printerSoftware: String(values?.printerSoftware),
      };

      const res = await axios.post(
        "http://127.0.0.1:3005/v1/Config/addConfig",
        finalData,
        {
          validateStatus: () => true,
        }
      );

      if (res.data && res.data.status === 1) {
        console.log(" finalData:", finalData);
        messageApi.success("Configuration saved successfully");
        router.push("/configuration/print-configuration");
      } else {
        messageApi.error(res?.data?.data || "Failed to save configuration");
        setLoading(false);
      }
    } catch (error) {
      console.error("API Error:", error);
      messageApi.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Configuration </div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Hardware",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Spin spinning={loading}>
          {contextHolder}
          {/* 🔹 Wrap this to show loader */}
          <div className="qc_page_filter">
            <Form
              form={form}
              onFinish={handleOnSubmit}
              layout="horizontal"
              autoComplete="off"
              initialValues={{
                Active: true,
              }}
            >
              <Row gutter={10} align="middle" style={{ marginTop: "16px" }}>
                <Col span={6}>
                  <Form.Item
                    label="Printer"
                    style={{ fontSize: "16px" }}
                    name="printer"
                    rules={[
                      { required: true, message: "Please select a printer!" },
                    ]}
                  >
                    <Select
                      placeholder="Select Printer"
                      options={printerOptions.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} align="middle" style={{ marginTop: "16px" }}>
                <Col span={6}>
                  <Form.Item
                    label="Printer Head:"
                    style={{ fontSize: "16px" }}
                    name="printerHead"
                    rules={[
                      { required: true, message: "Please input printer head!" },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      min={1}
                      max={10}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} align="middle" style={{ marginTop: "16px" }}>
                <Col span={6}>
                  <Form.Item
                    label="Printer Software:"
                    style={{ fontSize: "16px" }}
                    name={"printerSoftware"}
                    rules={[
                      {
                        required: true,
                        message: "Please select a printer software!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Software"
                      options={softwareOptions.map((item) => ({
                        value: item.value,
                        label: item.label,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Save and Cancel Buttons */}
              <Col span={24} style={{ textAlign: "left" }}>
                <Space>
                  <Button type="primary" htmlType="submit" size="large">
                    Save
                  </Button>
                  <Button size="large" onClick={handleOnCancel}>
                    Cancel
                  </Button>
                </Space>
              </Col>
            </Form>
          </div>
        </Spin>
      </div>
    </MainLayout>
  );
}
