import clientPromise from "../../lib/mongodb";
import { Document, ObjectId, UpdateResult, WithId } from "mongodb";
import { getUserID } from "../../modules/userData";

export default async (
  req: { query?: any; body?: any; method?: any },
  res: {
    json: (arg0: WithId<Document>) => void;
    send: (arg0: UpdateResult) => void;
  }
) => {
  const { method } = req;
  const owner = "109860914175714638023";

  switch (method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const data = await db.collection("user").findOne({ userId: owner });
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
        const filter = { userId: owner };
        const update = { $set: { income: income } };
        const result = await db.collection("user").updateOne(filter, update);
        res.json({
          userId: owner,
          ...result,
          _id: new ObjectId(),
        });
      } catch (e) {
        console.error(e);
      }
  }
};
