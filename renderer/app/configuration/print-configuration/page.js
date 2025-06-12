"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Select,
  Table,
  Checkbox,
  Button,
  Divider,
  Space,
  Breadcrumb,
  Form,
  Spin,
} from "antd";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { setProductConfigDetails } from "../../../redux/productConfigSlice";
const { Title } = Typography;

const DropdownTablePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const industry = searchParams.get("industry");

  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qrCodeOption, setQrCodeOption] = useState(null);
  const [tableData, setTableData] = useState({});
  const { Option } = Select;

  useEffect(() => {
    if (industry) {
      setSelectedIndustry(industry);
      setSelectedOption(industry);
    }
  }, [industry]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:3005/v1/dropdown/getDropdown",
          {
            flag: 3,
          }
        );
        setIndustryOptions(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchDropdownOptions();
  }, []);
  const handleIndustryChange = async (value) => {
    setSelectedIndustry(value);
    setSelectedOption(value);
    localStorage.setItem("selectedIndustry", value);

    await fetchTableData(value);
  };

  useEffect(() => {
    if (industry) {
      setSelectedIndustry(industry);
      setSelectedOption(industry);
      fetchTableData(industry);
    }
  }, [industry]);

  const handleAddMoreRows = () => {
    const currentData = tableData[selectedOption] || [];
    const newRow = {
      key: currentData.length + 1,
      fieldName: `New Field ${currentData.length + 1}`,
      type: "text/input",
      selected: false,
    };
    setTableData({
      ...tableData,
      [selectedOption]: [...tableData[selectedOption], newRow],
    });
  };

  const fetchTableData = async (industryName) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3005/v1/structure/getstructure",
        {
          industry: industryName,
        }
      );

      const rawData = res?.data?.data || [];

      const formattedData = rawData.flatMap((item, index) =>
        item.feilds.map((field) => ({
          key: `${index + 1}-${field.name}`,
          fieldName: field.name,
          type: field.type,
          selected: false,
        }))
      );

      setTableData((prev) => ({
        ...prev,
        [industryName]: formattedData,
      }));
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    }
  };

  const handleQrCodeCheckboxChange = (e) => {
    setQrCodeOption(e.target.value);
  };

  const handleOnCancel = async () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/configuration/hardware-configuration");
    }, 1000);
  };

  const handleopenpage = async () => {
    setLoading(true);

    try {
      const selectedFields =
        tableData?.[selectedOption]?.filter((item) => item.selected) || [];

      if (!selectedFields.length) {
        setLoading(false);
        alert("Please select at least one field before saving.");
        return;
      }

      localStorage.setItem("selectedIndustry", selectedOption);
      localStorage.setItem(
        `fields_${selectedOption}`,
        JSON.stringify(selectedFields)
      );

      const query = new URLSearchParams({
        industry: selectedOption,
        data: encodeURIComponent(JSON.stringify(selectedFields)),
      });

      router.push(
        `/transaction/production-add/${selectedOption}?${query.toString()}`
      );
    } catch (error) {
      console.error("Error while opening page:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Field Name",
      dataIndex: "fieldName",
      key: "fieldName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Select
          value={record.type}
          style={{ width: 120 }}
          onChange={(newValue) => {
            const updatedData = tableData[selectedIndustry].map((item) =>
              item.key === record.key ? { ...item, type: newValue } : item
            );
            setTableData({ ...tableData, [selectedIndustry]: updatedData });
          }}
        >
          <Option value="alphanumeric">Alphanumeric</Option>
          <Option value="numeric">Numeric</Option>
          <Option value="text/input">Text/Input</Option>
          <Option value="date">Date</Option>
          <Option value="url">URL</Option>
        </Select>
      ),
    },
    {
      title: "Select",
      dataIndex: "selected",
      key: "selected",
      render: (text, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => {
            const newData = tableData[selectedIndustry]?.map((item) =>
              item.key === record.key
                ? { ...item, selected: e.target.checked }
                : item
            );
            setTableData({ ...tableData, [selectedIndustry]: newData });
          }}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <Spin spinning={loading} tip="Processing...">
        <div className="page_title_container">
          <div className="component__name">Configuration</div>
          <div>
            <Breadcrumb items={[{ title: "Print" }]} />
          </div>
        </div>

        <div className="qc_page_container">
          <div className="qc_page_filter">
            <h3>Print Configuration</h3>
            <br />
            <Form layout="horizontal" autoComplete="off">
              <Form.Item label="Select Industries:">
                <Select
                  style={{ width: 200, marginBottom: 20 }}
                  placeholder="Select Industry"
                  value={selectedIndustry || undefined}
                  onChange={handleIndustryChange}
                  options={industryOptions.map((item) => ({
                    value: item.value,
                    label: item.name,
                  }))}
                />
              </Form.Item>
            </Form>

            {selectedOption && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 2 }}>
                  <Table
                    columns={columns}
                    dataSource={tableData[selectedIndustry]}
                    pagination={false}
                    rowKey="key"
                    size="small"
                  />
                  <Button
                    type="primary"
                    onClick={handleAddMoreRows}
                    style={{ marginTop: 10 }}
                  >
                    + Add More Rows
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedIndustry && (
          <div style={{ marginTop: "2rem" }}>
            <Title level={4}>You selected: {selectedIndustry}</Title>
          </div>
        )}
        <Divider style={{ margin: "20px 0" }} />

        <div>
          <span style={{ marginRight: 10 }}>Variable QR Codes:</span>
          <Checkbox
            value="yes"
            checked={qrCodeOption === "yes"}
            onChange={handleQrCodeCheckboxChange}
          >
            Yes
          </Checkbox>
          <Checkbox
            value="no"
            checked={qrCodeOption === "no"}
            onChange={handleQrCodeCheckboxChange}
            style={{ marginLeft: 10 }}
          >
            No
          </Checkbox>
        </div>

        <br />
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={handleopenpage}
          >
            Save
          </Button>
          <Button size="large" onClick={handleOnCancel}>
            Cancel
          </Button>
        </Space>
      </Spin>
    </MainLayout>
  );
};

export default DropdownTablePage;
