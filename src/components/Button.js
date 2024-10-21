import { useDispatch } from "react-redux";
import { logout } from "../features/customers/customerSlice";

function Button({children}) {
    const dispatch = useDispatch();
    
    function handleClick() {
        dispatch(logout());
        console.log('Logging out...');
    }


    return (
        <button onClick={handleClick}>
            {children}
        </button>
    )
}

export default Button
