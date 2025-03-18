import db from './db/models/index.js';
import express from 'express';
import cors from 'cors';
import http from 'http';
import controllers from './controllers/index.js';
import legacyRouter from './controllers/legacy/index.js';
import bodyParser from 'body-parser';
import './firebase/config.js';

const l = await db;

const port = process.env.API_PORT || 5000;

const app = express();

async function normalizeTagsPrimaryKey() {
  const [tables] = await l.sequelize.query("SHOW TABLES LIKE 'tags'");

  if (tables.length === 0) return;

  const [keys] = await l.sequelize.query('SHOW KEYS FROM `tags`');
  const primaryKeyColumns = keys
    .filter((key) => key.Key_name === 'PRIMARY')
    .map((key) => key.Column_name);

  if (primaryKeyColumns.length > 1 && primaryKeyColumns.includes('content')) {
    await l.sequelize.query(
      'ALTER TABLE `tags` DROP PRIMARY KEY, ADD PRIMARY KEY (`id`)'
    );
  }
}

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use('/api', legacyRouter);
app.use('/api/user', controllers.userRouter);

const server = http.createServer(app);

l.sequelize
  .authenticate()
  .then(normalizeTagsPrimaryKey)
  .then(() => l.sequelize.sync({ force: false }))
  .then(function () {
    server.listen(port, function () {
      console.log('server is successfully running on port ' + port);
    });
  })
  .catch(function (error) {
    console.error('server failed to start', error);
    process.exitCode = 1;
  });
