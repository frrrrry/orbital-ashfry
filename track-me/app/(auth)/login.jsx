import { StyleSheet, 
  View, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Platform, 
  Keyboard, 
} from "react-native";
import { useState } from "react";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { Icon } from '@rneui/themed'; 
import { useUserAuth } from "../../context/auth";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

export default function LoginPage() {

  const [fontsLoaded] = useFonts({
    'Bitter-Bold': require('../../assets/fonts/Bitter-Bold.ttf'),
  });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const { logIn } = useUserAuth();
    const handleLogin = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        
        try {
          await logIn(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Logged in with:', user.email);
            })
        } catch (err) {
            if (err.message == "Firebase: Error (auth/invalid-email).") {
                setErrMsg("Please enter a valid email");
            }
            else if (err.message == "Firebase: Error (auth/user-not-found).") {
                setErrMsg("Account does not exist. Do create account");
            }
            else if (err.message == "Firebase: Error (auth/wrong-password).") {
                setErrMsg("Wrong password");
            }
            else if (err.message == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                setErrMsg("Access to this account has been temporarily disabled due to many failed login attempts. You can restore it by resetting your password.");
            }
            else {
                setErrMsg(err.message);
            }
            console.log(err.message);
        }

        setLoading(false);
        
    }
    return (
        <KeyboardAvoidingView 
          behavior="height"
          style={styles.container}>
              <View style={{ flex: 1, }}>
                <Text style={styles.title}>Sign in</Text>
                <Text style={styles.subtitle}>Please sign in to continue.</Text>
              </View>

              <View style={{ flex: 1.85, top: 20 }}>
                <Text style={styles.body}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        textContentType='emailAddress'
                        value={email}
                        onChangeText={setEmail} />
                    <Icon name="mail" size={20}/>
                </View>
                
                <Text style={styles.body}>Password</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize='none'
                        textContentType='password'
                        value={password}
                        onChangeText={setPassword} />
                    <Icon name="lock" size={20} color="#000"/>
                </View>
                
                <Button onPress={handleLogin} 
                mode="contained" buttonColor="#c5c5c5" style={ styles.submitContainer } testID="signinButton">
                    Sign in</Button>
                {errMsg !== "" && <Text style={ {top:20, width: 300} }>{errMsg}</Text>}
                {loading && <ActivityIndicator color="black" style={ styles.submitContainer }/>}

              </View>
            <View style={{ flex: 0.5, flexDirection:"row"  }}>
                <Text>
                    <Link href="/register">
                        <Button textColor="black">Create Account</Button>
                    </Link>
                    <Link href="/forgetpassword">
                        <Button textColor="#8A8A8A">Forgot Password?</Button>
                    </Link>
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    title: {  
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "left",
      top: 100,
    },
    subtitle: {
      fontSize: 20,
      color: "#38434D",
      padding: 5,
      top: 90,
      left: -5
    },
    body: {
        color: "#38434D",
        padding: 10
      },
    inputContainer : {
        flexDirection: 'row',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingBottom: 10,
      },
    input: {
        flex: 1
      },
    submitContainer: {
        top: 20,
        color: "#c5c5c5",
        width: 300,
        height: 45,
   }
  });
  