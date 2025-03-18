import express from 'express';
import { Op } from 'sequelize';
import db from '../../db/models/index.js';
import { sendError } from './helpers.js';

const {
  item: Item,
  tag: Tag,
  comment: Comment,
  like: Like,
  subject: Subject,
  collection: Collection,
} = await db;
const router = express.Router();
const filterColumns = new Set(['title']);

router.get('/getItem', async (req, res) => {
  try {
    return res.send(await Item.findOne({
      where: { id: req.query.itemId },
      include: [{ model: Comment }, { model: Collection }],
    }));
  }
  catch (error) { return sendError(res, error); }
});

router.get('/getAllTags', async (_req, res) => {
  try { return res.send(await Tag.findAll()); } catch (error) { return sendError(res, error); }
});

router.get('/searchMatchTag', async (req, res) => {
  try {
    return res.send(await Tag.findAll({ where: { content: { [Op.like]: `%${req.query.tag || ''}%` } } }));
  } catch (error) { return sendError(res, error); }
});

router.get('/searchItemsByTag', async (req, res) => {
  try {
    return res.send(await Item.findAll({ include: [{ model: Tag, where: { content: req.query.tag } }] }));
  } catch (error) { return sendError(res, error); }
});

router.get('/search', async (req, res) => {
  try {
    const value = `%${req.query.substr || ''}%`;
    return res.send(await Item.findAll({ where: { title: { [Op.like]: value } } }));
  } catch (error) { return sendError(res, error); }
});

router.get('/getSubjects', async (_req, res) => {
  try { return res.send(await Subject.findAll()); } catch (error) { return sendError(res, error); }
});

router.post('/toogleLike', async (req, res) => {
  try {
    const where = { userId: req.body.userId, itemId: req.body.itemId };
    const existing = await Like.findOne({ where });
    if (existing) await existing.destroy(); else await Like.create(where);
    return res.send({ liked: !existing });
  } catch (error) { return sendError(res, error); }
});

router.get('/getAllComments', async (req, res) => {
  try { return res.send(await Comment.findAll({ where: { itemId: req.query.itemId } })); }
  catch (error) { return sendError(res, error); }
});

router.post('/addComment', async (req, res) => {
  try {
    return res.status(201).send(await Comment.create({
      content: req.body.content,
      userId: req.body.userId,
      itemId: req.body.itemId,
    }));
  } catch (error) { return sendError(res, error); }
});

router.put('/setCommentsTouched', async (req, res) => {
  try {
    await Comment.update({ state: 'touched' }, { where: { itemId: req.body.itemId } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

router.get('/getAllUntouchedComments', async (_req, res) => {
  try { return res.send(await Comment.findAll({ where: { state: 'untouched' } })); }
  catch (error) { return sendError(res, error); }
});

for (const [path, operator] of [
  ['/filterContains', (value) => ({ [Op.like]: `%${value}%` })],
  ['/filterStartsWith', (value) => ({ [Op.like]: `${value}%` })],
  ['/filterEquals', (value) => value],
]) {
  router.get(path, async (req, res) => {
    try {
      const { collectionId, column, str = '' } = req.query;
      if (!filterColumns.has(column)) return res.status(400).send({ code: 0, message: 'Unsupported filter column' });
      return res.send(await Item.findAll({ where: { collectionId, [column]: operator(str) } }));
    } catch (error) { return sendError(res, error); }
  });
}

export default router;
