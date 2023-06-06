import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Text } from "react-native-paper";
import { Icon } from '@rneui/themed'; 
import { useUserAuth } from "../../context/auth";
import { useNavigation } from '@react-navigation/native';

export default function ForgetpasswordPage() {  
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { resetPassword } = useUserAuth();

  const handleresetPassword = async () => {
    setErrMsg('');
    if (email == '') {
        setErrMsg("email cannot be empty")
        return;
    }
    try {
      await resetPassword(email);
      
      
    } catch (err) {
      if (err.message == "Firebase: Error (auth/invalid-email).") {
        setErrMsg('Please enter a valid email');
      }
      else if (err.message == "Firebase: Error (auth/user-not-found).") {
        setErrMsg("Account does not exist");
      }
      else if (err.message == "Firebase: Error (auth/too-many-requests).") {
        setErrMsg("Too many requests. Try again later.");
      }
      else {
        setErrMsg(err.message);
      }
      console.log(err.message);
    } 
  }
  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Forget Password</Text>
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
          
        <View style={{ flexDirection:"row"  }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.backtosigninContainer} 
            onPress={() => {navigation.goBack();}}>
            <Text style={ styles.setWhite }>Back to Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity></TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.resetpasswordContainer} 
            onPress={handleresetPassword}>
              <Text style={ styles.setWhite }>Reset Password</Text>
          </TouchableOpacity>
          
        </View>
        {errMsg !== "" && <Text style={ {top:40} }>{errMsg}</Text>}
        
      </View>

      <View style={{ flex: 0.5, flexDirection:"row"  }}></View>
      
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
  setWhite: {
    color:'white',
    fontSize: 14,
  },
  backtosigninContainer: {
    backgroundColor: "#c5c5c5",
    width: 140,
    height: 45,
    padding: 15,
    borderRadius: 20,
    top: 30, 
  },
  resetpasswordContainer: {
    backgroundColor: "#c5c5c5",
    width: 140,
    height: 45,
    padding: 15,
    borderRadius: 20,
    top: 30, 
    left: 10
  },
  loading: {
    buttom:100,
  }
  });