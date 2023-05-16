import { dataType } from "./ContextTimer"

function startTimer(data: dataType) {
    setTimeout(() => {
        data.interval.refValue.current = setInterval(() => {
            data.timeStamp.changeState((state) => state -= 1)
        }, 1000)
    }, 800);
}
export function stopTimer(data: dataType) {
    if (data.interval.refValue.current) {
        clearInterval(data.interval.refValue.current)
    }
}

export function playTimer(data: dataType, timeStampValue: number) {
    data.stateTimer.changeState({ isPlay: true, isPaused: false })
    data.timeStamp.changeState(timeStampValue);
    startTimer(data);
}

export function pauseTimer(data: dataType) {

    data.stateTimer.changeState({ isPlay: data.stateTimer.state.isPlay, isPaused: !data.stateTimer.state.isPaused });

    data.stateTimer.state.isPlay ? startTimer(data) : stopTimer(data);
}
