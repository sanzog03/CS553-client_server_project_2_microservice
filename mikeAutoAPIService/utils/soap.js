import soap from 'soap'

// Create the SOAP client
// TODO: on docker, change localhost with port
const url = 'http://partsAPI:8090/VehichePartsQuery';

export async function getVehiclePartsInformation(partNumber=1) {
  return new Promise((resolve, reject) => {
    soap.createClient(url+"?wsdl", function(err, client) {
      client.setEndpoint(url)
      if (err) {
        console.error('Error creating SOAP client:', err);
        return reject(err);
      }
    
      // Make a SOAP request
      const args = { "partNumber": partNumber };
      console.log(JSON.stringify(client.describe()))
      client.VehiclePartsInventoryService.VehichePartsQueryPortType.VehichePartsQuery(args, function(err, result) {
        if (err) {
          console.error('Error making SOAP request:', err);
          return reject(err);
        }
        // Handle the SOAP response
        console.log('RESULT on SOAP client', result);
        resolve(result)
      });
    });  
  });
}
