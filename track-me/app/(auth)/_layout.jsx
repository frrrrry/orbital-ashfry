import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "frontpage",
};

export default function AuthRoot() {
    return (
        <Stack screenOptions={{ headerShown: false}}/>
    );
}