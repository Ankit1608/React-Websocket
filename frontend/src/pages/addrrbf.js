import React, { useEffect, useState, useRef } from "react";

function AddRRBF({ history }) {
  const [time, setTime] = useState("");
  const [expdate, setExpdate] = useState("");
  const [atm, setAtm] = useState("");
  const [twentyfivedrr, setTwentyfivedrr] = useState("");
  const [tendrr, setTendrr] = useState("");
  const [twentyfivedbff, setTwentyfivedbff] = useState("");
  const [tendbff, setTendbff] = useState("");
  const socket = useRef(null);
  function sendMessage(e) {
    e.preventDefault();
    socket.current.send(
      JSON.stringify({
        type: "rrbf",
        time: time,
        expdate: expdate,
        atm: atm,
        twentyfivedrr: twentyfivedrr,
        tendrr: tendrr,
        twentyfivedbff: twentyfivedbff,
        tendbff: tendbff,
      })
    );
  }
  useEffect(() => {
    connect();
    socket.current.onopen = onOpen;
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
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "20px" }}>RR/BF Table Input</h2>
        <form onSubmit={sendMessage}>
          <div style={{ flexDirection: "column" }}>
            <div>
              <input
                placeholder="time"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Exp Date"
                type="text"
                value={expdate}
                onChange={(e) => setExpdate(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Atm"
                type="text"
                value={atm}
                onChange={(e) => setAtm(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="25d R/R"
                type="text"
                value={twentyfivedrr}
                onChange={(e) => setTwentyfivedrr(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="10d R/R"
                type="text"
                value={tendrr}
                onChange={(e) => setTendrr(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="25 d B/F"
                type="text"
                value={twentyfivedbff}
                onChange={(e) => setTwentyfivedbff(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="10d B/F"
                type="text"
                value={tendbff}
                onChange={(e) => setTendbff(e.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Send" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRRBF;
