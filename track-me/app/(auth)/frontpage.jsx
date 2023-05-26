import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import { Link } from "expo-router";

export default function FrontPage() {

  return (
    <View style={styles.container}>
      
      <View style={styles.main}>
        <Text style={styles.title}>Track Me</Text>
          <Link href="/login">
            <Button mode="contained" buttonColor="#c5c5c5" style={{ width: 300 }}>
              Sign in</Button>
          </Link>
        
      <Text style={styles.subtitle}></Text>
        <Link href="/register">
            <Button mode="contained" buttonColor="#c5c5c5" style={{ width: 300 }}>
              Sign up</Button>
          </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
    margin: 10
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
