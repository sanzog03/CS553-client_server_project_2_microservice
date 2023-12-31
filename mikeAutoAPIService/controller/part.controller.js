import { serializer } from '../serializers/part.serializer.js';
import {getVehiclePartsInformation} from '../utils/soap.js';

export const read = async (req, res, next) => {
  // call soap server and read the delivery date and the price
  try {
    let partNumber = req.params.id;
    let result = await getVehiclePartsInformation(partNumber);
    result.price = `$${result.price}`
    const jsonapi = serializer().serialize(result);
    res.status(200).json(jsonapi)
  } finally {
    // pass. handle error catch in the outer scope
  }
}