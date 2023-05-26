import { StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { Icon } from '@rneui/themed'; 
import { useUserAuth } from "../../context/auth";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const { signUp } = useUserAuth();
    const handleSignup = async () => {
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
            await signUp(email, password)
              .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
              })
          } catch (err) {
              if (err.message == "Firebase: Error (auth/invalid-email).") {
                setErrMsg("Please enter a valid email");
              }
              else if (err.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setErrMsg("Password should be at least 6 characters");
              }
              else {
                setErrMsg(err.message);
              }
              console.log(err.message);
          }
  
          setLoading(false);
    }
    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}></Text>
            </View>

            <View style={{ flex: 2 }}>
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

                <Button onPress={handleSignup} 
                mode="contained" buttonColor="#c5c5c5" style={ styles.submitContainer }>
                    Sign up</Button>
                {errMsg !== "" && <Text style={ {top:20} }>{errMsg}</Text>}
                {loading && <ActivityIndicator color="black" style={ styles.submitContainer }/>}

            </View>
            
            <View style={{ flex: 0.5 }}>
                <Text>
                    <Text>Already have an account?  </Text>
                    <Link href="/login">
                        <Text style={styles.setGrey}>Sign in</Text>
                    </Link>
                </Text>
            </View>
        </View>
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
      textAlign: "center",
      top: 100
    },
    subtitle: {
      fontSize: 20,
      color: "#38434D",
      padding: 5,
      top: 100,
    },
    body: {
      color: "#38434D",
      padding: 10
    },
    inputContainer : {
        flexDirection: 'row',
        height: 40,
        width: 300,
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
   },
   setGrey: {
    color:'#8A8A8A'
   }
  });
  