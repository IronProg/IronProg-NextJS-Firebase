import db from "../../../utils/db";

export default async (req, res) => {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'PUT':
        await db.collection('entries').doc(id).update({
          ...req.body,
          updated: new Date().toISOString()
        });
        break;
      case 'GET':
      const doc = await db.collection('entries').doc(id).get();
      if (doc.exists) {
        res.status(200).json(doc.data());
      } else {
        res.status(404).end();
      }
      break;
      case 'DELETE':
        await db.collection('entries').doc(id).delete();
        break;
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
}