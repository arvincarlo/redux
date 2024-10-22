const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
    switch(action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case 'account/requestLoan':
            if (state.loan > 0) return state;

            // LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }
        case 'account/convertingCurrency':
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}


export function deposit(amount, currency) {
    
    if (currency === "PHP") {
        return { type: "account/deposit", payload: amount }
    }

    return async function(dispatch, getState) {
        // Set isLoading to true
        dispatch({type: "account/convertingCurrency"})


        // API Call and convert the currency to PHP 
        // https://${host}/latest?amount=10&from=GBP&to=USD
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=PHP`);
        const data = await response.json();
        const converted = data.rates.PHP;
        
        console.log(`${amount} ${currency} is equivalent to (${converted}) Pesos.`);
        
        // return action
        dispatch(
            {
                type: "account/deposit",
                payload: converted
            }
        );
    }
}
export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount}
}
export function requestLoan(amount, purpose) {
    return { 
        type: "account/requestLoan",
        payload: {
            amount: amount,
            purpose: purpose
        }
    }
}
export function payLoan() {
    return { type: "account/payLoan"}
}