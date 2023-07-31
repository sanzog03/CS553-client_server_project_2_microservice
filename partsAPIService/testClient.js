import soap from 'soap'

// Create the SOAP client
const url = 'http://localhost:8090/VehichePartsQuery';
soap.createClient(url+"?wsdl", function(err, client) {
  client.setEndpoint(url)
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  // Make a SOAP request
  const args = { "partNumber": "1234" };
  console.log(JSON.stringify(client.describe()))
  client.VehiclePartsInventoryService.VehichePartsQueryPortType.VehichePartsQuery(args, function(err, result) {
    if (err) {
      console.error('Error making SOAP request:', err);
      return;
    }

    // Handle the SOAP response
    console.log('RESULT on SOAP client', result);
  });
});