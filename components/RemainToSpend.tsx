export default function RemainToSpend({
  remain,
}: {
  remain: { category: string; difference: number }[];
}) {
  return (
    <div>
      <ul className="divide-y divide-gray-400">
        <div>Remain To Spend</div>
        {remain.map((data) => (
          <li key={data.category} className="flex justify-between py-2">
            <span className="font-semibold">{data.category}:</span>
            <span>{data.difference}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
