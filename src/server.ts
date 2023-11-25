import config from './App/config';
import app from './app';

import mongoose from 'mongoose';

// main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.database_url as string);
  app.listen(config.port, () => {
    console.log(`  app listening on port ${config.port}`);
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();
