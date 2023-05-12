import { TouchableOpacity } from "react-native";
import PauseSvg from '../../assets/images/play.svg';
import { buttonsStyle } from "./styles/buttonsStyle";

export default function PauseButton(){
    return(
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]}>
            <PauseSvg width={26} height={32} fill={"blue"}/>
        </TouchableOpacity>
    )
}