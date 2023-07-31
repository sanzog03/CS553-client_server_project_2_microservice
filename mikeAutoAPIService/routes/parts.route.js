import express from 'express';

import {read} from '../controller/part.controller.js';

const router = express.Router({mergeParams: true});

// Get the price and expected delivery date for the part -> GET /part/:id
router.route("/:id")
  .get((req, res, next) => read(req, res, next).catch(err => next(Error(err))));

export default router;