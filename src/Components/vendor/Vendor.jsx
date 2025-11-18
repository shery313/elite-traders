import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/vendors/");
      if (!response.ok) throw new Error("Failed to fetch vendors");
      const data = await response.json();
      setVendors(data.results);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.vendorNo.toLowerCase().includes(search.toLowerCase()) ||
      vendor.cnic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Vendors List
      </h1>

      {/* Search */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-64"
        />
      </div>

      {/* Vendors Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Vendor Name</th>
              <th className="p-3 text-left">Vendor No</th>
              <th className="p-3 text-left">CNIC</th>
              <th className="p-3 text-left">Bank Name & Branch</th>
              <th className="p-3 text-left">Account Number</th>
              <th className="p-3 text-left">IBAN</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 animate-spin">
                  <VscLoading  className="inline animate-ring "/>
                </td>
              </tr>
            ) : filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/vendors/${vendor.id}`)}
                >
                  <td className="p-3 font-medium text-blue-600 hover:underline">
                    {vendor.name}
                  </td>
                  <td className="p-3">{vendor.vendor_no}</td>
                  <td className="p-3">{vendor.cnic}</td>
                  <td className="p-3">  {vendor.bank_name}-( {vendor.branch_code} )</td>
                  <td className="p-3">{vendor.account_number}</td>
                  <td className="p-3">{vendor.iban}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
