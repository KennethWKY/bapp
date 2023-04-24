import clientPromise from "../../lib/mongodb";
import {
  Document,
  InsertOneResult,
  ObjectId,
  Timestamp,
  WithId,
} from "mongodb";

export default async (
  req: { query?: any; body?: any; method?: any },
  res: {
    json: (arg0: WithId<Document>[]) => void;
    send: (arg0: InsertOneResult<Document>) => void;
  }
) => {
  const { method } = req;
  const { pid } = req.query;
  const owner = new ObjectId("64447d7069d35e23c1b2351c");

  switch (method) {
    //Get all expense
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const result = await db
          .collection("user_transaction_template")
          .find({ owner })
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();
        res.json(result);
        break;
      } catch (e) {
        console.error(e);
      }
    //Log expense
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const date = new Date();
        const { type, amount } = req.body;
        const result = await db
          .collection("user_transaction_template")
          .insertOne({ owner, type, amount, date });
        res.send(result);
      } catch (e) {
        console.error(e);
      }
  }
};
