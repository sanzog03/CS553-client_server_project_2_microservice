import { Serializer as JSONAPISerializer } from "jsonapi-serializer";

export const serializer = (offsets) =>
  new JSONAPISerializer("part", {
    topLevelLinks: offsets && {
      self: () => `/part?page=${offsets.self}`,
      previous: () => `/part?page=${offsets.previous}`,
      next: () => `/part?page=${offsets.next}`,
      first: () => `/part?page=${offsets.first}`,
      last: () => `/part?page=${offsets.last}`,
    },
    attributes: ['price', 'deliveryDate'],
    keyForAttribute: "camelCase",
  });