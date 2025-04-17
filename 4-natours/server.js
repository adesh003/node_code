
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app')


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
 
console.log(process.env);
const port = 5000;
app.listen(port, () => {
  console.log(`APP runing on port ${port}`);
});
