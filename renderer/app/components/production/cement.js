"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { DatePicker, InputNumber } from "antd";
function Cement({ industry }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [configFields, setConfigFields] = useState([]);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setConfigFields(decodedData); // save the selected fields
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
      router.push("/configuration/print-configuration?industry=cement"); // <-- added query param
    }, 1000);
  };

  const handleProductionSubmit = async (val) => {
    setLoading(true);

    // Convert Moment objects to ISO strings & sanitize keys
    const serializedValues = {};
    for (const key in val) {
      const value = val[key];
      const sanitizedKey = key.replace(/\s+/g, "_"); // Remove any spaces just in case

      if (
        value &&
        typeof value === "object" &&
        typeof value.toISOString === "function"
      ) {
        serializedValues[sanitizedKey] = value.toISOString(); // Handle date
      } else {
        serializedValues[sanitizedKey] = value;
      }
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:3005/v1/productdetails/addproductdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serializedValues),
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
                  <Button size="large">Clear</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={cardStyle}>
          <img
            src="/images/Frame 721.png"
            alt="Placeholder"
            style={cardImageStyle}
          />
        </div>
      </div>
    </Spin>
  );
}

export default Cement;
