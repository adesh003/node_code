
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app')
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





console.log(process.env);
const port = 3000;
app.listen(port, () => {
  console.log(`APP runing on port ${port}`);
});
