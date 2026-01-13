import { useState } from "react";

const TransactionsPage = ({ transaction, setTransaction, balance, setBalance }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const formatAmount = (amt) => {
    const absAmount = Math.abs(amt);
    return amt < 0 ? `-£${absAmount}` : `£${absAmount}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericAmount = Math.abs(Number(amount));
    if (!numericAmount) return;

    const signedAmount = type === "expense" ? -numericAmount : numericAmount;

    const newTx = {
      id: crypto.randomUUID(),
      amount: signedAmount,
      category: type === "expense" ? category : "income",
      location,
      date,
    };

    setTransaction((prev) => [newTx, ...prev]);
    setBalance((prev) => prev + signedAmount);

    setOpenAdd(false);
    setType("expense");
    setAmount("");
    setCategory("");
    setLocation("");
    setDate(new Date().toISOString().slice(0, 10));
  };

  if (openAdd) {
    return (
      <div className="fixed inset-0 bg-[#C1CB79] flex items-center justify-center">
        <div className="bg-white rounded-lg text-center w-[360px] p-6">
          <p className="font-bold text-lg mb-4">ADD TRANSACTION</p>

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div>
              <label className="block">Type</label>
              <select
                className="border p-2 rounded w-full"
                value={type}
                onChange={(e) => {
                  const nextType = e.target.value;
                  setType(nextType);
                  if (nextType !== "expense") setCategory("");
                }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block">Amount</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {type === "expense" && (
              <div>
                <label className="block">Category</label>
                <select
                  required
                  className="border p-2 rounded w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="food">Food</option>
                  <option value="savings">Savings</option>
                  <option value="travel">Travel</option>
                  <option value="miscellaneous">Miscellaneous</option>
                  <option value="shopping">Shopping</option>
                  <option value="bills">Bills</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            )}

            <div>
              <label className="block">Location</label>
              <input
                className="border p-2 rounded w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. savings 1"
              />
            </div>

            <div>
              <label className="block">Date</label>
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button className="w-full px-4 py-2 rounded bg-black text-white" type="submit">
              Save
            </button>

            <button
              type="button"
              className="w-full px-4 py-2 rounded border"
              onClick={() => setOpenAdd(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-screen bg-[#C1CB79] rounded-lg p-4">
          <div className="bg-white rounded-lg text-center p-6">
            <div className="text-center">balance</div>
            <div className="mt-5 text-3xl">{formatAmount(balance)}</div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">transactions</p>
              <button
                onClick={() => {
                  setType("expense");
                  setAmount("");
                  setCategory("");
                  setLocation("");
                  setDate(new Date().toISOString().slice(0, 10));
                  setOpenAdd(true);
                }}
                className="px-3 py-2 rounded bg-black text-white"
              >
                add +
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {transaction.map((tx) => (
                <div key={tx.id} className="bg-white rounded-lg p-3 flex justify-between">
                  <div>
                    <div className="font-medium">{tx.category || "uncategorized"}</div>
                    <div className="text-xs text-gray-600">
                      {tx.location || "-"} • {tx.date}
                    </div>
                  </div>
                  <div className={`font-bold ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    {formatAmount(tx.amount)}
                  </div>
                </div>
              ))}

              {transaction.length === 0 && (
                <div className="text-sm text-gray-700">No transactions yet.</div>
              )}
            </div>
          </div>
        </div>

        <div>2</div>
      </div>
    </div>
  );
};

export default TransactionsPage;
