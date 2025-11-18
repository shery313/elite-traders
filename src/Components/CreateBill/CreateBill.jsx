import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBill = () => {
  const [billData, setBillData] = useState({
    vendor: "",
    bill_no: "",
    date: "",
    cd_head: "",
    sanction_amount: "",
    rent_per_month: "",
    rent_months: "",
    rent_days: "",
  });

  const [codeHeads, setCodeHeads] = useState([]); 
  const [vendors, setVendors] = useState([]); 
  const [selectedCode, setSelectedCode] = useState(""); 

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch vendors and code heads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chRes, vRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/code-heads/"),
          axios.get("http://127.0.0.1:8000/api/vendors/"),
        ]);
        setCodeHeads(chRes.data.results || chRes.data);
        setVendors(vRes.data.results || vRes.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillData({ ...billData, [name]: value });

    if (name === "cd_head") {
      const selected = codeHeads.find((c) => String(c.id) === value);
      setSelectedCode(selected ? selected.code : "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmCreate = async () => {
    setLoading(true);
    try {
      const payload = {
        vendor: billData.vendor ? Number(billData.vendor) : null,
        bill_no: billData.bill_no,
        date: billData.date,
        cd_head: billData.cd_head ? Number(billData.cd_head) : null,
        sanction_amount:
          selectedCode === "A03403"
            ? 0
            : billData.sanction_amount
            ? parseFloat(billData.sanction_amount)
            : 0,
        rent_per_month:
          selectedCode === "A03403" && billData.rent_per_month
            ? parseFloat(billData.rent_per_month)
            : null,
        rent_months:
          selectedCode === "A03403" && billData.rent_months
            ? Number(billData.rent_months)
            : null,
        rent_days:
          selectedCode === "A03403" && billData.rent_days
            ? Number(billData.rent_days)
            : null,
      };
      console.log(payload)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bills/",
        payload
      );

      alert("✅ Bill created successfully!");
      setBillData({
        vendor: "",
        bill_no: "",
        date: "",
        cd_head: "",
        sanction_amount: "",
        rent_per_month: "",
        rent_months: "",
        rent_days: "",
      });
    } catch (error) {
      console.error("❌ Bill creation errors:", error.response?.data || error.message);
      alert("❌ Error: " + JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Bill
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-gray-200"
      >
        {/* Vendor */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Vendor
          </label>
          <select
            name="vendor"
            value={billData.vendor}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.vendor_no})
              </option>
            ))}
          </select>
        </div>

        {/* Bill No & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Bill No.
            </label>
            <input
              type="text"
              name="bill_no"
              value={billData.bill_no}
              onChange={handleChange}
              required
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={billData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Code Head */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Code Head
          </label>
          <select
            name="cd_head"
            value={billData.cd_head}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Select Code Head --</option>
            {codeHeads.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.name} ({ch.code})
              </option>
            ))}
          </select>
        </div>

        {/* Conditionally show fields */}
        {selectedCode === "A03403" ? (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Rent Per Month
              </label>
              <input
                type="number"
                name="rent_per_month"
                value={billData.rent_per_month}
                onChange={handleChange}
                step="0.01"
                className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Rent Months
              </label>
              <input
                type="number"
                name="rent_months"
                value={billData.rent_months}
                onChange={handleChange}
                className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Rent Days
              </label>
              <input
                type="number"
                name="rent_days"
                value={billData.rent_days}
                onChange={handleChange}
                className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Sanction Amount
            </label>
            <input
              type="number"
              name="sanction_amount"
              value={billData.sanction_amount}
              onChange={handleChange}
              step="0.01"
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Create Bill
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Bill</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to create this bill?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmCreate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBill;
