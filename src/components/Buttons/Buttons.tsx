import { View } from "react-native";
import { useData } from "../Utils/ContextTimer";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import StopButton from "./StopButton";
import { buttonsStyle } from "./styles/buttonsStyle";

export default function Buttons() {
    const data = useData();

    return (
        <View style={buttonsStyle.container}>
            <PlayButton />
            <View style={buttonsStyle.containerPlayStateButtons}>
                <StopButton />
                <PauseButton />
            </View>
        </View>
    )
}