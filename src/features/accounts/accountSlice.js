import { createSlice } from "@reduxjs/toolkit";
// 1. Automatically Create action creators from our reducers
// 2. Writing reducers much easier, We no longer need to create switch statements & default actions
// 3. We can now mutate our state inside reducers

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                console.log(action)
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

export default accountSlice.reducer;
export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

// Async action creator for depositing money in a different currency
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