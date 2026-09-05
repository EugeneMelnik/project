import express from 'express';
import multer from 'multer';
import db from '../../db/models/index.js';
import { imageData, imageDataList, pageLimit, sendError } from './helpers.js';

const {
  collection: Collection,
  item: Item,
  like: Like,
  tag: Tag,
  user: User,
} = await db;
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/getBigCollections', async (_req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { isDeleted: false },
      include: [{ model: Item, include: [{ model: Like, attributes: ['itemId'] }] }],
    });
    collections.sort((first, second) => {
      const firstLikes = first.items.reduce((total, item) => total + (item.likes?.length || 0), 0);
      const secondLikes = second.items.reduce((total, item) => total + (item.likes?.length || 0), 0);
      return secondLikes - firstLikes;
    });
    return res.send(imageDataList(collections.slice(0, 5)).map((collection) => ({
      ...collection.toJSON(),
      list: collection.items.map((item) => imageData(item).toJSON()),
    })));
  } catch (error) { return sendError(res, error); }
});

router.get('/getAllCollections', async (req, res) => {
  try {
    const where = { isDeleted: false };
    if (req.query.userId) where.userId = req.query.userId;
    return res.send(imageDataList(await Collection.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
    })));
  } catch (error) { return sendError(res, error); }
});

for (const path of ['/getMyCollections', '/getUserCollections', '/getTargetCollections']) {
  router.get(path, async (req, res) => {
    try {
      const where = { userId: req.query.userId, isDeleted: false };
      const collections = await Collection.findAll({
        where,
        limit: pageLimit(req.query.page),
        order: [['updatedAt', 'DESC']],
        include: [{ model: Item, where: { isDeleted: false }, required: false }],
      });
      const collectionsWithItems = collections.map((collection) => ({
        ...collection.toJSON(),
        list: collection.items.map((item) => imageData(item).toJSON()),
      }));
      if (path === '/getTargetCollections') return res.send(collectionsWithItems);
      return res.send({
        collections: collectionsWithItems.map((collection) => imageData(collection)),
        countCollections: await Collection.count({ where }),
      });
    } catch (error) { return sendError(res, error); }
  });
}

router.get('/getEditCollections', async (_req, res) => res.send([]));

router.get('/getDeleteCollections', async (req, res) => {
  const collections = await Collection.findAll({
    where: { userId: req.query.userId, isDeleted: true },
    include: [{ model: Item, where: { isDeleted: true }, required: false }],
  });
  return res.send(collections.map((collection) => imageData(collection)));
});

router.get('/getCollection', async (req, res) => {
  try {
    const collection = await Collection.findOne({
      where: { id: req.query.collectionId, isDeleted: false },
      include: [{ model: Item }],
    });
    if (collection) {
      collection.items = collection.items.map((item) => imageData(item));
      collection.list = collection.items;
    }
    return res.send(imageData(collection));
  } catch (error) { return sendError(res, error); }
});

router.get('/getCollectionItems', async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { collectionId: req.query.collectionId, isDeleted: false },
    });
    return res.send(items.map((item) => imageData(item)));
  }
  catch (error) { return sendError(res, error); }
});

router.get('/getEditItems', async (_req, res) => res.send([]));

router.get('/getDeleteItems', async (req, res) => {
  const items = await Item.findAll({
    where: { collectionId: req.query.collectionId, isDeleted: true },
  });
  return res.send(items.map((item) => imageData(item)));
});

router.put('/setEditCollection', async (_req, res) => res.send({ code: 1 }));

router.put('/setDeleteCollection', async (_req, res) => res.send({ code: 1 }));

router.put('/setEditItems', async (_req, res) => res.send({ code: 1 }));

router.put('/setDeleteItems', async (_req, res) => res.send({ code: 1 }));

router.post('/createCollection', upload.single('icon'), async (req, res) => {
  try {
    const collection = await Collection.create({
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject || req.body.theme,
      icon: req.file?.buffer,
      userId: req.body.userId,
    });
    const countCollections = await Collection.count({
      where: { userId: req.body.userId },
    });

    return res.status(201).send({ collection, countCollections });
  } catch (error) { return sendError(res, error); }
});

router.put('/updateCollection', upload.any(), async (req, res) => {
  try {
    const { collectionId, theme, ...updates } = req.body;
    if (theme) updates.subject = theme;
    const icon = req.files?.find((file) => file.fieldname === 'icon');
    if (icon) updates.icon = icon.buffer;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => (
        value !== '' && value !== 'null' && value !== 'undefined'
      )),
    );
    await Collection.update(filteredUpdates, { where: { id: collectionId } });
    const collection = await Collection.findByPk(collectionId);
    if (!collection) return res.send({ code: 0 });
    imageData(collection);
    return res.send({ ...collection.toJSON(), theme: collection.subject });
  } catch (error) { return sendError(res, error); }
});

router.delete('/deleteCollection', async (req, res) => {
  try {
    const collectionId = req.query.id || req.body.id;
    await Collection.update({ isDeleted: true }, { where: { id: collectionId } });
    await Item.update({ isDeleted: true }, { where: { collectionId } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

router.post('/createItem', upload.single('icon'), async (req, res) => {
  try {
    const item = await Item.create({
      title: req.body.title,
      collectionId: req.body.collectionId,
      icon: req.file?.buffer,
    });

    let tagValues = req.body.tags || [];
    try {
      tagValues = typeof tagValues === 'string' ? JSON.parse(tagValues) : tagValues;
    } catch (_error) {
      tagValues = tagValues.split(',');
    }

    if (!Array.isArray(tagValues)) tagValues = [tagValues];

    const tags = [];
    for (const value of tagValues) {
      const content = String(value).trim();
      if (!content) continue;
      const [tag] = await Tag.findOrCreate({ where: { content } });
      tags.push(tag);
    }

    if (tags.length) await item.addTags(tags);

    return res.status(201).send(await Item.findByPk(item.id, { include: [{ model: Tag }] }));
  } catch (error) { return sendError(res, error); }
});

router.put('/updateItem', upload.any(), async (req, res) => {
  try {
    const { itemId, ...updates } = req.body;
    const icon = req.files?.find((file) => file.fieldname === 'icon');
    if (icon) updates.icon = icon.buffer;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => (
        value !== '' && value !== 'null' && value !== 'undefined'
      )),
    );
    await Item.update(filteredUpdates, { where: { id: itemId } });
    const item = await Item.findByPk(itemId, { include: [{ model: Tag }] });
    if (!item) return res.send({ code: 0 });
    imageData(item);
    return res.send(item);
  } catch (error) { return sendError(res, error); }
});

router.delete('/deleteItem', async (req, res) => {
  try {
    await Item.update(
      { isDeleted: true },
      { where: { id: req.query.itemId || req.body.itemId } },
    );
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

export default router;
