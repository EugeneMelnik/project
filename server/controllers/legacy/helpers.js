export function sendError(res, error) {
  return res.status(400).send({ code: 0, message: error.message });
}

export function imageData(record) {
  if (!record || !record.icon) return record;
  record.icon = Buffer.from(record.icon).toString('base64');
  return record;
}

export function imageDataList(records) {
  return records.map(imageData);
}

export function pageLimit(page, pageSize = 3) {
  const value = Number(page);
  return Number.isFinite(value) && value > 0 ? pageSize * value : pageSize;
}
