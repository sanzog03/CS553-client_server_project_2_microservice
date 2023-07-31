import express from 'express'
const app = express()

// import dbConn from "./database/mongo.js"
import carRoutes from "./routes/car.route.js";
import partRoutes from "./routes/parts.route.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handling middleware
function error(err, req, res, next) {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: err.stack
  })
}

// Routes
app.get('/', (req, res) => {
  res.send("Hello, Welcome to Mike Auto!");
});

app.use('/car', carRoutes);
app.use('/part', partRoutes);

app.use(error);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Mike Auto App running on http://${HOST}:${PORT}`)
});