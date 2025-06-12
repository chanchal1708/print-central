"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Pagination,
  Row,
  Select,
  Space,
  Tag,
  message,
} from "antd";
import { useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setselectedProduct } from "../../../redux/productSlice";

import { useRouter } from "next/navigation";

export default function Production() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [productData, setProductData] = useState([]);

  const [productionData, setProductionData] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3005/v1/productdetails/getproductdetails"
      );
      const result = await response.json();

      if (result.status === 1) {
        // Only show products where status === 1
        const activeProducts = result.data.filter((item) => item.status === 1);
        const processed = activeProducts.map((item) => {
          const fieldMap = {};
          item.feilds?.forEach((f) => {
            fieldMap[f.name] = f.value;
          });

          return {
            ...fieldMap,
            _id: item._id,
            status: item.status,
          };
        });

        setProductData(processed);

        // setProductData(activeProducts);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  console.log(productData, "productData");
  const tableData = {
    plywood: [
      {
        key: 1,
        fieldName: "Material Product",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 2,
        fieldName: "Material Category",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 3,
        fieldName: "Material Thickness",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 4,
        fieldName: "Material Group",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 5,
        fieldName: "Material Grade",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 6,
        fieldName: "Material DesignCode",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 7,
        fieldName: "Material Finish Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 8,
        fieldName: "Material Panel Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 9,
        fieldName: "Lipping Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 10,
        fieldName: "Material Code",
        type: "alphanumeric",
        selected: false,
      },
      {
        key: 14,
        fieldName: "Product Name",
        type: "alphanumeric",
        selected: false,
      },
      { key: 15, fieldName: "Mfg", type: "Date", selected: false },
      { key: 16, fieldName: "Expiry Date", type: "Date", selected: false },
      { key: 11, fieldName: "UOM", type: "alphanumeric", selected: false },
      { key: 12, fieldName: "Batch No.", type: "date", selected: false },
      { key: 13, fieldName: "MRP", type: "numeric", selected: false },
    ],
    cement: [
      {
        key: 1,
        fieldName: "Packer Details",
        type: "text/input",
        selected: false,
      },
      { key: 2, fieldName: "Grade", type: "alphanumeric", selected: false },
      { key: 3, fieldName: "DI No", type: "numeric", selected: false },
      { key: 4, fieldName: "State", type: "text/input", selected: false },
      { key: 5, fieldName: "Fly ash(%)", type: "numeric", selected: false },
      { key: 6, fieldName: "MRP", type: "text/input", selected: false },
      { key: 7, fieldName: "Message", type: "numeric", selected: false },
    ],
    fertilizer: [],
    pipes: [
      { key: 1, fieldName: "Website Address", type: "url", selected: false },
      {
        key: 2,
        fieldName: "Production Batch Number",
        type: "text/input",
        selected: false,
      },
      {
        key: 3,
        fieldName: "Batch Number",
        type: "text/input",
        selected: false,
      },
      { key: 4, fieldName: "Date", type: "text/input", selected: false },
      { key: 5, fieldName: "Time", type: "text/input", selected: false },
      {
        key: 6,
        fieldName: "Automatic Counter",
        type: "text/input",
        selected: false,
      },
      { key: 7, fieldName: "Thickness", type: "text/input", selected: false },
      { key: 8, fieldName: "MRP", type: "text/input", selected: false },
    ],
    wiresCables: [],
    petroleum: [],
  };

  const handleOpenPage = async () => {
    console.log(selectedOption, "--selectedOption");
    if (!selectedOption) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const selectedData = (tableData[selectedOption] || []).filter(
        (item) => item.selected
      );

      const query = new URLSearchParams({
        industry: selectedOption,
        data: encodeURIComponent(JSON.stringify(selectedData)),
      });

      router.push(`/transaction/production-add/${selectedOption}?${query}`);
    }, 1000);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3005/v1/productdetails/deleteproductdetails?id=${id}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      if (result.status === 1) {
        console.log("Product soft-deleted:", result.data);
        fetchProductDetails(); // Refresh the list
      } else {
        console.error("Failed to delete:", result.data);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handleEdit = (index) => {
    dispatch(setEditProduction({ index, data: productionData[index] }));
    router.push("/transaction/add-production");
  };

  const handleStartProduction = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/v1/productdetails/getproductdetailsbyID/${productId}`
      );
      const result = await response.json();

      if (result.status === 1 && result.data) {
        dispatch(setselectedProduct(result.data));
        message.success("Product loaded successfully. Redirecting...");
        router.push("/transaction/LineManager");
      } else {
        message.error("Product not found or inactive.");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      message.error("Error fetching product details.");
    }
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Transaction</div>
        <Breadcrumb items={[{ title: "Production List" }]} />
      </div>

      <div className="qc_page_container">
        <div className="qc_page_filter">
          <Row justify="space-between">
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: 180 }}
                      size="large"
                      placeholder="Select Industry"
                      onChange={(value) => setSelectedOption(value)}
                      options={Object.keys(tableData).map((key) => ({
                        value: key,
                        label: key.charAt(0).toUpperCase() + key.slice(1),
                      }))}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: 180 }}
                      size="large"
                      placeholder="Select Batch Code"
                      options={[
                        { value: "Batch Code 1", label: "Batch Code 1" },
                        { value: "Batch Code 2", label: "Batch Code 2" },
                        { value: "Batch Code 3", label: "Batch Code 3" },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: 180 }}
                      size="large"
                      placeholder="Select Product"
                      options={[
                        { value: "Product 1", label: "Product 1" },
                        { value: "Product 2", label: "Product 2" },
                        { value: "Product 3", label: "Product 3" },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      allowClear
                      size="large"
                      placeholder="Status"
                      style={{ width: 180 }}
                      options={[
                        { value: "all", label: "All" },
                        { value: 0, label: "Not Started" },
                        { value: 1, label: "Running" },
                        { value: 10, label: "Completed" },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={handleOpenPage}>
                Add Production
              </Button>
            </Col>
          </Row>
        </div>

        <br />

        <div className="production_container">
          <div className="production_container">
            {productData?.map((val, index) => (
              <div key={val?._id} className="production_item">
                <div className="color_grid">
                  <Row gutter={[10, 20]}>
                    <Col span={5}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">{val?.["Material Code"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Material Grade</div>
                      <div className="qc_key">{val?.["Material Grade"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Batch Number</div>
                      <div className="qc_key">{val?.["Batch Number"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">{val?.["Batch Size"]}</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Category</div>
                      <div className="qc_key">{val?.["materialCategory"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">
                        {val?.["Manufacturing Date"]}
                      </div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">{val?.["Expiry Date"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">M.R.P</div>
                      <div className="qc_key">{val?.["M.R.P"]}</div>
                    </Col>
                    <Col span={5}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">{val?.["Product Name"]}</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Remark</div>
                      <div className="qc_key">Product details are correct</div>
                    </Col>
                  </Row>
                </div>

                <div className="qc_mt_5">
                  <h3 className="qc_mb_3">QR Details</h3>
                  <Row gutter={[10, 20]} justify="space-between">
                    <Col span={12}>
                      <Row gutter={[10, 20]}>
                        <Col span={8}>
                          <div className="qc_value">Primary QR</div>
                          <div className="qc_key">100</div>
                        </Col>
                        <Col span={8}>
                          <div className="qc_value">Secondary QR</div>
                          <div className="qc_key">100</div>
                        </Col>
                        <Col span={8}>
                          <div className="qc_value">Tertiary QR</div>
                          <div className="qc_key">5</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row gutter={[20, 20]} align="middle">
                        <Col>
                          <Space>
                            <Tag icon={<CheckCircleOutlined />} color="blue">
                              Reviewed
                            </Tag>
                            <Tag icon={<CheckCircleOutlined />} color="blue">
                              Approved
                            </Tag>
                          </Space>
                        </Col>
                        <Col>
                          <Button color="primary" variant="outlined">
                            Line Allocation
                          </Button>
                        </Col>
                        <Col>
                          <Space>
                            <Button
                              icon={<EditOutlined />}
                              onClick={() => handleEdit(index)}
                              size="small"
                            />
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => handleDelete(val._id)}
                              size="small"
                            />
                            <Button
                              type="primary"
                              size="large"
                              onClick={() => handleStartProduction(val._id)}
                            >
                              Start Production
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination defaultCurrent={1} total={productionData?.length || 0} />
      </div>
    </MainLayout>
  );
}
