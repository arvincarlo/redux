import { useSelector } from 'react-redux';


import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';
import Button from './components/Button';


function App() {
  const fullName = useSelector(store => store.customer.fullName);

  return (
    <div>
      <h1>🧅 Onion Bank App 💰</h1>
      {fullName === '' ? 
        <>
          <CreateCustomer/>
        </>  
      : 
        <>
          <Customer/>
          <AccountOperations/>
          <BalanceDisplay/>
          <Button>Logout</Button>
        </>
      }
    </div>
  );
}

export default App;
