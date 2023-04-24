interface User {
  _id?: string; // ObjectId in MongoDB, but we can use string here
  username: string;
  monthlyBudget: MonthlyBudget;
  transactions: Transaction[];
}
