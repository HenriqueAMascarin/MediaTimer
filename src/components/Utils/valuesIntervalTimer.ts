import { DataType } from "./ContextTimer";
import { sequenceTimer } from "../Timer/TimerAnimations/TimerSequence";

function startInterval(data: DataType) {
    stopInterval(data);
    data.interval.refValue.current = setInterval(() => {
        data.timeStamp.changeState((state) => state -= 1);
    }, 1000);

}

export function stopInterval(data: DataType) {
    if (data.interval.refValue.current) {
        clearInterval(data.interval.refValue.current);
        data.interval.refValue.current = null;
    }
    
}

export function playTimer(data: DataType, timeStampValue: number) {
    sequenceTimer(true);

    data.stateTimer.changeState({ isPlay: true, isPaused: false });
    data.timeStamp.changeState(timeStampValue);

    setTimeout(() => {
        startInterval(data);
    }, 800);
}

export function pauseTimer(data: DataType) {
    data.stateTimer.changeState({ isPlay: data.stateTimer.state.isPlay, isPaused: !data.stateTimer.state.isPaused });

    data.stateTimer.state.isPaused ? startInterval(data) : stopInterval(data);
}

export function stopTimer(data: DataType) {
    sequenceTimer(false);

    data.stateTimer.changeState({ isPlay: false, isPaused: false });
    stopInterval(data);
    data.timeStamp.state = 0;
}