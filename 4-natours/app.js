const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
// app.get("/", (req, res) => {
//   res
//   .status(200)
//   .json({
//     message: "Hello from server side",
//     app: "Natours" });
// })

// app.post('/' , (req, res) =>{
//   res.send(`you can post to this endpoint...`)
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
});


app.get("/api/v1/tours/:id", (req, res) => {
 console.log(req.params);
 
 const id = req.params.id *1;
 
 if(id >tours.length)
 {
  return res.status(404).json({
    status:'fail',
    message:"Invalid id"
  })
 }
 
 const tour = tours.find(el => el.id == id)
  res.status(200).json({
    status: "success",
    
    data: {
      tour
    },
  });
});




app.post("/api/v1/tours", (req, res) => {
  // console.log(req.body);
  
  const newId = tours[tours.length -1].id + 1;
  const newTour = Object.assign({id: newId} , req.body)
  
  tours.push(newTour);
  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json` , JSON.stringify(tours), err =>{
    res.status(201).json({
      status: 'Succes',
      data:{
        tour:newTour,
      }
    })
  });
  
});


app.patch('/api/v1/tours/:id' , (req, res) =>{ 
 const id = req.params.id *1;
 
 if(id >tours.length)
 {
  return res.status(404).json({
    status:'fail',
    message:"Invalid id"
  })
 }
  
  res.status(200).json({
    status:"Success",
    data:{
      tour:"<upload tour data>"
    }
  })
   
})

const port = 3000;
app.listen(port, () => {
  console.log(`APP runing on port ${port}`);
});
