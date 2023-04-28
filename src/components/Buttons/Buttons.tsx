import { View } from "react-native";
import PlayButton from "./PlayButton";
import { buttonsStyle } from "./styles/buttonsStyle";

export default function Buttons(){
    return(
        <View style={buttonsStyle.container}>
            <PlayButton/>
        </View>
    )
}