const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

let rrbfschema = new mongoose.Schema(
  {
    time: String,
    expdate: String,
    atm:String,
    twentyfivedrr:String,
    tendrr:String,
    twentyfivedbff:String,
    tendbff:String

  },
  { collection: "rrbf" }
);
let callputschema = new mongoose.Schema(
    {
      time: String,
      expdate: String,
      atm:String,
      twentyfivedrr:String,
      tendrr:String,
      twentyfivedbff:String,
      tendbff:String
  
    },
    { collection: "callput" }
  );
var Rrbf = mongoose.model("rrbf", rrbfschema);
var Callput=mongoose.model("callput", callputschema)
module.exports = { Rrbf, Callput };