import { useState } from "react";
import { useDispatch } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("PHP");

  const dispatch = useDispatch();
  const {balance, loan: currentLoan, isLoading} = useSelector(state => state.account);

  function handleDeposit() {
    if (!depositAmount) return;

    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    toast.success("Deposit successful");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return toast.error("Please enter a withdrawal amount");

    if (balance === 0 || withdrawalAmount > balance) {
      return toast.error("Insufficient funds available");
    }

    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
    toast.success("Withdrawal successful");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return toast.error("Please fill out request loan details.");

    if (currentLoan) {
      return toast.warning("You still have an active loan");
    }

    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
    toast.success("Loan successfully added to balance");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="PHP">Philippine Peso</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
            <option value="AUD">Australian Dollar</option>
            <option value="SGD">Singaporean Dollar</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="CNY">Renminbi</option>
            <option value="THB">Thailand Baht</option>
            <option value="IDR">Indonesian Rupiah</option>
            <option value="KRW">Korean Won</option>
            <option value="INR">Indian Rupee</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>{isLoading ? 'Converting...' : `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && <div>
          <span>Pay back PHP {currentLoan}</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AccountOperations;
