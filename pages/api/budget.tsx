import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Document, UpdateResult, WithId } from "mongodb";

export default async (
  req: {
    [x: string]: any;
    query?: any;
    body?: any;
    method?: any;
  },
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
    // Add monthly categary and target
    case "POST":
      try {
        const client = await clientPromise;
        const params = new URLSearchParams(req.query);
        const db = client.db("budget");
        const userId = params.get("userId");
        const { type, amount } = req.body;
        const filter = { userId: userId };
        const update = { $set: { [`monthlyBudget.${type}`]: amount } };
        const result = await db.collection("user").updateOne(filter, update);
        res.send(result);
        return;
      } catch (e) {
        console.error(e);
      }
    case "DELETE":
      try {
        const client = await clientPromise;
        const params = new URLSearchParams(req.query);
        const db = client.db("budget");
        const userId = params.get("userId");
        const filter = { userId: userId };
        const { type } = req.body;
        const result = await db.collection("user").updateOne(filter, {
          $unset: { [`monthlyBudget.${type}`]: "" },
        });
        res.send(result);
        return;
      } catch (e) {
        console.error(e);
      }
  }
};
