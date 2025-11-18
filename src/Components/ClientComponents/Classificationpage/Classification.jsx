import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Classification() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/bills/${id}/`);
        setBill(response.data);
      } catch (error) {
        console.error("Error fetching bill:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  if (loading) {
    return <p className="text-center p-6">Loading bill...</p>;
  }

  if (!bill) {
    return <p className="text-center p-6 text-red-500">Bill not found.</p>;
  }

  return (
    <>
      <div className="p-2 md:p-3 text-xs leading-tight print:p-2 print:text-[10px]">
        <h1 className="text-center text-xl md:text-2xl font-bold underline mb-2">
          IB-3782
        </h1>
        <div className="border border-gray-800 p-2 md:p-3">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-2">
            <p className="underline font-bold text-xs">PRE-AUDIT SECTION</p>
            <div className="text-xs">
              <div className="flex gap-2">
                <p className="font-bold">Bill No.</p>
                <p className="font-bold">ISL/{bill.bill_no}/ASF</p>
              </div>
              <div className="flex gap-2 mt-1">
                <p className="font-bold">Dated:</p>
                <p className="font-bold">
                  {new Date(bill.date).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>

          {/* Ministry/Division Section */}
          <div className="flex flex-wrap items-center gap-1 mb-2 text-xs">
            <p className="font-bold whitespace-nowrap">
              Ministry/Division/Department:
            </p>
            <p>Cabinet/Aviation Division/ASF IIAP Islamabad</p>
          </div>

          {/* Personal Number and TA Section */}
          <section className="flex justify-between mb-2">
            <div className="border border-gray-800 flex items-center h-fit w-[320px]">
              <p className="w-1/2 text-center py-0.5 font-bold border-r border-gray-800 text-[11px]">
                Personal number
              </p>
              <p className="w-1/2 text-center py-0.5 text-[11px]">
                {bill.vendor?.staff?.personal_number || "________"}
              </p>
            </div>
            <div className="border border-gray-800 inline-flex items-end justify-end">
              <h1 className="text-lg md:text-3xl font-bold p-1">TA-VIII</h1>
            </div>
          </section>

          {/* Main Details Section */}
          <section className="flex justify-between mb-2">
            <table className="w-2/3 text-[11px]">
              <tbody>
                <tr>
                  <td className="font-bold pr-1 align-top w-32">1 DEMAND NO:</td>
                  <td>
                    <div className="flex">
                      {["0", "3", "0"].map((d, i) => (
                        <div
                          key={i}
                          className="border border-gray-800 w-5 h-5 flex items-center justify-center text-[10px]"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">2 VOUCHER NO:</td>
                  <td className="border border-gray-800 h-5"></td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">3 VENDOR NO:</td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.vendor_no || "________"}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">4 NAME OF PAYEE'S</td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.name || "________"}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    5 BANK NAME AND BRANCH:
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.bank_name} {bill.vendor?.bank_branch}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    6 BANK / BRANCH CODE
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.branch_code}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    7 BANK ACCOUNT NUMBER
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.account_number}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">8 IBAN NUMBER:</td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.iban}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    9 GST / CNIC NUMBER:
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.cnic}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">10 DDO CODE:</td>
                  <td className="border border-gray-800 h-5 pl-1">IB-3782</td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    11 MOBILE # OF PAYEE:
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.mobile}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    12 MOBILE # OF DDO:
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    0301-6000926
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    13 EMAIL ID OF PAYEE / VENDOR
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    {bill.vendor?.email}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold pr-1 align-top">
                    14 EMAIL ID OF DDO:
                  </td>
                  <td className="border border-gray-800 h-5 pl-1">
                    ddoib3782@gmail.com
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="border border-gray-800 w-1/5 flex flex-col items-center justify-center p-1 text-[10px]">
              <p className="text-center font-bold">Space for Token</p>
              <p className="text-center text-[9px]">(For Use in AGPR)</p>
              <p className="text-center mt-1">Token no.</p>
              <div className="border border-gray-800 w-full h-16 mt-1"></div>
            </div>
          </section>

          {/* Payments and Deductions Table */}
          <section className="mb-2">
            <table className="w-[420px] border-collapse border border-gray-800 text-[11px]">
              <thead>
                <tr>
                  <th className="border border-gray-800 p-1 text-left" colSpan={2}>
                    PAYMENTS
                  </th>
                  <th className="border border-gray-800 p-1 text-left" colSpan={2}>
                    DEDUCTIONS
                  </th>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-1 font-bold">
                    Minor Object
                  </td>
                  <td className="border border-gray-800 p-1 font-bold">Amount</td>
                  <td className="border border-gray-800 p-1 font-bold">Minor</td>
                  <td className="border border-gray-800 p-1 font-bold">Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 p-1">
                    {bill.cd_head?.code}
                  </td>
                  <td className="border border-gray-800 p-1">
                    {bill.sanction_amount}
                  </td>
                  <td className="border border-gray-800 p-1">Tax</td>
                  <td className="border border-gray-800 p-1">{bill.tax}</td>
                </tr>
                {[...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td className="border border-gray-800 p-1 h-4"></td>
                    <td className="border border-gray-800 p-1 h-4"></td>
                    <td className="border border-gray-800 p-1 h-4"></td>
                    <td className="border border-gray-800 p-1 h-4"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Totals Section */}
          <section className="mb-2 text-[11px]">
            <div className="flex flex-wrap gap-2 mb-1">
              <div className="flex items-center">
                <p className="font-bold mr-1">Grand Total:</p>
                <div className="border border-gray-800 px-1 py-0.5 font-bold w-fit">
                  Rs. {bill.sanction_amount}
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold mr-1">Total Ded RS:</p>
                <div className="border border-gray-800 px-1 py-0.5 font-bold">
                  Rs. {bill.tax}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <p className="font-bold mr-1 border border-gray-800 px-6 py-0.5">
                Net Payable:
              </p>
              <p className="font-bold border border-gray-800 w-fit px-2 py-0.5 ">
                {bill.net_amount}
              </p>
            </div>
          </section>

          {/* Certificate and Signatures */}
          <section className="text-[11px]">
            <p className="font-bold mb-2">
              Certificate: It is certified that IBAN, Vendor and Phone number is
              updated in SAPs system of AGPR.
            </p>

            <div className="flex flex-col items-center mb-1 mt-10 gap-5">
              <p className="font-bold mb-1">Signature DDO</p>
              <div className="border-b border-gray-800 w-40 h-5"></div>
            </div>

            <div className="flex flex-col items-center mt-10 gap-5">
              <p className="font-bold mb-1">Stamp DDO</p>
              <div className="border-b border-gray-800 w-40 h-5"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
