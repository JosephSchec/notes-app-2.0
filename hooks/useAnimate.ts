import { withTiming } from "react-native-reanimated";

export const animateOpacity = () => {
    'worklet';
    const animations = {
        opacity: withTiming(1, { duration: 2000 }),
    };
    const initialValues = {
        opacity: 0,
    };
    return {
        initialValues,
        animations,
    }
}
export const noAnimation = () => {
    'worklet';
    const animations = {
        opacity: 1
    };
    const initialValues = {
        opacity: 1,
    };
    return {
        initialValues,
        animations,
    }
}