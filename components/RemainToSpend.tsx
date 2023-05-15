export default function RemainToSpend({
  remain,
}: {
  remain: { category: string; difference: number; target: number }[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Remain To Spend</h2>
      <ul className="divide-y divide-gray-400">
        {remain.map((data) => (
          <li key={data.category} className="py-2">
            <div className="flex justify-between py-2 ">
              <span className="font-semibold pr-2">{data.category}:</span>
              <div className="pl-2 text-right">${data.difference}</div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="bg-white h-2 rounded-full w-full">
                {(data.difference / data.target) * 100 >= 0 ? (
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${(data.difference / data.target) * 100}%`,
                      transform: "scaleX(-1)",
                    }}
                  ></div>
                ) : (
                  <div className="h-full bg-red-500 rounded-full"></div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
