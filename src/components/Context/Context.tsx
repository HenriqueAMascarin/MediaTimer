import { createContext, useRef, useContext, useState } from 'react';
import { Animated } from 'react-native';
export type dataType = {
    dataItem: {
        scrollOne: number;
        scrollTwo: number;
        scrollThree: number;
    },
    stateTimer: {state: {
        isPlay: boolean;
        isPaused: boolean;
    }, changeState: React.Dispatch<React.SetStateAction<{
        isPlay: boolean;
        isPaused: boolean;
    }>>}
    timeStamp: {state: number, changeState: React.Dispatch<React.SetStateAction<number>>}
};

type items = {
    children?: JSX.Element | JSX.Element[];
};


const DataContext = createContext<dataType>({dataItem:{scrollOne: 0, scrollTwo: 0, scrollThree: 0}, stateTimer: {state: {isPlay: false, isPaused: false}, changeState: useState}, timeStamp: {state: 0, changeState: useState}});

export default function Context({ children }: items) {
    const dataNumbers = useRef({ scrollOne: 0, scrollTwo: 0, scrollThree: 0 }).current;
    const [stateTimer, changeStateTimer] = useState({isPlay: false, isPaused: false});
    const [timestampState, changeTimestamp] = useState(0);

    return (
        <DataContext.Provider value={{ dataItem: dataNumbers, stateTimer: {state: stateTimer, changeState: changeStateTimer}, timeStamp: {state: timestampState, changeState: changeTimestamp} }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    return context;
}