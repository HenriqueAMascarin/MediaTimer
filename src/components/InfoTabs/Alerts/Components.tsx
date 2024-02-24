import CorrectSvg from "@assets/images/correct.svg";
import LoadingSvg from "@assets/images/loading.svg";
import { alertsStyles } from "../styles/alertsStyles";
import { View, Text, Animated } from 'react-native';

export function SuccessAlert({ alertText }: { alertText?: string }) {

    return (
        <View style={[alertsStyles.item, alertsStyles.statusItem]}>

            <CorrectSvg />

            <Text>
                {alertText ?? 'Música encontrada'}
            </Text>

        </View>
    )
}

export function LoadingAlert({ alertText }: { alertText?: string }) {

    let spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false
            }
        )
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <View style={[alertsStyles.item]}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <LoadingSvg />
            </Animated.View>

            <Text>
                {alertText ?? 'Buscando música'}
            </Text>
        </View>
    )
}