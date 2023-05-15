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
  // const owner = "109860914175714638023";

  switch (method) {
    case "GET":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const params = new URLSearchParams(req.query);
        const userId = params.get("userId");
        const data = await db.collection("user").findOne({ userId: userId });
        if (data) {
          res.json(data.income);
        } else {
          console.log("income is null");
        }
        return;
      } catch (e) {
        console.error(e);
      }
    // Change monthly income
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const params = new URLSearchParams(req.query);
        const userId = params.get("userId");
        const { income } = JSON.parse(req.body);
        const filter = { userId: userId };
        const update = { $set: { income: parseFloat(income) } };
        const result = await db.collection("user").updateOne(filter, update);
        res.json({
          userId: userId,
          ...result,
          _id: new ObjectId(),
        });
        return;
      } catch (e) {
        console.error(e);
      }
  }
};
