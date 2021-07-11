import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Popup from "./Popup";
import "./Tablereusable.css";

function Tablereusable({ flag, tablelabels, tablelist, history }) {
  const [activepage, setActivePage] = useState(1);
  const [trigger, settrigger] = useState(-1);
  const [deleteuser, setDeleteUser] = useState(null);
  const [view, setViewUser] = useState(null);
  const handleUserGistView = (item) => {
    setViewUser(item);
    settrigger(1);
  };
  const handleUserGistDelete = (item) => {
    setDeleteUser(item);
    settrigger(0);
  };
  const deletecontact = async (id) => {
    settrigger(-1);
    window.location.reload();
  };
  const numberofpages = Math.ceil(tablelist.length / 10);
  return (
    <>
      {flag === "allcontacts" && (
        <div style={{ backgroundColor: "#0A1640", color: "#fff" }}>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data" key={item.id}>
                      <td>{item.time}</td>
                      <td>{item.expdate} </td>
                      <td>{item.atm}</td>
                      <td>{item.twentyfivedrr}</td>
                      <td>{item.tendrr}</td>
                      <td>{item.twentyfivedbff}</td>
                      <td>{item.tendbff}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {trigger === 1 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">{view.email}</h1>
          <p className="popup-message">{view.description} </p>
        </Popup>
      )}
      {trigger === 0 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">Are You sure you want to delete?</h1>
          <p className="popup-message">{deleteuser.email} </p>
          <p className="popup-message">{deleteuser.description} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                deletecontact(deleteuser.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Tablereusable;
