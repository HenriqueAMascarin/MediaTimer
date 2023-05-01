import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../assets/images/play.svg";
import { buttonsStyle } from "./styles/buttonsStyle";
import { useData } from "../Context/Context";
import { heightItems } from "../Timer/Timer";

export default function PlayButton(){

    let data = useData();

    function timerStart(){
        const valueOne = data.dataItem.numberOne / heightItems;
        const valueTwo = data.dataItem.numberTwo / heightItems;
        const valueThree = data.dataItem.numberThree / heightItems;

        data.stateTimer.isPlay = true;
    }

    return(
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]} onPress={() => timerStart()}>
            <PlaySvg width={26} height={32}/>
        </TouchableOpacity>
    )
}