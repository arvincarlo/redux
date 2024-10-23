import { useSelector } from "react-redux";

function Customer() {
  const {fullName, nationalID, createdAt} = useSelector(store => store.customer);
  console.log(createdAt);

  return <h2>👋 Welcome, {fullName}, {nationalID}, {createdAt}</h2>;
}

export default Customer;
