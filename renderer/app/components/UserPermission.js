import { Col, Form, Row, Select, Space, Button, Table, Checkbox } from "antd";

export default function UserPermissions({ activeTab }) {
  const handleOnCancel = () => {
    setAllPages([]);
    setRightToUpdate([]);
  };

  const updateUserRight = async () => {};

  const columns = [
    {
      title: "S. No.",
      dataIndex: "SNo",
      key: "SNo",
      width: "100",
    },
    {
      title: "Menu Name",
      dataIndex: "MenuName",
      key: "MenuName",
    },
    {
      title: "View",
      dataIndex: "View",
      key: "View",
    },
    {
      title: "Add",
      dataIndex: "Add",
      key: "Add",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
    },
    {
      title: "Print",
      dataIndex: "Print",
      key: "Print",
    },
    {
      title: "Custom 1",
      dataIndex: "Custom1",
      key: "Custom1",
    },
    {
      title: "Custom 2",
      dataIndex: "Custom2",
      key: "Custom2",
    },
    {
      title: "Custom 3",
      dataIndex: "Custom3",
      key: "Custom3",
    },
    {
      title: "Custom 4",
      dataIndex: "Custom4",
      key: "Custom4",
    },
    {
      title: "Custom 5",
      dataIndex: "Custom5",
      key: "Custom5",
    },
    {
      title: "Custom 6",
      dataIndex: "Custom6",
      key: "Custom6",
    },
  ];

  const dataSource = [
    {
      key: "1",
      SNo: "#1",
      MenuName: "Production",
      View: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Add: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Edit: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Delete: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Print: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Custom1: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom2: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom3: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom4: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom5: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom6: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="qc_page_filter">
        <Row gutter={[10, 10]}>
          <Col>
            <div className="filter__item__search">
              <div>Company Code </div>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Please select Company Code"
                options={[
                  {
                    value: "Company Code 1",
                    label: "Company Code 1",
                  },
                  {
                    value: "Company Code 2",
                    label: "Company Code 2",
                  },
                  {
                    value: "Company Code 3",
                    label: "Company Code 3",
                  },
                ]}
              />
            </div>
          </Col>
          <Col>
            <div className="filter__item__search">
              <div>User </div>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Please select user"
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
        </Row>
      </div>
      <div>
        <Table
          className="qc_mt_2"
          dataSource={dataSource}
          columns={columns}
          size="small"
        />
        <Row gutter={[22, 0]} className="qc_mt_4">
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  onClick={updateUserRight}
                  type="primary"
                  htmlType="submit"
                  size="large">
                  Save
                </Button>
                <Button onClick={handleOnCancel} size="large">
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
