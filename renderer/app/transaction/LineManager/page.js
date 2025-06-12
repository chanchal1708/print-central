"use client";
import {
  DownOutlined,
  LogoutOutlined,
  SyncOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Spin,
  Card,
  Breadcrumb,
  Table,
  Tag,
  Progress,
  Popconfirm,
} from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { setselectedProduct } from "../../../redux/productSlice";
import { displayMessage, getConfigJSON } from "utils/common";
import qrJsonData from "@/app/components/json/qrcode";
const Net = require("net");
let printerClient1 = new Net.Socket();
let scannerClient = new Net.Socket();
import ping from "ping";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/app/constants/hardData";
import {
  createCommandToWriteOnPrinter,
  registerFirstHeadResponse,
} from "utils/printer/printerFunction";
import { app } from "electron";
const ProductionDetailsCard = ({ product }) => {
  console.log("Selected Product from Redux:", product);

  if (!product) {
    return (
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
        No product selected
      </p>
    );
  }

  return (
    <Card
      style={{
        marginTop: "10px",
        width: "400px",
        boxShadow: "0px 4px 12px rgba(128, 128, 128, 0.3)",
        borderRadius: "12px",
        height: "650px",
        padding: "15px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Button
          type="primary"
          shape="round"
          style={{
            padding: "10px 30px",
            fontSize: "16px",
            fontColor: "white",
            background: "black",
            fontWeight: "bold",
          }}
        >
          Production Details
        </Button>
      </div>

      <div
        style={{
          fontSize: "15px",
          fontWeight: "500",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {(product.feilds || []).map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "8px",
              paddingTop: "8px",
              gap: "50px",
            }}
          >
            <span style={{ fontWeight: "bold", textAlign: "left", flex: "1" }}>
              {item.name}:
            </span>
            <span style={{ textAlign: "right", flex: "1", color: "#333" }}>
              {item.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default function Header({ user }) {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const dispatch = useDispatch();
  let configJson = getConfigJSON();
  const [isCalibration, setIsCalibration] = useState(0);
  const [loadingStartPrint, setLoadingStartPrint] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [hostPort1, setHostPort1] = useState(configJson["PRINTER_ADDRESS"]);
  const [isPrinterLoading, setIsPrinterLoading] = useState(false);
  const [isScannerLoading, setIsScannerLoading] = useState(false);
  const [scannerAddress, setScannerAddress] = useState(
    configJson["SCANNER_ADDRESS"]
  );
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();
  const [inkFirstHead, setInkFirstHead] = useState({});

  const logoutFunction = async () => {
    router.push("/login");
  };
  const handleBackToList = () => {
    router.push("/transaction/production");
  };
  const [isRunning, setIsRunning] = useState(false);
  const [ip, setip] = useState("192.168.1.1");
  const [port, setport] = useState("8000");
  const [Status, setStatus] = useState("Active");
  const [rejected, setRejected] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [samples, setSamples] = useState(0);
  const [printMessage, setPrintMessage] = useState("");

  const [headValue, setHeadValue] = useState(
    configJson["TIJ"]["NUMBER_OF_TRACK"]
  );
  const toggleStatus = () => {
    setIsRunning(!isRunning);
    handlePrintStart();
  };
  const printerData = [
    {
      key: 1,
      head: "Head 1",
      status: <>{!isPrinterLoading ? "Connected" : "Disconnected"}</>,
      ink: <> {inkFirstHead?.InkRemainingCapacity}</>,
    },
  ];

  const printerColumns = [
    {
      title: "Head",
      dataIndex: "head",
      key: "head",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Connected" ? "red" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Ink Level",
      dataIndex: "ink",
      key: "ink",
      render: (ink) => {
        let color;
        if (ink === 0) color = "#D3D3D3";
        else if (ink <= 10) color = "red";
        else if (ink <= 25) color = "orange";
        else if (ink <= 35) color = "yellow";
        else if (ink <= 50) color = "lightgreen";
        else if (ink <= 75) color = "green";
        else if (ink === 100)
          color =
            "linear-gradient(to right, red, orange, yellow, lightgreen, green)";
        return (
          <Progress
            percent={ink}
            status={ink > 0 ? "active" : "exception"}
            strokeColor={
              ink === 100
                ? {
                    "0%": "red",
                    "25%": "orange",
                    "50%": "yellow",
                    "75%": "lightgreen",
                    "100%": "green",
                  }
                : color
            }
          />
        );
      },
    },
  ];
  const items = [
    {
      label: <div>Welcome username!</div>,
      key: "0",
    },
    {
      label: (
        <div>
          <SyncOutlined /> Change Password
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Spin spinning={dataLoading}>
          <div onClick={logoutFunction}>
            <LogoutOutlined /> Logout
          </div>
        </Spin>
      ),
      key: "2",
    },
  ];
  const styles = {
    layout1: {
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "white",
      color: "black",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    main: {
      display: "flex",
      flex: 1,
    },

    content: {
      flex: 1,
      padding: "20px",
    },
    logoSection: {
      alignItems: "left",
    },
    logo: {
      height: "50px",
      marginBottom: "5px",
      alignItems: "left",
    },
    breadcrumbs: {
      fontSize: "14px",
      color: "black",
      marginTop: "10px",
    },
    brandName: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    userManual: {
      fontSize: "16px",
      display: "flex",
      justifyContent: "center",
    },
    dropdownButton: {
      borderRadius: "8px",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ccc",
      paddingBottom: "20px,18px",
      paddingTop: "22px,18px",
    },
    userTitle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingBottom: "2px,8px",
      gap: "4px",
    },
    role: {
      fontSize: "14px",
      color: "#333",
    },
    userName: {
      fontSize: "12px",
      color: "#666",
      paddingBottom: "22px,8px",
      paddingTop: "2px,4px",
    },
  };
  const disconnectPrinter = () => {
    printerClient1?.destroy();
    printerClient1 = new Net.Socket();
  };
  const extractJSON = (data) => {
    const jsonMatches = [];
    const regex = /{(?:[^{}]|(?<rec>{(?:[^{}]|(\k<rec>))*}))*}/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      jsonMatches.push(match[0]);
    }
    return jsonMatches;
  };

  const connectPrinter1 = () => {
    try {
      setIsPrinterLoading(true);

      printerClient1 = new Net.Socket();
      printerClient1
        .connect({ port: hostPort1?.port, host: hostPort1?.host }, async () => {
          console.log("Printer connection established.");
          setIsPrinterLoading(false);
          if (headValue == 1) {
            setInkFirstHead({});
            registerFirstHeadResponse(printerClient1);
            await delay(configJson["COMMAND_DELAY_TIME"]);
          }
          displayMessage(SUCCESS_MSG_TYPE, "Printer Connected.");
        })
        .on("data", async function (data) {
          console.log(data);
          try {
            let rep = Buffer.from(data).toString("utf8");
            let repHex = Buffer.from(data).toString("hex");
            fileLogger.info("Reply from printer: " + repHex + " | " + rep);
            const potentialJSONs = extractJSON(rep);
            if (configJson["DEBUG_MODE"]) {
              console.log("rep", rep);
            }

            potentialJSONs.forEach(async (jsonStr) => {
              try {
                const parsedData = JSON.parse(jsonStr);
                if (
                  parsedData?.RegisterStatusCallback === true &&
                  parsedData?.MessageDigest &&
                  parsedData?.MessageDigest?.length
                ) {
                  const qrContent = parsedData?.MessageDigest?.find(
                    (msg) => msg.PreviewContent === "qrcode"
                  )?.PrintContent;
                  if (configJson["DEBUG_MODE"]) {
                    console.log("qrContent", qrContent);
                  }

                  console.log(
                    "qrContent",
                    parsedData?.PrintHeadIndex,
                    qrContent
                  );

                  let settingData = parsedData?.Setting;
                  if (settingData) {
                    let inkstatus = {
                      InkRemainingCapacity: settingData?.InkRemainingCapacity,
                      InkTotalCapacity: settingData?.InkTotalCapacity,
                      headVersion: settingData?.PrintHeadFirmWareVersion,
                    };

                    if (parsedData?.PrintHeadIndex == 0) {
                      setInkFirstHead(inkstatus);
                    }
                  }
                }
              } catch (error) {
                console.log("Error parsing extracted JSON segment:", error);
              }
            });

            if (!isFirstReplyReceived) {
              isFirstReplyReceived = true;
              console.log("First reply from printer received. Starting loop.");
            }
          } catch (error) {
            console.log("on(data) error", error);
          }
        })
        .on("error", function (e) {
          disconnectPrinter();
          checkPingAndConnect1(hostPort1?.host, 1);
          setIsPrinterLoading(false);
        })
        .on("timeout", function (e) {
          disconnectPrinter();
          checkPingAndConnect1(hostPort1?.host, 1);
          setIsPrinterLoading(false);
        })
        .on("end", function (e) {
          disconnectPrinter();
          checkPingAndConnect1(hostPort1?.host, 1);
          setIsPrinterLoading(false);
          // let isRunning = JSON.parse(localStorage.getItem("isRunning"));
          // localStorage.setItem("isRunning", isRunning);
          // dispatch(setIsPrintingStart(isPrintingStart));
        });
    } catch (error) {
      setIsPrinterLoading(false);
    }
  };

  const checkPingAndConnect1 = async (host, type) => {
    setIsPrinterLoading(true);
    let res = await ping.promise.probe(host);
    // setIsPrinterLoading(false);
    if (res?.alive) {
      connectPrinter1();
    } else {
    }
    return res?.alive;
  };

  useEffect(() => {
    if (!isPrinterLoading) {
      checkPingAndConnect1(hostPort1?.host, 1);
    }
  }, [hostPort1?.host]);

  function scannerNotConn() {
    scannerClient?.destroy();
    scannerClient = new Net.Socket();
  }

  const connectScanner = () => {
    try {
      setIsScannerLoading(true);

      scannerClient = new Net.Socket();
      scannerClient
        .connect(
          { port: scannerAddress?.port, host: scannerAddress?.host },
          async () => {
            console.log("Scanner connection established.");
            setIsScannerLoading(false);

            displayMessage(SUCCESS_MSG_TYPE, "Scanner Connected.");
          }
        )
        .on("data", async function (data) {
          try {
            let isRunning = localStorage.getItem("isRunning")
              ? JSON.parse(localStorage.getItem("isRunning"))
              : false;

            if (isRunning) {
              let item1 = Buffer.from(data).toString();
              console.log("Scanner Reply", item1);

              localStorage.setItem("LastScannedTime", moment().format());

              item1 = String(item1).trim();
              console.log(item1, "==item1");
            }
          } catch (error) {
            console.log("on(data) error", error);
          }
        })
        .on("error", function (e) {
          scannerNotConn();
          checkPingAndConnectScanner(scannerAddress?.host, 1);
          setIsScannerLoading(false);
        })
        .on("timeout", function (e) {
          scannerNotConn();
          checkPingAndConnectScanner(scannerAddress?.host, 1);
          setIsScannerLoading(false);
        })
        .on("end", function (e) {
          scannerNotConn();
          checkPingAndConnectScanner(scannerAddress?.host, 1);
          setIsScannerLoading(false);
        });
    } catch (error) {
      setIsScannerLoading(false);
    }
  };

  const checkPingAndConnectScanner = async (host, type) => {
    setIsScannerLoading(true);
    let res = await ping.promise.probe(host);
    // setIsScannerLoading(false);
    if (res?.alive) {
      connectScanner();
    } else {
    }
    return res?.alive;
  };

  useEffect(() => {
    if (!isScannerLoading) {
      checkPingAndConnectScanner(scannerAddress?.host, 1);
    }
  }, [scannerAddress?.host]);

  const StopFirstHead = async (_client) => {
    let packetHeader = "A55A";
    let GroupPrintControl = "0205";
    let senderrecevier = "0100";
    let headCmd = [
      { ...configJson["TIJ"]["FIRST_HEAD_CONFIG"], Action: "Stop" },
    ];

    console.log("stop head 1");
    let command = createCommandToWriteOnPrinter(
      packetHeader,
      GroupPrintControl,
      senderrecevier,
      headCmd
    );
    const rawHex1 = Buffer.from(command, "hex");
    _client.write(rawHex1);
  };

  const StartFirstHead = async (_client) => {
    let packetHeader = "A55A";
    let GroupPrintControl = "0205";
    let senderrecevier = "0100";
    let startHeadCmd = [
      { ...configJson["TIJ"]["FIRST_HEAD_CONFIG"], Action: "Start" },
    ];

    if (configJson["DEBUG_MODE"]) {
      console.log("startHeadCmd", startHeadCmd);
    }

    let command = createCommandToWriteOnPrinter(
      packetHeader,
      GroupPrintControl,
      senderrecevier,
      startHeadCmd
    );
    const rawHex1 = Buffer.from(command, "hex");
    _client.write(rawHex1);
  };
  const getChunkdata = async (size) => {
    try {
      setTimeout(() => {
        localStorage.setItem("isFetching", false);
      }, 5000);

      if (isCalibration == 1) {
        let _urlItem = localStorage.getItem("allUrlItem");
        _urlItem = JSON.parse(_urlItem);

        if (
          _urlItem?.length <=
          Number(configJson["PRINTER_QUEUE_SIZE"]) *
            Number(headValue) *
            configJson["SIZE_VARIANCE_PER"]
        ) {
          let allUrlItem =
            localStorage.getItem("allUrlItem") &&
            localStorage.getItem("allUrlItem") != "undefined"
              ? JSON.parse(localStorage.getItem("allUrlItem"))
              : [];

          let qrArr = Array.from({ length: size });
          if (allUrlItem && allUrlItem?.length) {
            let data1 = [...allUrlItem, ...qrArr];
            localStorage.setItem("allUrlItem", JSON.stringify(data1));
          } else {
            localStorage.setItem("allUrlItem", JSON.stringify(qrArr));
          }
        }
      } else {
        await delay(1000);
        setTimeout(() => {
          localStorage.setItem("isFetching", false);
        }, 4000);
        return qrJsonData?.slice(0, size);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const createFixedData = () => {
    let fixedPrintData = {};
    for (const key in configJson["TIJ"]["PRINTING_DATA"]) {
      if (key != "qrcode") {
        if (["exp", "mfg"]?.includes(key)) {
          fixedPrintData[key] =
            configJson["TIJ"]["PRINTING_TEXT"][key] +
            "" +
            moment(
              productionData[configJson["TIJ"]["PRINTING_DATA"][key]],
              "DD-MM-YYYY"
            ).format(generalSetting?.DateFormat);
        } else {
          if (key == "batch") {
            fixedPrintData[key] =
              configJson["TIJ"]["PRINTING_TEXT"][key] +
              "" +
              productionData[configJson["TIJ"]["PRINTING_DATA"][key]];
          } else if (key == "price") {
            fixedPrintData[key] =
              configJson["TIJ"]["PRINTING_TEXT"][key] +
              "" +
              productionData[configJson["TIJ"]["PRINTING_DATA"][key]];
          } else {
            fixedPrintData[key] =
              productionData[configJson["TIJ"]["PRINTING_DATA"][key]];
          }
        }
      }
    }

    return fixedPrintData;
  };
  const createDataForFirstHead = async (urlItem) => {
    let packetHeader = "A55A";
    let GroupPrintControl = "0110";
    let senderrecevier = "0100";

    let fixedPrintData = createFixedData();
    let finalData = urlItem?.map((item) => ({
      ...fixedPrintData,
      qrcode: item,
    }));

    let finalHeadData = {
      MessageName: configJson["TIJ"]["FIRST_HEAD_CONFIG"]["SelectMessage"],
      KeyValue: finalData,
    };

    if (configJson["DEBUG_MODE"]) {
      console.log("finalHeadData", finalHeadData);
    }

    let command = createCommandToWriteOnPrinter(
      packetHeader,
      GroupPrintControl,
      senderrecevier,
      finalHeadData
    );
    return command;
  };
  const getChunkdataFromState = async (size) => {
    let num = localStorage.getItem("calibrationnum");
    await delay(1000);
    localStorage.setItem("calibrationnum", Number(num) + Number(size));
    console.log("num", num);
    console.log(Number(num), Number(num) + Number(size));
    return qrJsonData?.slice(Number(num), Number(num) + Number(size));
  };

  const sendDataToPrinterQueue = async (urlItems, _client, _type) => {
    try {
      // if (_type == "start") {
      //   let isSend = JSON.parse(localStorage.getItem("isSending"));
      //   if (isSend) {
      //     return;
      //   }

      //   localStorage.setItem("isSending", true);
      // }

      if (_type == "start") {
        setPrintMessage("Printer is Starting.");
      }

      if (headValue == 1) {
        const urlItem1 = urlItems;

        let firstHeadCmd = await createDataForFirstHead(urlItem1);
        console.log(firstHeadCmd);
        let firstHeadRawHex = Buffer.from(firstHeadCmd, "hex");
        await delay(configJson["DATA_WRITE_DELAY_TIME"]);
        _client.write(firstHeadRawHex);
      }

      await delay(configJson["DATA_WRITE_DELAY_TIME"]);
      localStorage.setItem("isSending", false);

      if (_type == "start") {
        setPrintMessage("Printer is Running.");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handlePrintStart = async () => {
    setLoadingStartPrint(true);
    if (!printerClient1?.remoteAddress) {
      let conn = await checkPingAndConnect1(hostPort1?.host, 2);
      setLoadingStartPrint(false);
      if (!conn) {
        setLoadingStartPrint(false);
        return conn;
      }
    }

    if (headValue == 1) {
      StopFirstHead(printerClient1);
    }

    await delay(configJson["COMMAND_DELAY_TIME"]);
    localStorage.setItem("isRunning", true);
    localStorage.setItem("printCount", 0);

    await getChunkdata(
      Number(headValue) *
        configJson["PRINTER_QUEUE_SIZE"] *
        configJson["SIZE_VARIANCE_PER"]
    );

    let urlItems = await getChunkdataFromState(
      Number(headValue) * configJson["PRINTER_QUEUE_SIZE"]
    );

    if (urlItems?.length < 2) {
      displayMessage(ERROR_MSG_TYPE, "Data not found");
      return;
    }

    localStorage.setItem("isSending", true);
    if (headValue == 1) {
      await delay(configJson["COMMAND_DELAY_TIME"]);
      StartFirstHead(printerClient1);
      await delay(configJson["COMMAND_DELAY_TIME"]);

      sendDataToPrinterQueue(urlItems, printerClient1, "start");
    }
  };

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <img
            src="/images/qriouscodes-logo.png"
            alt="qrious codes"
            style={styles.logo}
          />
          <div style={styles.breadcrumbs}>
            <span>Transaction</span> / <span>LineManager</span>
          </div>
        </div>

        <div style={styles.brandName}>Print Central</div>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            style={styles.dropdownButton}
            onClick={(e) => e.preventDefault()}
          >
            <div style={styles.userTitle}>
              <div style={styles.role}>Admin</div>
              <div style={styles.userName}>User Name</div>
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
      </header>
      <div style={styles.main}>
        <div style={styles.leftSection}>
          <ProductionDetailsCard product={selectedProduct} />
        </div>
        <div
          style={{
            ...styles.centerSection,
            paddingTop: "5px",
            paddingLeft: "20px",
            width: "1300px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
            }}
          >
            <Breadcrumb
              style={{
                paddingLeft: "10PX",
                fontSize: "20px",
              }}
              items={[
                {
                  title: (
                    <div className="cursor_pointer" onClick={handleBackToList}>
                      <b> &larr; Back </b>
                    </div>
                  ),
                },
              ]}
            />

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                styles={{
                  borderRadius: "50px",
                  width: "290px",
                  height: "190px",
                }}
                type="primary"
                onClick={toggleStatus}
                icon={
                  isRunning ? (
                    <Tag icon={<PauseCircleOutlined />} color="red"></Tag>
                  ) : (
                    <PlayCircleOutlined style={{ backgroundColor: "green" }} />
                  )
                }
              >
                {isRunning ? "Stop" : "Start"}
              </Button>
            </div>
          </div>
          {/* Main Container Wrapped in Ant Design Card */}
          <Card
            className="shadow-lg rounded-lg"
            style={{
              background: "#fff",
              height: "600px",
              paddingTop: "0px",
              width: "1140px",
            }}
          >
            <h2 className="text-2xl font-bold mb-6">Line Name</h2>

            {/* QR Status Cards in Horizontal Layout */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <Card
                className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center"
                style={{
                  background: "#D7F2DA",
                  color: "green",
                  display: "flex",
                  flex: 1,
                  padding: "2px",
                  height: "190px",
                  width: "200px",
                }}
              >
                <section>
                  <h2 className="text-xl font-bold">Printed</h2>
                  <h1 className="text-3xl font-semibold">{accepted}</h1>

                  <img
                    src="/images/Printer (1).png"
                    className="h-16 w-auto"
                    style={{
                      height: "90px",
                      paddingLeft: "200px",
                    }}
                  ></img>
                </section>
              </Card>

              <Card
                className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-center"
                style={{
                  background: "#F8D7DA",
                  color: "#800000",
                  flex: 1,
                  padding: "2px",
                  height: "190px",
                  width: "200px",
                }}
              >
                <section>
                  <h2 className="text-xl font-bold">Accepted</h2>
                  <h1 className="text-3xl font-semibold">{rejected}</h1>

                  <img
                    src="/images/Printers.png"
                    style={{ height: "90px", paddingLeft: "200px" }}
                  ></img>
                </section>
              </Card>

              <Card
                className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg text-center"
                style={{
                  background: "#E4D7FA",
                  color: "purple",
                  flex: 1,
                  padding: "2px",
                  height: "190px",
                  width: "200px",
                }}
              >
                <section>
                  <h2 className="text-xl font-bold">Rejected</h2>
                  <h1 className="text-3xl font-semibold">{samples}</h1>

                  <img
                    src="/images/Printer.png"
                    style={{ height: "90px", paddingLeft: "200px" }}
                  ></img>
                </section>
              </Card>
            </div>
            <section
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h2>Printer</h2>
              <h2 style={{ fontWeight: "bold", marginLeft: "600px" }}>
                Scanner
              </h2>
            </section>

            {/* Printer and Scanner Sections */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <Card
                style={{
                  marginBottom: "20px",
                  width: "900px",
                  height: "300px",
                  display: "flex",
                  pagination: "false",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <table
                  style={{
                    width: "600px",
                    borderCollapse: "collapse",
                    marginBottom: "1rem",
                  }}
                >
                  <thead
                    style={{ backgroundColor: "white", textAlign: "center" }}
                  >
                    <tr>
                      <th
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        Printer
                      </th>
                      <th
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        Data in queue
                      </th>
                      <th
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        IP Address, Port
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Status
                      </th>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        Printer
                      </td>
                      <td
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {accepted + rejected + samples}
                      </td>
                      <td
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {hostPort1?.host}/{hostPort1?.port}
                      </td>

                      <td
                        colSpan="2"
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {!isPrinterLoading ? <>Active</> : <>DeActive</>}
                      </td>
                    </tr>
                  </thead>
                </table>

                {/* Actual Printer Table */}
                <style>
                  {`
    .ant-table-thead {
      display: none !important;
    }
  `}
                </style>

                <Table
                  columns={printerColumns}
                  dataSource={printerData}
                  pagination={false}
                  bordered
                />
              </Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "LEFT",
                  width: "100%",
                }}
              >
                {/* Actual scanner Table */}
                <Card
                  style={{
                    width: "430PX",
                    display: "flex",
                    borderRadius: "10px",
                    height: "100px",
                    flexDirection: "column",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    <span>IP Address & Port</span>
                    <span>Status</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>
                        {scannerAddress?.host}/{scannerAddress?.port}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: Status === "Active" ? "green" : "red",
                      }}
                    >
                      {Status}
                    </div>
                  </div>
                </Card>
                <Card
                  style={{
                    width: "430px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    height: "50px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <h2> Production Time: 02:50:32</h2>
                </Card>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={handleBackToList}
                  onCancel={() => console.log("Cancelled")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      width: "200px",
                    }}
                  >
                    Closed Batch
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
