import clientPromise from "../../lib/mongodb";
import { Document, ObjectId, UpdateResult, WithId } from "mongodb";

export default async (
  req: { query?: any; body?: any; method?: any },
  res: {
    json: (arg0: WithId<Document>) => void;
    send: (arg0: UpdateResult) => void;
  }
) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const params = new URLSearchParams(req.query);
        const client = await clientPromise;
        const db = client.db("budget");
        const userId = params.get("userId");
        const user = await db
          .collection("user")
          .find({ userId: userId })
          .toArray();
        res.json(user[0]);
        return;
      } catch (e) {
        console.error(e);
      }

    // Change or Add fixed expense
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const params = new URLSearchParams(req.query);
        const userId = params.get("userId");
        const { category, cost } = req.body;

        // Update the document with the new fixed expense
        const filter = { userId };
        const update = {
          $set: { [`fixedExpense.${category}`]: parseFloat(cost) },
        };
        const result = await db.collection("user").updateOne(filter, update);
        res.json({ userId, ...result, _id: new ObjectId() });
        return;
      } catch (e) {
        console.error(e);
      }
  }
};
