import express from 'express';

import {show, create, read, update, remove} from '../controller/car.controller.js';

const router = express.Router({mergeParams: true});

// Get all cars in the shop -> GET /cars/
router.route("/")
  .get((req, res, next) => show(req, res, next).catch(err => next(Error(err))));

// Add a new car to the shop ->    POST /cars   
router.route("/")
  .post((req, res, next) => create(req, res, next).catch(err => next(Error(err))));

// Get a car in the shop -> GET /cars/:id 
router.route("/:id")
.get((req, res, next) => read(req, res, next).catch(err => next(Error(err))));

// Update a car in the shop -> PUT /cars/:id
router.route("/:id")
  .put((req, res, next) => update(req, res, next).catch(err => next(Error(err))));

// Remove a car from the shop -> DELETE /cars/:id 
router.route("/:id")
  .delete((req, res, next) => remove(req, res, next).catch(err => next(Error(err))));

export default router;