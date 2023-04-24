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
  const owner = new ObjectId("64447d7069d35e23c1b2351c");

  switch (method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const data = await db
          .collection("user_template")
          .findOne({ _id: owner });
        if (data) {
          res.json(data.income);
        } else {
          console.log("income is null");
        }
        break;
      } catch (e) {
        console.error(e);
      }
    // Change monthly income
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const { income } = req.body;
        const filter = { _id: owner };
        const update = { $set: { income: income } };
        const result = await db
          .collection("user_template")
          .updateOne(filter, update);
        res.json({ _id: owner, ...result });
      } catch (e) {
        console.error(e);
      }
  }
};
