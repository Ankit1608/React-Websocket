import React, { useState } from "react";
import { FaBars, FaBell, FaRobot, FaSortDown } from "react-icons/fa";

function Header({ history, logout }) {
  const [drop, setDrop] = useState(false);
  const dropdownenable = () => {
    setDrop(!drop);
  };
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "#0C1B52",
        height: "7vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div style={{ cursor: "pointer", paddingLeft: "20px" }}>
        <h3
          style={{ color: "#fff", fontFamily: "sans-serif", fontSize: "14px" }}
        >
          {" "}
          Single Currency Grid
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: "20px",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div style={{ paddingRight: "30px" }}>
          <FaRobot size={20} color="#fff" />
        </div>
      </div>
    </div>
  );
}

export default Header;
