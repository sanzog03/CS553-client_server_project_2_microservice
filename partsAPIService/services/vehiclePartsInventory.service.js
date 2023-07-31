import {getDeliveryDate, getPrice} from "../utils/randomizer.js"

export const VehiclePartsInventoryService = {
  VehiclePartsInventoryService: {
    VehichePartsQueryPortType: {
      VehichePartsQuery: function(args, callback) {
        // Perform the logic to get the vehicle parts cost and delivery estimate,
        // based on the part number.
        const partNumber = Number(args.partNumber);
        const price = getPrice(partNumber);
        const deliveryDate = getDeliveryDate(partNumber);

        // Return the response
        const result = {
          price: price,
          deliveryDate: deliveryDate
        };
        callback({result});
      }
    }
  }
};