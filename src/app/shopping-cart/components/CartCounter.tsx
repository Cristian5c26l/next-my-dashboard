'use client';

import { useState } from 'react';

interface Props {
  value?: number; //value es una propiedad que puede que venga o no
}

export const CartCounter = ({value = 0}: Props) => {// value toma el valor de 0 en caso de que no venga

    const [counter, setCounter] = useState<number>(value);

  const handleIncrementCounter = (by: number) => {
    setCounter((latestCounterValue: number) => latestCounterValue + by);// latestCounterValue es igual al ultimo valor del estado "counter"
  }

  return (
      <>
        <span className="text-9xl">{ counter }</span>

            <div className="flex">
                <button onClick={() => handleIncrementCounter(1)} className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">+1</button>
                <button onClick={() => handleIncrementCounter(-1)} className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">-1</button>
            </div>
      </>
  )
}
