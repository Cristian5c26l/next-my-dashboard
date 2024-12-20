'use client';

import { useAppDispatch, useAppSelector } from "@/store";
import { addOne, substractOne, initCounterState } from '@/store/counter/counterSlice';// estas acciones se toman de counterSlice.ts
import { useEffect } from "react";

// import { useState } from 'react';

interface Props {
  value?: number; //value es una propiedad que puede que venga o no
}

export interface CounterResponse {
  method: string;
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch('/api/counter').then(response => response.json());
  console.log({ data });
  return data;
}

export const CartCounter = ({value = 0}: Props) => {// value toma el valor de 0 en caso de que no venga

    // const [counter, setCounter] = useState<number>(value);

  const count = useAppSelector((state) => state.counterReducer.count);// Es counterReducer porque en la store (src/store/index.ts) dentro de sus reducers está counterReducer: counterReducer.
  
  const dispatch = useAppDispatch();// dispatch se comunica con el store
  
  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [dispatch, value]);
  

  useEffect(() => {
    // Recordar que el callack de useEffect no puede ser async porque no puede retornar una promesa
    getApiCounter().then(({count}) => dispatch(initCounterState(count)))
  }, [dispatch]);

  // const handleIncrementCounter = (by: number) => {
     // setCounter((latestCounterValue: number) => latestCounterValue + by);// latestCounterValue es igual al ultimo valor del estado "counter"
  // }

  return (
      <>
        <span className="text-9xl">{ count }</span>

            <div className="flex">
                <button onClick={() => dispatch(addOne())} className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">+1</button>
                <button onClick={() => dispatch(substractOne())} className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">-1</button>
            </div>
      </>
  )
}
