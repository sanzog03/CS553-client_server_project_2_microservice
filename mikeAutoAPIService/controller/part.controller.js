import { serializer } from '../serializers/part.serializer.js';
import {getVehiclePartsInformation} from '../utils/soap.js';

export const read = async (req, res, next) => {
  // call soap server and read the delivery date and the price
  try {
    let partNumber = req.params.id;
    let result = await getVehiclePartsInformation(partNumber);
    const jsonapi = serializer().serialize(result);
    console.log(">>>>>>", jsonapi)
    res.status(200).json(jsonapi)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

