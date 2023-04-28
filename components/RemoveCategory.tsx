import { deleteCategory } from "../modules/budgetData";

export default function RemoveCategory({ category }) {
  function handleSubmit() {
    deleteCategory(category);
  }

  return (
    <div>
      <button onClick={() => handleSubmit()}>Remove</button>
    </div>
  );
}
