import { useState, useEffect } from "react";

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("easypaisa");
  const [accountInfo, setAccountInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(2500);

  // Mock withdrawal history data
  const mockWithdrawHistory = [
    {
      id: 1,
      amount: 500,
      method: "EasyPaisa",
      status: "completed",
      date: "2024-01-15",
      transactionId: "TX123456"
    },
    {
      id: 2,
      amount: 1000,
      method: "JazzCash",
      status: "pending",
      date: "2024-01-16",
      transactionId: "TX123457"
    },
    {
      id: 3,
      amount: 300,
      method: "Bank Transfer",
      status: "completed",
      date: "2024-01-10",
      transactionId: "TX123458"
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch withdrawal history
    setWithdrawHistory(mockWithdrawHistory);
  }, []);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    
    if (!withdrawAmount || !accountInfo) {
      alert("Please fill all fields");
      return;
    }

    if (parseFloat(withdrawAmount) > availableBalance) {
      alert("Insufficient balance");
      return;
    }

    if (parseFloat(withdrawAmount) < 10) {
      alert("Minimum withdrawal amount is $10");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to withdrawal history
      const newWithdrawal = {
        id: withdrawHistory.length + 1,
        amount: parseFloat(withdrawAmount),
        method: paymentMethod,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        transactionId: `TX${Date.now()}`
      };

      setWithdrawHistory([newWithdrawal, ...withdrawHistory]);
      setAvailableBalance(prev => prev - parseFloat(withdrawAmount));
      
      alert("Withdrawal request submitted successfully!");
      setWithdrawAmount("");
      setAccountInfo("");
    } catch (error) {
      alert("Withdrawal failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "pending": return "text-yellow-400";
      case "failed": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "completed": return "bg-green-400/10 border-green-400";
      case "pending": return "bg-yellow-400/10 border-yellow-400";
      case "failed": return "bg-red-400/10 border-red-400";
      default: return "bg-gray-400/10 border-gray-400";
    }
  };

  const paymentMethods = [
    {
      id: "easypaisa",
      name: "EasyPaisa",
      description: "Instant withdrawal to your EasyPaisa account",
      icon: "📱",
      minAmount: 10,
      maxAmount: 50000,
      processingTime: "1-2 hours"
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Quick withdrawal to your JazzCash account",
      icon: "💳",
      minAmount: 10,
      maxAmount: 50000,
      processingTime: "1-2 hours"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct transfer to your bank account",
      icon: "🏦",
      minAmount: 50,
      maxAmount: 100000,
      processingTime: "24-48 hours"
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Withdraw in Bitcoin, Ethereum, or USDT",
      icon: "₿",
      minAmount: 20,
      maxAmount: 50000,
      processingTime: "2-4 hours"
    }
  ];

  const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Withdraw Funds
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Quickly and securely withdraw your earnings to your preferred payment method
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Withdraw Form */}
          <div className="space-y-8">
            {/* Balance Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-3xl font-bold text-green-400">
                    ${availableBalance.toLocaleString()}
                  </div>
                  <div className="text-gray-400">Available for withdrawal</div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-gray-300">Total Profit</div>
                  <div className="text-xl font-semibold text-blue-400">$4,200</div>
                </div>
              </div>
            </div>

            {/* Withdraw Form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Withdraw Funds</h2>
              
              <form onSubmit={handleWithdrawSubmit} className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pl-8 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:outline-none"
                      placeholder="Enter amount"
                      min={selectedMethod?.minAmount}
                      max={selectedMethod?.maxAmount}
                      required
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Min: ${selectedMethod?.minAmount}</span>
                    <span>Max: ${selectedMethod?.maxAmount?.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-gray-300 mb-3 font-semibold">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          paymentMethod === method.id
                            ? "border-green-400 bg-green-400/10"
                            : "border-gray-600 bg-gray-700 hover:border-gray-500"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{method.icon}</span>
                          <span className="font-semibold">{method.name}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {method.processingTime}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    {paymentMethod === "easypaisa" || paymentMethod === "jazzcash"
                      ? "Phone Number"
                      : paymentMethod === "bank"
                      ? "Bank Account Details"
                      : "Wallet Address"}
                  </label>
                  <input
                    type="text"
                    value={accountInfo}
                    onChange={(e) => setAccountInfo(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:outline-none"
                    placeholder={
                      paymentMethod === "easypaisa" || paymentMethod === "jazzcash"
                        ? "Enter your phone number"
                        : paymentMethod === "bank"
                        ? "Enter bank account number"
                        : "Enter cryptocurrency wallet address"
                    }
                    required
                  />
                </div>

                {/* Method Details */}
                {selectedMethod && (
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{selectedMethod.icon}</span>
                      <h4 className="font-semibold">{selectedMethod.name} Details</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{selectedMethod.description}</p>
                    <div className="text-xs text-gray-400">
                      Processing time: {selectedMethod.processingTime}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-400 text-black font-bold py-4 rounded-lg hover:bg-blue-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Processing Withdrawal...
                    </div>
                  ) : (
                    "Withdraw Funds"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Withdrawal History */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <div className="text-2xl font-bold text-green-400">
                  ${withdrawHistory.filter(w => w.status === "completed").reduce((sum, w) => sum + w.amount, 0)}
                </div>
                <div className="text-gray-400 text-sm">Total Withdrawn</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {withdrawHistory.filter(w => w.status === "pending").length}
                </div>
                <div className="text-gray-400 text-sm">Pending Requests</div>
              </div>
            </div>

            {/* Withdrawal History */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Withdrawal History</h2>
              
              {withdrawHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No withdrawal history found
                </div>
              ) : (
                <div className="space-y-4">
                  {withdrawHistory.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className={`p-4 rounded-lg border ${getStatusBg(withdrawal.status)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold">${withdrawal.amount}</div>
                          <div className="text-sm text-gray-400">{withdrawal.method}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getStatusColor(withdrawal.status)}`}>
                            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                          </div>
                          <div className="text-sm text-gray-400">{withdrawal.date}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Transaction ID: {withdrawal.transactionId}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-400/10 border border-yellow-400 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                Important Information
              </h3>
              <ul className="space-y-2 text-sm text-yellow-300/80">
                <li>• Withdrawals are processed within 24 hours on business days</li>
                <li>• Minimum withdrawal amount is $10</li>
                <li>• Ensure your account information is correct</li>
                <li>• Contact support if your withdrawal is pending for more than 48 hours</li>
                <li>• Transaction fees may apply depending on the payment method</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;