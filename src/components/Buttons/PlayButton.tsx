import { TouchableOpacity } from "react-native/";
import PlaySvg from "../../assets/images/play.svg";

export default function PlayButton(){
    return(
        <TouchableOpacity >
            <PlaySvg />
        </TouchableOpacity>
    )
}