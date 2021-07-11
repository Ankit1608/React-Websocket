const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const mongoose = require("mongoose");

const { Rrbf, Callput } = require("./schema");
(async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", async (req, res) => {
    const rrbfd = await Rrbf.find();
    const callputd = await Callput.find();
    const response = {
      rrbfdata: rrbfd,
      callputdata: callputd,
    };
    res.send(JSON.stringify(response));
  });

  const clients = [];
  const wss = new WebSocket.Server({ port: 3002 });

  wss.on("connection", function connection(socket) {
    socket.on("message", function incoming(message) {
      const data = JSON.parse(message);
      console.dir(data);

      switch (data.type) {
        case "connect": {
          console.log("Connecting to websocket ");
          clients.push({
            socket,
            ...data,
          });
          break;
        }

        case "rrbf": {
          clients.forEach((client) =>
            client.socket.send(
              JSON.stringify({
                type: "rrbf",
                ...data,
              })
            )
          );
          const newrrbf = new Rrbf({
            time: data.time,
            expdate: data.expdate,
            atm: data.atm,
            twentyfivedrr: data.twentyfivedrr,
            tendrr: data.tendrr,
            twentyfivedbff: data.twentyfivedbff,
            tendbff: data.tendbff,
          });
          async function saveinDb() {
            try {
              await newrrbf.save();
            } catch (err) {
              console.log(err);
            }
          }
          saveinDb();
          break;
        }
        case "callput": {
          clients.forEach((client) =>
            client.socket.send(
              JSON.stringify({
                type: "callput",
                ...data,
              })
            )
          );
          const newcallput = new Callput({
            time: data.time,
            expdate: data.expdate,
            atm: data.atm,
            twentyfivedrr: data.twentyfivedrr,
            tendrr: data.tendrr,
            twentyfivedbff: data.twentyfivedbff,
            tendbff: data.tendbff,
          });
          async function saveinDb() {
            try {
              await newcallput.save();
            } catch (err) {
              console.log(err);
            }
          }
          saveinDb();
          break;
        }
      }
    });

    socket.on("close", function close() {
      const client = clients.find((c) => c.user === socket.user);
      if (!client) return;
      console.log("Closing " + client.user);
      clients.splice(clients.indexOf(client), 1);
    });
  });

  await mongoose
    .connect("mongodb://localhost/reactWebsocket")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to mongodb", err));

  app.listen(1337, () => {
    console.log("Listening on 1337");
  });
})();
