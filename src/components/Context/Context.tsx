import { createContext, useRef, useContext } from 'react';

type data = {
    dataItem: {
        numberOne: number,
        numberTwo: number,
        numberThree: number,
    }
};

type items = {
    children?: JSX.Element | JSX.Element[];
};

const DataContext = createContext<data>({ dataItem: {numberOne: 0,numberTwo: 0, numberThree: 0} });

export default function Context({ children }: items) {
    const dataNumbers = useRef({ numberOne: 0, numberTwo: 0, numberThree: 0 }).current;

    return (
        <DataContext.Provider value={{ dataItem: dataNumbers }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    return context;
}