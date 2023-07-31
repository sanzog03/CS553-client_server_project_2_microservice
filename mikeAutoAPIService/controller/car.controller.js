import { MongoClient, ObjectId } from 'mongodb';
import { serializer } from '../serializers/car.serializer.js';
import { deserialize } from '../deserializers/car.deserializer.js';
import { getPartNumber } from '../utils/random.js';

const url = 'mongodb://mongo:27017';
const dbName = 'mikeAutoApp';
const collectionName = "cars";

export const show = async (req, res, next) => {
  // show all car entries
  const client = new MongoClient(url);
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const carListCursor = collection.find();
    const carList = [];
    for await (const car of carListCursor) {
      if (!car.partNumber) {
        car.partNumber = 1
      }
      carList.push(car);
    }
    const jsonapi = serializer().serialize(carList);
    res.status(200).json(jsonapi)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export const create = async (req, res, next) => {
  // create new car entry
  const client = new MongoClient(url);
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const deserializedData = await deserialize(req.body);
    const { vin, plate, state, make, model, year, ownerName, address, drivingLicenseNumber, problemDescription, dayIn, dayOut, mechanicName } = deserializedData;

    let partNumber = getPartNumber();
    const doc = { vin, plate, state, make, model, year, ownerName, address, drivingLicenseNumber, problemDescription, dayIn, dayOut, mechanicName, partNumber };
    const result = await collection.insertOne(doc);
    res.status(201).end();
  } finally {
    await client.close();
  }
}

export const read = async (req, res, next) => {
  // read a car entry
  const client = new MongoClient(url);
  try {
    let idExists = await checkIdExists(req.params.id);
    if (idExists) {
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const query = { _id: new ObjectId(req.params.id) };
      const car = await collection.findOne(query);
      if (!car.partNumber) {
        car.partNumber = 1
      }
      const jsonapi = serializer().serialize(car);
      res.status(200).json(jsonapi)
    } else {
      throw new Error("Id doesnot exists");
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
} 

export const update = async (req, res, next) => {
  // update a car entry
  const client = new MongoClient(url);
  try {
    let idExists = await checkIdExists(req.params.id);
      if (idExists) {
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const filter = { _id: new ObjectId(req.params.id) };

      const deserializedData = await deserialize(req.body);
      const { vin, plate, state, make, model, year, ownerName, address, drivingLicenseNumber, problemDescription, dayIn, dayOut, mechanicName } = deserializedData;

      const updateDoc = {
        $set: { vin, plate, state, make, model, year, ownerName, address, drivingLicenseNumber, problemDescription, dayIn, dayOut, mechanicName },
      };
      const result = await collection.updateOne(filter, updateDoc);
      res.status(200).end();
    } else {
      throw new Error("Id doesnot exists");
    }
  } finally {
    await client.close();
  }
} 

export const remove = async (req, res, next) => {
  // delete a car entry
  const client = new MongoClient(url);
  try {
    let idExists = await checkIdExists(req.params.id);
    if (idExists) {
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const filter = { _id: new ObjectId(req.params.id) };
      const result = await collection.deleteOne(filter);
      res.status(204).end();
    } else {
      throw new Error("Id doesnot exists");
    }
  } finally {
    await client.close();
  }
}

const checkIdExists = async (id) => {
  const client = new MongoClient(url);
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  const filter = { _id: new ObjectId(id) };
  const result = await collection.deleteOne(filter);
  return result !== null;
}