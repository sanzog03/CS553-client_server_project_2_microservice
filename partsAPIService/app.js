import express from 'express'
import fs from 'fs'
import soap from 'soap'
import bodyParser from 'body-parser'

import { VehiclePartsInventoryService } from "./services/vehiclePartsInventory.service.js"

const app = express()

app.use(bodyParser.raw(
    {
      type: function() { return true; },
      limit: '5mb'
    }
  )
);

// Constants
const PORT = 8090;

// Create the SOAP server
const xml = fs.readFileSync('VehiclePartsInventoryService.wsdl', 'utf8');
app.listen(PORT, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/VehichePartsQuery', VehiclePartsInventoryService, xml, function(){
      console.log(`Vehicle parts query service on http://localhost:${PORT}`);
      console.log(`use this url for wsdl client: http://localhost:${PORT}/VehichePartsQuery?wsdl`);
    })
    .log = (type, data)  => {
      console.log(`Got something ${type} ${data}`);
    };
});