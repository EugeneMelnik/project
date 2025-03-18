import express from 'express';
import db from '../../db/models/index.js';
import { sendError } from './helpers.js';

const { user: User, like: Like, collection: Collection } = await db;
const router = express.Router();

router.get('/getAllUsers', async (_req, res) => {
  try { return res.send(await User.findAll()); } catch (error) { return sendError(res, error); }
});

router.get('/getUserInfo', async (req, res) => {
  try {
    const { id, name, surname, email = '' } = req.query;
    const [user, isNew] = await User.findOrCreate({
      where: { id },
      defaults: { name, surname, email },
      include: [{ model: Like, attributes: ['itemId'] }],
    });
    return res.send({ user, isNew });
  } catch (error) { return sendError(res, error); }
});

router.get('/getTargetUser', async (req, res) => {
  try {
    const target = await User.findOne({
      where: { id: req.query.userId },
      include: [{ model: Collection }],
    });
    if (target) target.collections = target.collections || [];
    return res.send(target);
  } catch (error) { return sendError(res, error); }
});

for (const [path, values] of [
  ['/blockUser', { status: 'blocked' }],
  ['/unblockUser', { status: 'active' }],
  ['/setIsAdmin', { role: 'Admin' }],
  ['/setIsNotAdmin', { role: 'User' }],
]) {
  router.post(path, async (req, res) => {
    try {
      await User.update(values, { where: { id: req.body.id } });
      return res.send({ code: 1 });
    } catch (error) { return sendError(res, error); }
  });
}

router.post('/deleteUser', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.body.id } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

export default router;
