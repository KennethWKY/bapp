export default function RemainToSpend({
  remain,
}: {
  remain: { category: string; difference: number }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Remain To Spend</h2>
      <ul className="divide-y divide-gray-400">
        {remain.map((data) => (
          <li key={data.category} className="flex justify-between py-2 ">
            <span className="font-semibold">{data.category}:</span>
            <span>$ {data.difference}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
