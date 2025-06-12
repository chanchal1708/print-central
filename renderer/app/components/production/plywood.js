"use client";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Space, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker, InputNumber } from "antd";
import { useSelector } from "react-redux";

export default function Plywood() {
  const searchParams = useSearchParams();
  const { selectedIndustry, selectedFields } = useSelector(
    (state) => state.product
  );

  console.log(selectedIndustry, "selectedIndustryselectedIndustry");
  console.log(selectedFields, "selectedFieldsselectedFieldsselectedFields");
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [configFields, setConfigFields] = useState([]);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setConfigFields(decodedData);
      } catch (e) {
        console.error("Failed to parse data", e);
      }
    }
  }, [searchParams]);

  const getInputComponent = (type) => {
    switch (type?.toLowerCase()) {
      case "text":
      case "text/input":
      case "alphanumeric":
        return <Input />;
      case "numeric":
        return <InputNumber style={{ width: "100%" }} />;
      case "date":
        return <DatePicker style={{ width: "100%" }} />;
      default:
        return <Input />;
    }
  };

  const handleBackToProduction = () => {
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
      router.push("/configuration/print-configuration?industry=plywood");
    }, 1000);
  };

  const handleProductionSubmit = async (val) => {
    setLoading(true);

    const finalFields = configFields.map((field) => {
      const sanitizedKey = field.fieldName.replace(/\s+/g, "_");
      const value = val[sanitizedKey];

      let finalValue = value;
      if (
        value &&
        typeof value === "object" &&
        typeof value.toISOString === "function"
      ) {
        finalValue = value.toISOString();
      }

      return {
        name: field.fieldName,
        type: field.type,
        value: finalValue,
      };
    });

    const payload = {
      industry: "plywood",
      feilds: finalFields,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:3005/v1/productdetails/addproductdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok && result.status === 1) {
        console.log("API Success:", result);
        router.push("/transaction/production");
      } else {
        console.error("API Error:", result.data || "Unknown error occurred");
        alert(
          "Failed to save production details: " +
            (result.data || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error occurred while submitting data");
    } finally {
      setLoading(false);
    }
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const formStyle = {
    width: "60%",
  };

  const cardStyle = {
    width: "35%",
    display: "flex",
    justifyContent: "flex-end",
  };

  const cardImageStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  };

  return (
    <Spin spinning={loading} tip="Processing...">
      <div style={formContainerStyle}>
        <div style={formStyle}>
          <Form
            form={form}
            name="dynamic_form"
            layout="vertical"
            autoComplete="off"
            onFinish={handleProductionSubmit}
          >
            <Row gutter={[32]}>
              {configFields.map((field) => (
                <Col span={12} key={field.fieldName}>
                  <Form.Item
                    label={field.fieldName}
                    name={field.fieldName.replace(/\s+/g, "_")}
                  >
                    {getInputComponent(field.type)}
                  </Form.Item>
                </Col>
              ))}
              <Col span={24}>
                <Space>
                  <Button type="primary" htmlType="submit" size="large">
                    Save
                  </Button>
                  <Button size="large" onClick={handleBackToProduction}>
                    Clear
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={cardStyle}>
          <img
            src="/images/Frame 721 (1).png"
            alt="Placeholder"
            style={cardImageStyle}
          />
        </div>
      </div>
    </Spin>
  );
}
