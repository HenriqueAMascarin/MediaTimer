import { dataType } from "./ContextTimer"

export function playTimer(data: dataType){
    setTimeout(() => {
        data.interval.refValue.current = setInterval(() => {
            data.timeStamp.changeState((state) => state -= 1)
        }, 1000)
    }, 800);
}