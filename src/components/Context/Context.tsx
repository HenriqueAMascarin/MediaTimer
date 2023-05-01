import { createContext, useRef, useContext } from 'react';
import { Animated } from 'react-native';
type data = {
    dataItem: {
        numberOne: number;
        numberTwo: number;
        numberThree: number;
    },
    stateTimer: {
        isPlay: Animated.Value;
        isPaused: Animated.Value;
    }
};

type items = {
    children?: JSX.Element | JSX.Element[];
};

const DataContext = createContext<data>({dataItem:{numberOne: 0, numberTwo: 0, numberThree: 0}, stateTimer: {isPlay: new Animated.Value(0), isPaused: new Animated.Value(0)}});


export default function Context({ children }: items) {
    const dataNumbers = useRef({ numberOne: 0, numberTwo: 0, numberThree: 0 }).current;
    const stateTimer = useRef({isPlay: new Animated.Value(0), isPaused: new Animated.Value(0)}).current;

    return (
        <DataContext.Provider value={{ dataItem: dataNumbers, stateTimer: stateTimer}}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    return context;
}