import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { userId } = req.query;

  switch (method) {
    case "GET":
      try {
        // const client = await clientPromise;
        // const db = client.db("budget");
        // const result = await db.collection("user").insertOne(req.body);
        // res.send(result);
        break;
      } catch (e) {
        console.error(e);
      }
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const filter = { userId: userId };
        const { category } = req.body;
        const result = await db.collection("user").updateOne(filter, {
          $unset: { [`monthlyBudget.${category}`]: "" },
        });
        res.send(result);
        return;
      } catch (e) {
        console.error(e);
      }
  }
};
