import React, { useState } from "react";

const CreateStaff = () => {
  const [staffData, setStaffData] = useState({
    name: "",
    personal_number: "",
    date_of_birth: "",
    entry_in_service: "",
    length_of_service: "",
    designation: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true); // show confirmation popup
  };

  const confirmCreate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/staff/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staffData),
      });

      if (!response.ok) throw new Error("Failed to create staff");

      alert("✅ Staff created successfully!");
      setStaffData({
        name: "",
        personal_number: "",
        date_of_birth: "",
        entry_in_service: "",
        length_of_service: "",
        designation: "",
      });
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Staff
      </h1>

      {/* Staff Form */}
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
            value={staffData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Personal Number */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Personal Number
          </label>
          <input
            type="text"
            name="personal_number"
            value={staffData.personal_number}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* DOB & Entry in Service */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={staffData.date_of_birth}
              onChange={handleChange}
              required
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Entry in Service
            </label>
            <input
              type="date"
              name="entry_in_service"
              value={staffData.entry_in_service}
              onChange={handleChange}
              required
              className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Length of Service */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Length of Service
          </label>
          <input
            type="text"
            name="length_of_service"
            value={staffData.length_of_service}
            onChange={handleChange}
            required
            placeholder="e.g. 25 Years 09 Months 15 Days"
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={staffData.designation}
            onChange={handleChange}
            required
            className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Create Staff
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Staff Creation
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to create this staff record?
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

export default CreateStaff;
