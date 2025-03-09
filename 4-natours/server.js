const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true, // Bypass SSL issues
  })
  .then(() => console.log('MongoDB Connected successful'));

const tourSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'Must have price'],
  },
});

const Tour = mongoose.model('Tour', tourSchemas);

const testTour = new Tour({
  name: 'the Forest Hiker',
  rating: 4.7,
  price: 345,
});

testTour.save().then(doc =>{
  console.log(doc)
}).catch(err =>{
  console.log('ERROR😢' ,err)
})

const app = require('./app');
console.log(process.env);
const port = 3000;
app.listen(port, () => {
  console.log(`APP runing on port ${port}`);
});
