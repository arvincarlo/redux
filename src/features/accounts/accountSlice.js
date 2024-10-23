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
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
});

export default accountSlice.reducer;
export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions;