import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
    isReady: boolean;
}

const initialState: CounterState = {
    count: 5,
    isReady: false
}

const counterSlice = createSlice({
  name: 'slice',
  initialState,
    reducers: {

        initCounterState(state, action: PayloadAction<number>) {
            if (state.isReady) return;
            state.count = action.payload;
            state.isReady = !false;
        },
        addOne(state) {// state is the current value of the state (initialState)
            state.count++;// incrementar el valor de count en 1. En este punto, se muta el valor del state lo que hace que el state actualice su valor.
        },
        substractOne(state) {

            if (state.count === 0) return;

            state.count--;
        },
        resetCount(state, action: PayloadAction<number>) {

            if (action.payload < 0) action.payload = 0;

            state.count = action.payload;// action.payload es el valor que se le pasa como segundo argumento a resetCounter.
        }
  }
});

export const {addOne, substractOne, resetCount, initCounterState} = counterSlice.actions;

export default counterSlice.reducer;