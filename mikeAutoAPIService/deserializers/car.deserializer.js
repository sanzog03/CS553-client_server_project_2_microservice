import pkg from 'jsonapi-serializer';
const { Deserializer: JSONAPIDeserializer } = pkg;

const ds = new JSONAPIDeserializer({ keyForAttribute: "camelCase" });

export const deserialize = async (body) => {
  return new Promise((res, rej) => {
    ds.deserialize(body).then((data, err) => {
      if (err) {
        rej(err);
      } else {
        res(data);  
      }
    });  
  });
}