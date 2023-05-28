import { DataType } from "./ContextTimer";
import { sequenceTimer } from "../Timer/TimerAnimations/TimerSequence";
import { timerPauseText } from "../Timer/TimerAnimations/TimerPauseText";
import { numberColorTimer } from "../Timer/TimerAnimations/TimerNumbers";

function startInterval(data: DataType) {
    stopInterval(data);
    data.interval.refValue.current = setInterval(() => {
        data.runningValue.changeState((state) => state -= 1);
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
    data.runningValue.changeState(timeStampValue);
    data.totalValue.changeState(timeStampValue);

    setTimeout(() => {
        startInterval(data);
    }, 800);
}

export function pauseTimer(data: DataType) {
    data.stateTimer.changeState({ isPlay: data.stateTimer.state.isPlay, isPaused: !data.stateTimer.state.isPaused });

    const isPaused = !data.stateTimer.state.isPaused; // the state dont get the real value, because that we need to put ! to get real value
    
    numberColorTimer(isPaused);
    timerPauseText(isPaused);
    isPaused ? stopInterval(data) : startInterval(data);

}

export function stopTimer(data: DataType) {
    sequenceTimer(false);
    timerPauseText(false);

    data.stateTimer.changeState({ isPlay: false, isPaused: false });
    stopInterval(data);
    data.runningValue.state = 0;
    data.totalValue.state = 0;
}