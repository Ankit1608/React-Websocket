import React, { useEffect, useState, useRef } from "react";

import TableReusable from "../components/Tablereusable";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

function View({ history }) {
  const socket = useRef(null);
  const [rrbf, setRrbf] = useState(null);
  const [callput, setCallput] = useState(null);
  const [rrbfhead, setRrbfhead] = useState(true);
  const [callputhead, setCallputhead] = useState(false);
  const tablelabels = [
    "Time",
    "Expdate",
    "Atm",
    "25d R/R",
    "10d R/R",
    "25d B/F",
    "10d B/F",
  ];

  useEffect(() => {
    async function checker() {
      try {
        console.log("in");
        const data = await fetch("http://localhost:1337/", {
          method: "GET",
        }).then((t) => t.json());
        setRrbf(data.rrbfdata);
        setCallput(data.callputdata);
        console.log(callput);
      } catch (e) {
        console.log(e);
      }
    }
    checker();
  }, []);
  useEffect(() => {
    connect();

    socket.current.onopen = onOpen;
    socket.current.onclose = onClose;
    socket.current.onmessage = onMessage;

    return () => {
      socket.current.close();
    };
  }, []);
  function connect() {
    socket.current = new WebSocket("ws://127.0.0.1:3002");
  }

  function onOpen(e) {
    console.log("socket ready state", socket.current.readyState);
    socket.current.send(
      JSON.stringify({
        type: "connect",
      })
    );
  }

  function onClose(e) {}

  function onMessage(e) {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "rrbf":
        setRrbf((prev) => [...prev, data]);
        break;
      case "callput":
        setCallput((prev) => [...prev, data]);
        break;
      default:
        break;
    }
  }

  return (
    <>
      {callput && (
        <div style={{ display: "flex", backgroundColor: "#0A1640" }}>
          <div style={{ width: "100%" }}>
            <Header />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "98%",
                marginLeft: "1%",
              }}
            >
              <div
                onClick={() => {
                  setRrbfhead(true);
                  setCallputhead(false);
                }}
                style={{
                  backgroundColor: rrbfhead ? "#ABA8FE" : "",
                  color: rrbfhead ? "#000" : "#fff",
                  border: rrbfhead ? "1px solid #ABA8FE" : "0.5px solid #ddd",
                  borderRadius: "3px 0px 0px 3px",
                }}
                className="view-header-container"
              >
                <p>RR/BF Table</p>
              </div>
              <div
                onClick={() => {
                  setRrbfhead(false);
                  setCallputhead(true);
                }}
                style={{
                  backgroundColor: callputhead ? "#ABA8FE" : "",
                  color: callputhead ? "#000" : "#fff",
                  border: callputhead
                    ? "1px solid #ABA8FE"
                    : "0.5px solid #ddd",
                }}
                className="view-header-container"
              >
                <p>Call/Put Table</p>
              </div>
              <div className="view-header-container">
                <p>Vol Curve</p>
              </div>
              <div className="view-header-container">
                <p>Vol Smile</p>
              </div>
              <div
                className="view-header-container"
                style={{ borderRadius: "0px 3px 3px 0px" }}
              >
                <p>Heatmaps</p>
              </div>
            </div>
            <div style={{ minHeight: "100vh", backgroundColor: "#0A1640" }}>
              {rrbfhead && rrbf && (
                <TableReusable
                  tablelabels={tablelabels}
                  flag="allcontacts"
                  tablelist={rrbf}
                />
              )}
              {callputhead && callput && (
                <TableReusable
                  tablelabels={tablelabels}
                  flag="allcontacts"
                  tablelist={callput}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
