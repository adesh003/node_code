const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

/// 1 ) MIDDLEWARE

app.use(morgan("dev"));

app.use(express.json());
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
);
// ROUTE HANDLER
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  const tour = tours.find((el) => el.id == id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Succes",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour: "<upload tour data>",
    },
  });
};

const deleteTour = (req, res) =>{
  if (req.params.id *1 > tours.length){
    return res.status(404).json({
      status:"fail",
      message:'invalid ID'
    })
  }
  
  res.status(204).json({
    status:'success',
    data:null,
  })
}


const getAllUser = (req, res) =>{
  res.status(500).json({
    status:'error',
    message:"this route not yet defined"
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route not yet defined",
  });
};
// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);

// ROUTES

app
.route("/api/v1/tours/:id")
.get(getTour)
.patch(updateTour);
app
.route("/api/v1/tours")
.get(getAllTours)
.post(createTour)
.delete(deleteTour);

app
.route("/api/v1/user")
.get(getAllUser)
.post(createUser);

app
.route("/api/v1/user/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

// SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`APP runing on port ${port}`);
});
