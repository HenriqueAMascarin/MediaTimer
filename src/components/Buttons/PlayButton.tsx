import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../assets/images/play.svg";
import { buttonsStyle } from "./styles/buttonsStyle";

export default function PlayButton(){
    return(
        <TouchableOpacity style={[buttonsStyle.buttons, buttonsStyle.principalButton]}>
            <PlaySvg width={26} height={32}/>
        </TouchableOpacity>
    )
}