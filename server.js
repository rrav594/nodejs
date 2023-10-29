const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UnCaught Exception....Shutting Down!');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// console.log(process.env);
mongoose.connect(DB).then(() => {
  console.log('DB Connection successful');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection....Shutting Down!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
