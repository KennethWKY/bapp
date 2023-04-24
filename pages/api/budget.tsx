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
  const { pid } = req.query;

  switch (method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const user = await db
          .collection("user_template")
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();
        res.json(user[0]);
        break;
      } catch (e) {
        console.error(e);
      }
    // Add monthly categary and target
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const { type, amount } = req.body;
        const filter = { _id: new ObjectId("64447d7069d35e23c1b2351c") };
        const update = { $set: { [`monthlyBudget.${type}`]: amount } };
        const result = await db
          .collection("user_template")
          .updateOne(filter, update);
        res.send(result);
      } catch (e) {
        console.error(e);
      }
  }
};
