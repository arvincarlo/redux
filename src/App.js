import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';

function App() {
  return (
    <div>
      <h1>Yun Yown Bank App</h1>
      <CreateCustomer/>
      <Customer/>
      <AccountOperations/>
      <BalanceDisplay/>
    </div>
  );
}

export default App;
