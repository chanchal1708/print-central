"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Space, Button, Divider, Tag, Spin } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { useRouter } from "next/navigation";
import { CheckCircleFilled } from "@ant-design/icons";
import { useParams } from "next/navigation";
import Plywood from "@/app/components/production/plywood";
import Cement from "@/app/components/production/cement";
import Pipes from "@/app/components/production/pipes";

const { TextArea } = Input;

export default function ProductionAdd() {
  const router = useRouter();
  const params = useParams();
  const [pageType, setPageType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.type) {
      setPageType(params.type);
      setLoading(false);
    }
  }, [params]);

  const handleBackToList = () => {
    router.push("/configuration/print-configuration");
  };

  return (
    <MainLayout>
      <Spin spinning={loading} tip="Loading production form...">
        <div className="page_title_container">
          <div className="component__name">Transaction</div>
          <div>
            <Breadcrumb
              items={[
                {
                  title: (
                    <div className="cursor_pointer" onClick={handleBackToList}>
                      Production List
                    </div>
                  ),
                },
                {
                  title: "Add Production",
                },
              ]}
            />
          </div>
        </div>
        <div className="qc_page_container">
          <h2>
            <Tag icon={<CheckCircleFilled />} color="GREEN"></Tag>
            Variable QR Codes - Yes
          </h2>
          <hr />
          <br />
          <br />
          {pageType === "plywood" ? (
            <Plywood industry={pageType} />
          ) : pageType === "cement" ? (
            <Cement industry={pageType} />
          ) : pageType === "pipes" ? (
            <Pipes industry={pageType} />
          ) : (
            "Form type not recognized"
          )}
        </div>
      </Spin>
    </MainLayout>
  );
}
