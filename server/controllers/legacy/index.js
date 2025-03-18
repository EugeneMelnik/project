import express from 'express';
import usersRouter from './users.controller.js';
import collectionsRouter from './collections.controller.js';
import contentRouter from './content.controller.js';

const router = express.Router();

router.use(usersRouter);
router.use(collectionsRouter);
router.use(contentRouter);

export default router;
