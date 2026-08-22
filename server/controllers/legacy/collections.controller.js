import express from 'express';
import multer from 'multer';
import db from '../../db/models/index.js';
import { imageData, imageDataList, pageLimit, sendError } from './helpers.js';

const {
  collection: Collection,
  item: Item,
  tag: Tag,
  user: User,
} = await db;
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/getBigCollections', async (_req, res) => {
  try {
    const collections = await Collection.findAll({ include: [{ model: Item }], limit: 5, order: [['updatedAt', 'DESC']] });
    return res.send(imageDataList(collections));
  } catch (error) { return sendError(res, error); }
});

router.get('/getAllCollections', async (req, res) => {
  try {
    const where = req.query.userId ? { userId: req.query.userId } : undefined;
    return res.send(imageDataList(await Collection.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
    })));
  } catch (error) { return sendError(res, error); }
});

for (const path of ['/getMyCollections', '/getUserCollections', '/getTargetCollections']) {
  router.get(path, async (req, res) => {
    try {
      const where = { userId: req.query.userId };
      const collections = await Collection.findAll({
        where,
        limit: pageLimit(req.query.page),
        order: [['updatedAt', 'DESC']],
      });
      if (path === '/getTargetCollections') return res.send(imageDataList(collections));
      return res.send({
        collections: imageDataList(collections),
        countCollections: await Collection.count({ where }),
      });
    } catch (error) { return sendError(res, error); }
  });
}

router.get('/getEditCollections', async (_req, res) => res.send([]));

router.get('/getDeleteCollections', async (_req, res) => res.send([]));

router.get('/getCollection', async (req, res) => {
  try {
    const collection = await Collection.findOne({
      where: { id: req.query.collectionId },
      include: [{ model: Item }],
    });
    return res.send(imageData(collection));
  } catch (error) { return sendError(res, error); }
});

router.get('/getCollectionItems', async (req, res) => {
  try { return res.send(await Item.findAll({ where: { collectionId: req.query.collectionId } })); }
  catch (error) { return sendError(res, error); }
});

router.get('/getEditItems', async (_req, res) => res.send([]));

router.get('/getDeleteItems', async (_req, res) => res.send([]));

router.put('/setEditCollection', async (_req, res) => res.send({ code: 1 }));

router.put('/setDeleteCollection', async (_req, res) => res.send({ code: 1 }));

router.put('/setEditItems', async (_req, res) => res.send({ code: 1 }));

router.put('/setDeleteItems', async (_req, res) => res.send({ code: 1 }));

router.post('/createCollection', upload.single('icon'), async (req, res) => {
  try {
    return res.status(201).send(await Collection.create({
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject || req.body.theme,
      icon: req.file?.buffer,
      userId: req.body.userId,
    }));
  } catch (error) { return sendError(res, error); }
});

router.put('/updateCollection', upload.any(), async (req, res) => {
  try {
    const { collectionId, ...updates } = req.body;
    await Collection.update(updates, { where: { id: collectionId } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

router.delete('/deleteCollection', async (req, res) => {
  try {
    await Collection.destroy({ where: { id: req.query.id || req.body.id } });
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
    await Item.update(updates, { where: { id: itemId } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

router.delete('/deleteItem', async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.query.itemId || req.body.itemId } });
    return res.send({ code: 1 });
  } catch (error) { return sendError(res, error); }
});

export default router;
