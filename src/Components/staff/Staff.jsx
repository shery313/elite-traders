import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff(page, search);
  }, [page, search]);

  const fetchStaff = async (pageNum = 1, searchQuery = "") => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/staff/", {
        params: { page: pageNum, search: searchQuery },
      });

      setStaffList(response.data.results); // DRF pagination sends {results, count, next, previous}
      setTotalPages(Math.ceil(response.data.count / 10) || 1); // assuming page size = 10
    } catch (error) {
      console.error("❌ Error fetching staff:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.designation.toLowerCase().includes(search.toLowerCase()) ||
      staff.personal_number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Staff List
      </h1>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page when searching
          }}
          className="border border-gray-300 p-2 rounded-lg w-64"
        />
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Personal No</th>
              <th className="p-3 text-left">Force Number</th>
              <th className="p-3 text-left">Date of Birth</th>
              <th className="p-3 text-left">Date of Joining</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  <VscLoading className='inline animate-spin'/>
                </td>
              </tr>
            ) : filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/staff/${staff.id}`)}
                >
                  <td className="p-3 font-medium text-blue-600 hover:underline">
                    {staff.name}
                  </td>
                  <td className="p-3">{staff.designation}</td>
                  <td className="p-3">{staff.personal_number}</td>
                  <td className="p-3">{staff.force_no || "-"}</td>
                  <td className="p-3">{staff.date_of_birth || "-"}</td>
                  <td className="p-3">{staff.entry_in_service || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded-lg border disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded-lg border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Staff;
