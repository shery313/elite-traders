import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vendor: "",
    billNo: "",
    codeHead: "",
    fromDate: "",
    toDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/bills/");
      if (!response.ok) throw new Error("Failed to fetch bills");
      const data = await response.json();
      setBills(data.results);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredBills = bills.filter((bill) => {
    return (
      (filters.vendor === "" ||
        bill.vendor.toLowerCase().includes(filters.vendor.toLowerCase())) &&
      (filters.billNo === "" ||
        bill.billNo.toLowerCase().includes(filters.billNo.toLowerCase())) &&
      (filters.codeHead === "" ||
        bill.codeHead.toLowerCase().includes(filters.codeHead.toLowerCase())) &&
      (filters.fromDate === "" || new Date(bill.date) >= new Date(filters.fromDate)) &&
      (filters.toDate === "" || new Date(bill.date) <= new Date(filters.toDate))
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Bills List
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <input
            type="text"
            name="vendor"
            value={filters.vendor}
            onChange={handleFilterChange}
            placeholder="Vendor"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="billNo"
            value={filters.billNo}
            onChange={handleFilterChange}
            placeholder="Bill No"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="codeHead"
            value={filters.codeHead}
            onChange={handleFilterChange}
            placeholder="Code Head"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Bills Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Bill No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Code Head</th>
              <th className="p-3 text-left">Sanction Amount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  <VscLoading className="inline animate-spin"/>
                </td>
              </tr>
            ) : filteredBills.length > 0 ? (
              filteredBills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td
                    className="p-3 font-medium text-blue-600 hover:underline"
                    onClick={() => navigate(`/bills/${bill.id}`)}
                  >
                    {bill.bill_no}
                  </td>
                  <td className="p-3">{new Date(bill.date).toLocaleDateString("en-GB")}</td>
                  <td className="p-3">{bill.vendor.staff.name}-({bill.vendor.name})</td>
                  <td className="p-3">{bill.cd_head.code}</td>
                  <td className="p-3">Rs {Math.ceil(bill.sanction_amount)}</td>
                  <td className="p-3 text-center space-x-2">
                   
                    <button
                      onClick={() => navigate(`/bills/classification/${bill.id}`)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Classification
                    </button>
                     <button
                      onClick={() => navigate(`/bills/tr30/${bill.id}`)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      T.R-30
                    </button>
                    {
                      bill?.cd_head?.code=='A03403'&&
                  
                     <button
                      onClick={() => navigate(`/bills/consent-of-owner/${bill.id}`)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Consent
                    </button>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bills;
