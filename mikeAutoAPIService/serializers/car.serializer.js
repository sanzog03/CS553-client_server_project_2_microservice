import { Serializer as JSONAPISerializer } from "jsonapi-serializer";

export const serializer = (offsets) =>
  new JSONAPISerializer("car", {
    topLevelLinks: offsets && {
      self: () => `/car?page=${offsets.self}`,
      previous: () => `/car?page=${offsets.previous}`,
      next: () => `/car?page=${offsets.next}`,
      first: () => `/car?page=${offsets.first}`,
      last: () => `/car?page=${offsets.last}`,
    },
    attributes: ["vin", "plate", "state", "make", "model", "year", "ownerName", "address", "drivingLicenseNumber", "_id", "problemDescription", "dayIn", "dayOut", "mechanicName", "partNumber"],
    keyForAttribute: "camelCase",
  });