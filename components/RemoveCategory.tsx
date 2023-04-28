import { deleteCategory } from "../modules/budgetData";
import { useRouter } from "next/router";

export default function RemoveCategory({ category }: { category: string }) {
  const router = useRouter();
  function handleSubmit() {
    deleteCategory(category);
    router.reload();
  }

  return (
    <div>
      <button onClick={() => handleSubmit()}>remove</button>
    </div>
  );
}
