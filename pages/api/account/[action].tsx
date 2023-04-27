import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;

  switch (action) {
    case "create":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const result = db.collection("user").insertOne(req.body);
        res.send(result);
        break;
      } catch (e) {
        console.error(e);
      }
    case "exist":
      try {
        const client = await clientPromise;
        const db = client.db("budget");
        const result = await db
          .collection("user")
          .findOne({ userId: req.query.userId });
        res.json({ result });
        break;
      } catch (e) {
        console.error(e);
      }
  }
};
