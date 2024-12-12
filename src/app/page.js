"use client";
import { useCallback, useEffect, useState } from "react";
import Table from "./components/table";

const initialRows = { name: "", making_cost: null };
const fallbackData = [
  {
    name: "Red rice bowl!",
    making_cost: "120 INR",
    commission: "60 INR",
    discount: "24 INR",
    total: "204 INR",
  },
  // More people...
];
export default function Home() {
  const [commission, setCommission] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [rows, setRows] = useState([initialRows]);
  const [data, setData] = useState(fallbackData);

  const addData = useCallback(
    (item) => {
      // CALCULATE COMISSION
      const price = item.making_cost;
      const comissionRate = commission / 100;
      const spc = price / (1 - comissionRate);
      const commissionAmount = spc - price;

      // CALCULATE DISCOUNT
      const discountRate = discount / 100;
      const spcd = spc / (1 - discountRate);
      const discountAmount = spcd - spc;
      return { ...item, spc, commissionAmount, spcd, discountAmount };
    },
    [commission, discount]
  );

  useEffect(() => {
    if (rows.length) {
      const data = rows
        .filter((item) => item.name && item.making_cost)
        .map((item) => addData(item));
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, commission, discount, addData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [name]: value } : row))
    );
  };

  return (
    <div className="m-3">
      <h2 className="mt-5 text-gray-900">
        <b>DEDUCTIONS</b>
      </h2>
      <div style={{ display: "flex" }}>
        <div>
          <div className="mt-2 mr-2">
            <div className="flex items-center bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                Commission:
              </div>
              <input
                id="company-website"
                name="company-website"
                type="number"
                placeholder="Percentage"
                onChange={(e) => setCommission(e.target.value)}
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-2">
            <div className="flex items-center bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                Discount:
              </div>
              <input
                id="compan"
                name="company-website"
                type="number"
                placeholder="Percentage"
                onChange={(e) => setDiscount(e.target.value)}
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 text-gray-900">
        <b>ITEM LIST</b>
      </h2>
      {rows.map((row, i) => (
        <div key={i}>
          <div className="mt-2" style={{ display: "flex" }}>
            <input
              name="name"
              value={row.name}
              onChange={(e) => handleChange(e, i)}
              type="text"
              placeholder="Item name"
              className="block w-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mr-1"
            />
            <input
              name="making_cost"
              value={row.making_cost}
              onChange={(e) => handleChange(e, i)}
              type="number"
              placeholder="Making cost"
              className="block mr-2 w-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              name="discount"
              value={discount}
              onChange={(e) => handleChange(e, i)}
              type="number"
              placeholder="Discount"
              disabled
              className="block w-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setRows((prevRows) => [...prevRows, { name: "", making_cost: null }])
        }
        className="mt-2 inline-flex items-center gap-x-1.5 rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        ADD ITEM
      </button>
      <Table data={data} />
    </div>
  );
}
