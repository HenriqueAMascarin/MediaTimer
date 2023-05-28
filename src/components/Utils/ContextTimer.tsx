import { createContext, useRef, useContext, useState } from 'react';
import { heightContainer } from '../Timer/styles/timerStyle';

export interface DataType {
    dataItem: {
        scrollOne: number;
        scrollTwo: number;
        scrollThree: number;
    },
    stateTimer: {
        state: {
            isPlay: boolean;
            isPaused: boolean;
        }, changeState: React.Dispatch<React.SetStateAction<{
            isPlay: boolean;
            isPaused: boolean;
        }>>
    }
    totalValue: {state: number, changeState: React.Dispatch<React.SetStateAction<number>>},
    runningValue: { state: number, changeState: React.Dispatch<React.SetStateAction<number>>},
    interval: { refValue: React.MutableRefObject<NodeJS.Timer | null> | { current: null } },
    heightItems: {state: {
        heightItem: number;
        itemsShowing: number;
    }, changeState: React.Dispatch<React.SetStateAction<{
        heightItem: number;
        itemsShowing: number;
    }>>},
};

interface Items {
    children?: JSX.Element | JSX.Element[];
};

const itemsVisible = 3;

const DataContext = createContext<DataType>({ dataItem: { scrollOne: 0, scrollTwo: 0, scrollThree: 0 },             
    stateTimer: { state: { isPlay: false, isPaused: false },
    changeState: useState },
    totalValue: {state: 0, changeState: useState},
    runningValue: { state: 0, changeState: useState },
    interval: { refValue: { current: null } },
    heightItems: {state: {heightItem: heightContainer / itemsVisible, itemsShowing: itemsVisible}, changeState: useState} // 3 items showing to get the value
});

export default function Context({ children }: Items) {

    const dataNumbers = useRef({ scrollOne: 0, scrollTwo: 0, scrollThree: 0 }).current;

    const [stateTimer, changeStateTimer] = useState({ isPlay: false, isPaused: false });

    const [totalValue, changeTotalValue] = useState(0);

    const [runningValue, changeRunningValue] = useState(0);

    let refInterval = useRef<NodeJS.Timer | null>(null);

    const [heightItems, changeHeightItems] = useState({heightItem: heightContainer / itemsVisible, itemsShowing: itemsVisible}); 

    return (
        <DataContext.Provider value={{ dataItem: dataNumbers, 
            stateTimer: { state: stateTimer, changeState: changeStateTimer },
            totalValue: {state: totalValue, changeState: changeTotalValue},
            runningValue: {state: runningValue, changeState: changeRunningValue},
            interval: { refValue: refInterval }, 
            heightItems:{state: heightItems, changeState: changeHeightItems}
            }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    return context;
}