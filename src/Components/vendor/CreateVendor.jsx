import React, { useState, useEffect } from "react";

const CreateVendor = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    staff: "",
    vendor_no: "",
    cnic: "",
    bank_name: "",
    bank_branch: "",
    branch_code: "",
    account_number: "",
    bank_address: "",
    iban: "",
    mobile: "",
    email: "",
    ntn_no: "",
    filer: false,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // staff search state
  const [staffList, setStaffList] = useState([]);
  const [staffSearch, setStaffSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (staffSearch.length > 1) {
      fetchStaff(staffSearch);
    } else {
      setStaffList([]);
    }
  }, [staffSearch]);

  const fetchStaff = async (query) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/staff/?search=${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch staff");
      const data = await response.json();
      setStaffList(data.results || data); // support DRF paginated or non-paginated
      setShowDropdown(true);
    } catch (error) {
      console.error("❌ Error fetching staff:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVendorData({
      ...vendorData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vendors/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) throw new Error("Failed to create vendor");

      alert("✅ Vendor created successfully!");
      setVendorData({
        name: "",
        staff: "",
        vendor_no: "",
        cnic: "",
        bank_name: "",
        bank_branch: "",
        branch_code: "",
        account_number: "",
        bank_address: "",
        iban: "",
        mobile: "",
        email: "",
        ntn_no: null,
        filer: false,
      });
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Vendor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-gray-200"
      >
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={vendorData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Staff Searchable Dropdown */}
        <div className="relative">
          <label className="block font-semibold text-gray-700 mb-1">
            Staff
          </label>
          <input
            type="text"
            name="staff"
            value={staffSearch || vendorData.staff}
            onChange={(e) => setStaffSearch(e.target.value)}
            placeholder="Type staff name to search..."
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {showDropdown && staffList.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 w-full max-h-48 overflow-y-auto rounded-lg shadow-lg mt-1">
              {staffList.map((staff) => (
                <li
                  key={staff.id}
                  onClick={() => {
                    setVendorData({ ...vendorData, staff: staff.id });
                    setStaffSearch(staff.name);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {staff.name} – {staff.designation} ({staff.personal_number})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vendor No / CNIC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Vendor No.
            </label>
            <input
              type="text"
              name="vendor_no"
              value={vendorData.vendor_no}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={vendorData.cnic}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Bank Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              value={vendorData.bank_name}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Bank Branch
            </label>
            <input
              type="text"
              name="bank_branch"
              value={vendorData.bank_branch}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Branch Code & Account No */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Branch Code
            </label>
            <input
              type="text"
              name="branch_code"
              value={vendorData.branch_code}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="account_number"
              value={vendorData.account_number}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Bank Address & IBAN */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Bank Address
          </label>
          <input
            type="text"
            name="bank_address"
            value={vendorData.bank_address}
            onChange={handleChange}
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">IBAN</label>
          <input
            type="text"
            name="iban"
            value={vendorData.iban}
            onChange={handleChange}
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={vendorData.mobile}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={vendorData.email}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* NTN & Filer */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              NTN No.
            </label>
            <input
              type="number"
              name="ntn_no"
              value={vendorData.ntn_no}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="filer"
              checked={vendorData.filer}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Filer</label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Create Vendor
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Vendor Creation
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to create this vendor?
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

export default CreateVendor;
