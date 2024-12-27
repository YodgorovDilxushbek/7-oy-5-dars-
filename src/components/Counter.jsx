import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, fiveIncrement, fiveDecrement } from '../store/counterSlice';

const Counter = () => {
    const Counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    function handleIncrement() {
        dispatch(increment(1))

    }

    function handleDecrement() {
        dispatch(decrement(1))
    }

    function handleFiveIncrement() {
        dispatch(fiveIncrement())
    }

    function handleFiveDecrement() {
        dispatch(fiveDecrement())
    }

    return (
        <div className='text-center bg-blue-500 text-white mt-36 mx-auto text-4xl' >
            <h1>{Counter}</h1>
            <div className='flex justify-between p-72 '>
                <button className='border border-blue-800 rounded-md p-3' onClick={handleIncrement}>increment</button>
                <button className='border border-blue-800 rounded-md p-3' onClick={handleDecrement}>decrement</button>
                <button className='border border-blue-800 rounded-md p-3' onClick={handleFiveIncrement}>fiveIncrement</button>
                <button className='border border-blue-800 rounded-md p-3' onClick={handleFiveDecrement}>fiveDecrement</button>
            </div>


        </div>
    );
};

export default Counter;
