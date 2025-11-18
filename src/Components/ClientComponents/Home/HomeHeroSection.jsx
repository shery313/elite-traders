import { useState } from "react";
import etimg from "../../../assets/et.jpg";
import filer from "../../../assets/filer_image.png";
import reg from "../../../assets/registration.png";

const HomeHeroSection = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleDeposit = (e) => {
    e.preventDefault();
    // Handle deposit logic here
    console.log(`Depositing $${amount} via ${paymentMethod}`);
    setShowDepositModal(false);
    setAmount("");
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    // Handle withdraw logic here
    console.log(`Withdrawing $${amount} via ${paymentMethod}`);
    setShowWithdrawModal(false);
    setAmount("");
  };

  return (
    <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Invest Smarter with  
            <span className="text-green-400"> Elite Trader</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Your all-in-one investment platform for stocks, crypto, forex and global markets.
            Track. Analyze. Grow your wealth confidently.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => setShowDepositModal(true)}
              className="px-6 py-3 bg-green-400 text-black font-semibold rounded-md hover:bg-green-300 transition"
            >
              Quick Deposit
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-6 py-3 bg-blue-400 text-black font-semibold rounded-md hover:bg-blue-300 transition"
            >
              Withdraw Funds
            </button>
          </div>

          {/* WhatsApp Community */}
          <div className="pt-4">
            <a
              href="https://chat.whatsapp.com/L7v1SIN6IImLYhnF0trvfs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.495 3.09"/>
              </svg>
              Join Our WhatsApp Community
            </a>
          </div>
        </div>

        {/* Right Graphic / Image */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <img 
            src={etimg} 
            alt="Elite Trader Platform" 
            className="w-72 md:w-96 h-72 md:h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-xl opacity-90 shadow-2xl animate-pulse" 
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Powerful Investment Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Deposits</h3>
            <p className="text-gray-300">Fund your account instantly with multiple payment methods</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Analytics</h3>
            <p className="text-gray-300">Real-time market data and advanced trading tools</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Withdrawals</h3>
            <p className="text-gray-300">Quick and secure withdrawal process to your preferred method</p>
          </div>
        </div>

        {/* Trust & Legal Verification Section */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Trust & Legal Verification
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FBR Certificate */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              FBR Tax Filer Certificate
            </h3>
            <p className="text-gray-300 mb-4">
              Elite Trader Company is officially registered as a tax filer with the 
              Federal Board of Revenue (FBR). Our tax status ensures transparency 
              and compliance with national regulations.
            </p>
            <img src={filer} className="w-full h-80 bg-gray-700 rounded-md object-cover" alt="FBR Certificate" />
          </div>

          {/* Company Registration */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Company Registration
            </h3>
            <p className="text-gray-300 mb-4">
              Our company is legally registered and recognized by national authorities. 
              All operations follow official compliance, licensing, and verification standards.
            </p>
            <img src={reg} alt="Company Registration" className="w-full h-80 bg-gray-700 rounded-md object-cover" />
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Deposit Funds</h3>
            <form onSubmit={handleDeposit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="jazzcash">JazzCash</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-400 text-black py-2 rounded hover:bg-green-300"
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Withdraw Funds</h3>
            <form onSubmit={handleWithdraw}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Withdrawal Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="easypaisa">EasyPaisa</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-400 text-black py-2 rounded hover:bg-blue-300"
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeHeroSection;