import { useState } from "react";

const initialRows = { name: "example", making_cost: 1 };
export default function Home() {
  const [commission, setCommission] = useState(35);
  const [discount, setDiscount] = useState(10);
  const [rows, setRows] = useState([initialRows]);
  return (
    <div>
      {rows.map((row, i) => {
        return (
          <div key={row.name + i}>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                className="block w-full rounded-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
