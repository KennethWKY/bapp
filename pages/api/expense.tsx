import clientPromise from "../../lib/mongodb";
import { Document, InsertOneResult, ObjectId, WithId } from "mongodb";

export default async (
  req: { query?: any; body?: any; method?: any },
  res: {
    [x: string]: any;
    json: (arg0: WithId<Document>[]) => void;
    send: (arg0: InsertOneResult<Document>) => void;
  }
) => {
  const { method } = req;
  const owner = new ObjectId("64447d7069d35e23c1b2351c");

  switch (method) {
    //Get all expense in selected month
    case "GET":
      const params = new URLSearchParams(req.query);
      const month = params.get("month");
      if (!month) {
        return res.status(400).json({ error: "Missing 'month' parameter" });
      }
      const [mon, yearStr] = month.split(" ");
      const year = parseInt(yearStr);
      const monthLookup: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      const selectedMonth = new Date(year, monthLookup[mon]);
      const startDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1,
        0,
        0,
        0
      );
      const endDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth() + 1,
          0
        ).getDate(),
        23,
        59,
        59,
        999
      );
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const result = await db
          .collection("user_transaction_template")
          .find({
            owner,
            date: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
          })
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
        const { type, amount, descr } = req.body;
        const result = await db
          .collection("user_transaction_template")
          .insertOne({ owner, type, descr, amount, date });
        res.send(result);
      } catch (e) {
        console.error(e);
      }
  }
};
