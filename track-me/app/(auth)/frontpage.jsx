import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import { useRouter } from "expo-router";
// import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";

export default function FrontPage() {
  const router = useRouter();
  const handleSignup = async () => {
    router.push("/register");
  }

  const handleSignin = async () => {
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Track Me</Text>
        <Button onPress={handleSignin} mode="contained" buttonColor="#c5c5c5" style={{ width: 300 }}>
          Sign in</Button>
        
        <Text style={styles.subtitle}></Text>
        <Button onPress={handleSignup}mode="contained" buttonColor="#c5c5c5" style={{ width: 300 }}>
          Sign up</Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    margin: 10, 
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});