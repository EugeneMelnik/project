import express from 'express';
import { Op } from 'sequelize';
import db from '../../db/models/index.js';
import { imageData, sendError } from './helpers.js';

const {
  item: Item,
  tag: Tag,
  comment: Comment,
  like: Like,
  subject: Subject,
  collection: Collection,
  user: User,
} = await db;
const router = express.Router();
const filterColumns = new Set(['title']);

router.get('/getLastAddItems', async (_req, res) => {
  try {
    const items = await Item.findAll({
      where: { isDeleted: false },
      include: [
        { model: Like, attributes: ['itemId'] },
        {
          model: Collection,
          attributes: ['theme'],
          include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
        },
        { model: Tag, as: 'tags', attributes: ['content', 'createdAt'] },
      ],
    });

    items.sort((first, second) => (second.likes?.length || 0) - (first.likes?.length || 0));

    return res.send(items.slice(0, 5).map((item) => {
      if (item.icon) item.icon = Buffer.from(item.icon).toString('base64');
      return item;
    }));
  } catch (error) { return sendError(res, error); }
});

router.get('/getItem', async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.query.itemId, isDeleted: false },
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
        },
        { model: Collection },
      ],
    });
    return res.send(imageData(item));
  }
  catch (error) { return sendError(res, error); }
});

router.get('/getAllTags', async (_req, res) => {
  try { return res.send(await Tag.findAll()); } catch (error) { return sendError(res, error); }
});

router.get('/getThemes', async (_req, res) => {
  try {
    return res.send(await Subject.findAll({ order: [['id', 'ASC']] }));
  } catch (error) { return sendError(res, error); }
});

router.get('/searchMatchTag', async (req, res) => {
  try {
    return res.send(await Tag.findAll({ where: { content: { [Op.like]: `%${req.query.tag || ''}%` } } }));
  } catch (error) { return sendError(res, error); }
});

router.get('/searchItemsByTag', async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { isDeleted: false },
      include: [
        { model: Tag, where: { content: req.query.tag } },
        { model: Like, attributes: ['itemId'] },
        {
          model: Collection,
          include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
        },
      ],
    });
    return res.send(items.map((item) => imageData(item)));
  } catch (error) { return sendError(res, error); }
});

router.get('/search', async (req, res) => {
  try {
    const value = `%${req.query.substr || ''}%`;
    const items = await Item.findAll({
      where: {
        isDeleted: false,
        [Op.or]: [
          { title: { [Op.like]: value } },
          { '$collection.title$': { [Op.like]: value } },
          { '$collection.description$': { [Op.like]: value } },
          { '$tags.content$': { [Op.like]: value } },
        ],
      },
      include: [
        { model: Like, attributes: ['itemId'] },
        {
          model: Collection,
          include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
        },
        { model: Tag, as: 'tags', attributes: ['content'] },
      ],
    });
    const collections = await Collection.findAll({
      where: {
        isDeleted: false,
        [Op.or]: [
          { title: { [Op.like]: value } },
          { description: { [Op.like]: value } },
          { subject: { [Op.like]: value } },
        ],
      },
      include: [{ model: Item, where: { isDeleted: false }, required: false }],
    });
    return res.send({
      items: items.map((item) => imageData(item)),
      collections: collections.map((collection) => {
        collection.items = collection.items.map((item) => imageData(item));
        collection.list = collection.items;
        return collection;
      }),
    });
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
  try {
    return res.send(await Comment.findAll({
      where: { itemId: req.query.itemId },
      include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
      order: [['createdAt', 'ASC']],
    }));
  }
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
  try {
    const collections = await Collection.findAll({
      where: { userId: _req.query.userId },
      include: [{
        model: Item,
        include: [{
          model: Comment,
          where: { state: 'untouched' },
          required: true,
          include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
        }],
      }],
    });
    const notifications = [];

    collections.forEach((collection) => {
      collection.items.forEach((item) => {
        notifications.push({
          icon: item.icon ? Buffer.from(item.icon).toString('base64') : null,
          title: item.title,
          collectionId: item.collectionId,
          comments: item.comments,
          itemId: item.id,
        });
      });
    });

    return res.send(notifications);
  }
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
