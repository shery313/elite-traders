import { useState, useEffect } from "react";

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("easypaisa");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(2500);

  // Mock deposit history data
  const mockDepositHistory = [
    {
      id: 1,
      amount: 500,
      method: "EasyPaisa",
      status: "completed",
      date: "2024-01-15",
      transactionId: "DEP123456",
      plan: "Starter Plan"
    },
    {
      id: 2,
      amount: 1000,
      method: "JazzCash",
      status: "pending",
      date: "2024-01-16",
      transactionId: "DEP123457",
      plan: "Professional Plan"
    },
    {
      id: 3,
      amount: 2000,
      method: "Bank Transfer",
      status: "completed",
      date: "2024-01-10",
      transactionId: "DEP123458",
      plan: "Elite Plan"
    }
  ];

  // Investment plans
  const investmentPlans = [
    {
      id: "starter",
      name: "Starter Plan",
      minAmount: 100,
      maxAmount: 1000,
      dailyProfit: "1.5%",
      duration: "30 days",
      features: ["Basic Support", "Email Alerts"]
    },
    {
      id: "professional",
      name: "Professional Plan",
      minAmount: 1000,
      maxAmount: 5000,
      dailyProfit: "2.2%",
      duration: "60 days",
      features: ["Priority Support", "Trading Signals"]
    },
    {
      id: "elite",
      name: "Elite Plan",
      minAmount: 5000,
      maxAmount: 50000,
      dailyProfit: "3.5%",
      duration: "90 days",
      features: ["24/7 Support", "Personal Manager"]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState("starter");

  useEffect(() => {
    // Simulate API call to fetch deposit history
    setDepositHistory(mockDepositHistory);
  }, []);

  const paymentMethods = [
    {
      id: "easypaisa",
      name: "EasyPaisa",
      description: "Instant deposit via EasyPaisa",
      icon: "📱",
      instructions: "Send money to 0312-3456789 and enter transaction ID",
      accountInfo: "0312-3456789",
      minAmount: 10
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Quick deposit via JazzCash",
      icon: "💳",
      instructions: "Send money to 0300-1234567 and enter transaction ID",
      accountInfo: "0300-1234567",
      minAmount: 10
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct bank transfer",
      icon: "🏦",
      instructions: "Transfer to Account# 12345678901, IBAN: PKXYZ0123456789",
      accountInfo: "MCB Bank - Account# 12345678901",
      minAmount: 50
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Deposit using Bitcoin, Ethereum, or USDT",
      icon: "₿",
      instructions: "Send crypto to the wallet address below",
      accountInfo: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      minAmount: 20
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Instant deposit with your card",
      icon: "💎",
      instructions: "Enter your card details for instant processing",
      accountInfo: "Visa/MasterCard Accepted",
      minAmount: 10
    }
  ];

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    
    if (!depositAmount || !transactionId) {
      alert("Please fill all required fields");
      return;
    }

    const selectedPlanData = investmentPlans.find(plan => plan.id === selectedPlan);
    const amount = parseFloat(depositAmount);

    if (amount < selectedPlanData.minAmount) {
      alert(`Minimum deposit for ${selectedPlanData.name} is $${selectedPlanData.minAmount}`);
      return;
    }

    if (amount > selectedPlanData.maxAmount) {
      alert(`Maximum deposit for ${selectedPlanData.name} is $${selectedPlanData.maxAmount}`);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to deposit history
      const newDeposit = {
        id: depositHistory.length + 1,
        amount: amount,
        method: paymentMethod,
        status: "pending",
        date: new Date().toISOString().split('T')[0],
        transactionId: transactionId,
        plan: selectedPlanData.name
      };

      setDepositHistory([newDeposit, ...depositHistory]);
      
      alert("Deposit request submitted successfully! It will be processed within 2 hours.");
      setDepositAmount("");
      setTransactionId("");
    } catch (error) {
      alert("Deposit failed. Please try again.");
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

  const selectedMethod = paymentMethods.find(method => method.id === paymentMethod);
  const selectedPlanData = investmentPlans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Deposit Funds
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Add funds to your account and start investing in our profitable plans
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Deposit Form */}
          <div className="space-y-8">
            {/* Balance & Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    ${currentBalance.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">Current Balance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    ${depositHistory.filter(d => d.status === "completed").reduce((sum, d) => sum + d.amount, 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Total Deposited</div>
                </div>
              </div>
            </div>

            {/* Investment Plan Selection */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Select Investment Plan</h2>
              
              <div className="grid gap-4">
                {investmentPlans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedPlan === plan.id
                        ? "border-green-400 bg-green-400/10"
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{plan.name}</h3>
                        <div className="text-green-400 font-semibold">{plan.dailyProfit} Daily</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Min: ${plan.minAmount}</div>
                        <div className="text-sm text-gray-400">Max: ${plan.maxAmount}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">Duration: {plan.duration}</div>
                    <div className="flex flex-wrap gap-1">
                      {plan.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deposit Form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Make Deposit</h2>
              
              <form onSubmit={handleDepositSubmit} className="space-y-6">
                {/* Selected Plan Info */}
                <div className="bg-green-400/10 border border-green-400 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{selectedPlanData.name}</div>
                      <div className="text-sm text-green-300">{selectedPlanData.dailyProfit} Daily Profit</div>
                    </div>
                    <div className="text-right text-sm">
                      <div>Min: ${selectedPlanData.minAmount}</div>
                      <div>Max: ${selectedPlanData.maxAmount}</div>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Deposit Amount ($)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:outline-none"
                    placeholder={`Enter amount between $${selectedPlanData.minAmount} - $${selectedPlanData.maxAmount}`}
                    min={selectedPlanData.minAmount}
                    max={selectedPlanData.maxAmount}
                    required
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Minimum: ${selectedPlanData.minAmount}</span>
                    <span>Maximum: ${selectedPlanData.maxAmount}</span>
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
                          Min: ${method.minAmount}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Instructions */}
                {selectedMethod && (
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{selectedMethod.icon}</span>
                      <h4 className="font-semibold">{selectedMethod.name} Instructions</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{selectedMethod.instructions}</p>
                    <div className="bg-black/30 rounded p-3 mb-3">
                      <div className="text-xs text-gray-400 mb-1">Send to:</div>
                      <div className="font-mono text-sm break-all">{selectedMethod.accountInfo}</div>
                    </div>
                  </div>
                )}

                {/* Transaction ID */}
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Transaction ID / Reference Number
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-green-400 focus:outline-none"
                    placeholder="Enter transaction ID from your payment"
                    required
                  />
                  <div className="text-sm text-gray-400 mt-2">
                    Enter the transaction ID you received after making the payment
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-400 text-black font-bold py-4 rounded-lg hover:bg-green-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Processing Deposit...
                    </div>
                  ) : (
                    "Confirm Deposit"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Deposit History & Info */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <div className="text-xl font-bold text-green-400">
                  ${depositHistory.filter(d => d.status === "completed").reduce((sum, d) => sum + d.amount, 0)}
                </div>
                <div className="text-gray-400 text-sm">Total Deposited</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <div className="text-xl font-bold text-yellow-400">
                  {depositHistory.filter(d => d.status === "pending").length}
                </div>
                <div className="text-gray-400 text-sm">Pending</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                <div className="text-xl font-bold text-blue-400">
                  {depositHistory.length}
                </div>
                <div className="text-gray-400 text-sm">Total Deposits</div>
              </div>
            </div>

            {/* Deposit History */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6">Deposit History</h2>
              
              {depositHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No deposit history found
                </div>
              ) : (
                <div className="space-y-4">
                  {depositHistory.map((deposit) => (
                    <div
                      key={deposit.id}
                      className={`p-4 rounded-lg border ${getStatusBg(deposit.status)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold">${deposit.amount}</div>
                          <div className="text-sm text-gray-400">{deposit.method} • {deposit.plan}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getStatusColor(deposit.status)}`}>
                            {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                          </div>
                          <div className="text-sm text-gray-400">{deposit.date}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Transaction ID: {deposit.transactionId}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Important Information */}
            <div className="bg-blue-400/10 border border-blue-400 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">
                Deposit Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-blue-300/80">
                <li>• Deposits are processed within 1-2 hours during business days</li>
                <li>• Keep your transaction ID safe for reference</li>
                <li>• Minimum deposit varies by investment plan</li>
                <li>• Contact support if deposit is not credited within 4 hours</li>
                <li>• All deposits are secured and encrypted</li>
                <li>• Start with Starter Plan and upgrade as you grow</li>
              </ul>
            </div>

            {/* Support Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-green-400 mb-3">
                Need Help?
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Contact our support team for assistance with deposits:</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-green-400 text-black px-3 py-1 rounded text-xs font-semibold">
                    WhatsApp
                  </span>
                  <span>+92 312 3456789</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-400 text-black px-3 py-1 rounded text-xs font-semibold">
                    Email
                  </span>
                  <span>support@elitetrader.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;