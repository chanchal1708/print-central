"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Col, Row, Input, Form, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MainLayout from "@/app/components/MainLayout";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduction,
  updateProduction,
} from "../../../redux/productionSlice";
import moment from "moment";

export default function Production() {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBackToList = () => {
    router.push("/transaction/production");
  };

  const editData = useSelector((state) => state.productionInfo.editData);

  useEffect(() => {
    if (editData) {
      const formData = { ...editData.data };

      if (formData.manufacturingDate) {
        const mDate = moment(formData.manufacturingDate, "lll");
        if (mDate.isValid()) {
          formData.manufacturingDate = mDate.format("YYYY-MM-DD");
        }
      }

      if (formData.expiryDate) {
        const eDate = moment(formData.expiryDate, "lll");
        if (eDate.isValid()) {
          formData.expiryDate = eDate.format("YYYY-MM-DD");
        }
      }

      form.setFieldsValue(formData);
    }
  }, [editData, form]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = (values) => {
    setLoading(true); // Start loading
    let finalData = {
      ...values,
      expiryDate: values.expiryDate
        ? moment(values.expiryDate).format("lll")
        : null,
      manufacturingDate: values.manufacturingDate
        ? moment(values.manufacturingDate).format("lll")
        : null,
    };

    if (editData) {
      dispatch(updateProduction({ index: editData.index, data: finalData }));
    } else {
      dispatch(addProduction(finalData));
    }

    form.resetFields();

    setTimeout(() => {
      setLoading(false);
      router.push("/transaction/production");
    }, 1000);
  };

  return (
    <MainLayout>
      <Spin spinning={loading} tip="Saving production details...">
        <div className="page_title_container">
          <div className="component__name">Transaction</div>
          <div>
            <Breadcrumb
              items={[
                {
                  title: (
                    <div className="cursor_pointer" onClick={handleBackToList}>
                      Production/Add Production
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="qc_page_container">
          <div className="qc_page_filter">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
            >
              <Row gutter={[32]}>
                <Col span={12}>
                  <h1 className="qc_mb_3">Product Details</h1>
                </Col>
              </Row>
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Product Name:"
                    name="productName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Product Name!",
                      },
                      {
                        pattern: /^[a-zA-Z]+$/,
                        message: "Only alphabets are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Material Code:"
                    name="materialCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Material Code!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Batch Code:"
                    name="batchCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Batch Code!",
                      },
                      {
                        pattern: /^[a-zA-Z0-9]+$/,
                        message: "Only alphanumeric values are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Batch Size:"
                    name="batchSize"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Batch Size!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Line No:"
                    name="lineNo"
                    rules={[
                      { required: true, message: "Please enter the Line No!" },
                      {
                        pattern: /^[a-zA-Z0-9]+$/,
                        message: "Only alphanumeric values are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Product Code:"
                    name="productCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Product Code!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Manufacturing Date:"
                    name="manufacturingDate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Manufacturing Date!",
                      },
                    ]}
                  >
                    <Input
                      type="date"
                      style={{ width: "60%" }}
                      onChange={(e) =>
                        form.setFieldsValue({
                          manufacturingDate: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Expiry Date:"
                    name="expiryDate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Expiry Date!",
                      },
                    ]}
                  >
                    <Input
                      type="date"
                      style={{ width: "60%" }}
                      onChange={(e) =>
                        form.setFieldsValue({ expiryDate: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="M.R.P:"
                    name="mrp"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the M.R.P. of the product.",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="GTIN:"
                    name="gtin"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the GTIN of the product.",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed!",
                      },
                    ]}
                  >
                    <Input style={{ width: "60%" }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Attach File:" name="file">
                    <Upload
                      beforeUpload={() => false}
                      fileList={fileList}
                      onChange={handleFileChange}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              {/* Submit + Cancel */}
              <Row gutter={16}>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    SUBMIT
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    onClick={handleBackToList}
                    disabled={loading}
                  >
                    CANCEL
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Spin>
    </MainLayout>
  );
}
