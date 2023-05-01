import { createContext, useRef, useContext } from 'react';

type data = {
    dataItem: {
        numberOne: number;
        numberTwo: number;
        numberThree: number;
    };
    stateTimer: {
        isPlay: boolean;
        isPaused: boolean;
    };
};

type items = {
    children?: JSX.Element | JSX.Element[];
};

const DataContext = createContext<data>({ dataItem: {numberOne: 0,numberTwo: 0, numberThree: 0}, stateTimer: {isPlay: false, isPaused: false}});

export default function Context({ children }: items) {
    const dataNumbers = useRef({ numberOne: 0, numberTwo: 0, numberThree: 0 }).current;
    const stateTimer = useRef({isPlay: false, isPaused: false}).current;
    return (
        <DataContext.Provider value={{ dataItem: dataNumbers, stateTimer: stateTimer }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    return context;
}