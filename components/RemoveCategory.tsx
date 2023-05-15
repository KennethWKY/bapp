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
      <button
        onClick={() => handleSubmit()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded"
      >
        remove
      </button>
    </div>
  );
}
