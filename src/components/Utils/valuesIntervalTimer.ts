import { dataType } from "./ContextTimer";
import { sequenceTimer } from "../Timer/AnimatedSequences/AnimatedSequences";

function startInterval(data: dataType) {
    setTimeout(() => {
        data.interval.refValue.current = setInterval(() => {
            data.timeStamp.changeState((state) => state -= 1)
        }, 1000)
    }, 800);
}
export function stopInterval(data: dataType) {
    if (data.interval.refValue.current) {
        clearInterval(data.interval.refValue.current)
    }
}

export function playTimer(data: dataType, timeStampValue: number) {
    data.stateTimer.changeState({ isPlay: true, isPaused: false })
    sequenceTimer(true);
    data.timeStamp.changeState(timeStampValue);
    startInterval(data);
}

export function pauseTimer(data: dataType) {
    data.stateTimer.changeState({ isPlay: data.stateTimer.state.isPlay, isPaused: !data.stateTimer.state.isPaused });

    data.stateTimer.state.isPaused ? startInterval(data) : stopInterval(data);
}

export function stopTimer(data: dataType) {
    stopInterval(data);
    data.timeStamp.state = 0;
    data.stateTimer.changeState({ isPlay: false, isPaused: false })
    sequenceTimer(false);
}