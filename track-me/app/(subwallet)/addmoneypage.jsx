import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight,
  SafeAreaView, 
  Animated,
  StatusBar,
  TextInput,
} from 'react-native';
import { useRouter, Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserAuth } from '../../context/auth';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { updateCurrAmount } from '../../firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddMoneyPage = (props) => {
  const { user } = useUserAuth();
  const [errMsg, setErrMsg] = useState('');
  const [walletId, setWalletId] = useState('');
  const [currAmount, setCurrAmount] = useState(0);
  const [extraAmount, setExtraAmount] = useState(0);
  const [fiveShow, setFiveShow] = useState("#f2f2f2");
  const [tenShow, setTenShow] = useState("#f2f2f2");
  const [fifteenShow, setFifteenShow] = useState("#f2f2f2");
  const [twentyShow, setTwentyShow] = useState("#f2f2f2");
  const [fiftyShow, setFiftyShow] = useState("#f2f2f2");
  const [hundredShow, setHundredShow] = useState("#f2f2f2"); 
  const [selected, setSelected] = useState("#f2f2f2");
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getValueFunction = async () => {
      AsyncStorage.getItem('walletId').then(
        (value) => setWalletId(value)
      );

      JSON.parse(JSON.stringify(AsyncStorage.getItem('walletCurrAmount').then(
        (value) => setCurrAmount(value))));
    }
    getValueFunction();

  }, [isFocused]);

  /*
  each amount box on press:
  - color change from #f2f2f2 to #c5c5c5
  - add to extraAmount 
  - previous selected box will be set to false
  - previous selected item color should change
  - should be able to deselect item
  */

  const addFive = async () => {
    if (fiveShow == "#f2f2f2") {
      setFiveShow("#c5c5c5");
      setTenShow("#f2f2f2");
      setFifteenShow("#f2f2f2");
      setTwentyShow("#f2f2f2");
      setFiftyShow("#f2f2f2");
      setHundredShow("#f2f2f2");
      setExtraAmount(5);
    } else {
      setFiveShow("#f2f2f2");
      setExtraAmount(0);
    }
  }
  const addTen = async () => {
    if (tenShow == "#f2f2f2") {
      setFiveShow("#f2f2f2");
      setTenShow("#c5c5c5");
      setFifteenShow("#f2f2f2");
      setTwentyShow("#f2f2f2");
      setFiftyShow("#f2f2f2");
      setHundredShow("#f2f2f2");
      setExtraAmount(10);
    } else {
      setTenShow("#f2f2f2");
      setExtraAmount(0);
    }
  }
  const addFifteen = async () => {
    if (fifteenShow == "#f2f2f2") {
      setFiveShow("#f2f2f2");
      setTenShow("#f2f2f2");
      setFifteenShow("#c5c5c5");
      setTwentyShow("#f2f2f2");
      setFiftyShow("#f2f2f2");
      setHundredShow("#f2f2f2");
      setExtraAmount(15);
    } else {
      setFifteenShow("#f2f2f2");
      setExtraAmount(0);
    }
  }
  const addTwenty = async () => { 
    if (twentyShow == "#f2f2f2") {
      setFiveShow("#f2f2f2");
      setTenShow("#f2f2f2");
      setFifteenShow("#f2f2f2");
      setTwentyShow("#c5c5c5");
      setFiftyShow("#f2f2f2");
      setHundredShow("#f2f2f2");
      setExtraAmount(20);
    } else {
      setTwentyShow("#f2f2f2");
      setExtraAmount(0);
    }
  }
  const addFifty = async () => {
    if (fiftyShow == "#f2f2f2") {
      setFiveShow("#f2f2f2");
      setTenShow("#f2f2f2");
      setFifteenShow("#f2f2f2");
      setTwentyShow("#f2f2f2");
      setFiftyShow("#c5c5c5");
      setHundredShow("#f2f2f2");
      setExtraAmount(50);
    } else {
      setFiftyShow("#f2f2f2");
      setExtraAmount(0);
    }
  }
  const addHundred = async () => {
    if (hundredShow == "#f2f2f2") {
      setFiveShow("#f2f2f2");
      setTenShow("#f2f2f2");
      setFifteenShow("#f2f2f2");
      setTwentyShow("#f2f2f2");
      setFiftyShow("#f2f2f2");
      setHundredShow("#c5c5c5");
      setExtraAmount(100);
    } else {
      setHundredShow("#f2f2f2");
      setExtraAmount(0);
    }
  }

  const addAmount = (amt) => {
    const newAmt = parseFloat(currAmount) + parseFloat(amt); 
    console.log("newAmt", newAmt); 
    console.log(typeof newAmt); 
    setCurrAmount(newAmt); 
    console.log("currAmount", currAmount);
    console.log(typeof currAmount); 
  }

  const handleSave = async () => {
    setErrMsg(''); 
    if (extraAmount < 0) {
      setErrMsg("Top-up amount cannot be less than 0")
      return; 
    }
    
    try { 
      addAmount(extraAmount);
      await updateCurrAmount(walletId, parseFloat(currAmount).toFixed(2));  
    } catch (error) {
      setErrMsg(errMsg);
      console.log("error message: ", error.message);
      console.log("uid: ", user.uid); 
      console.log("error due to handleSave in addmoneypage");
    }
    router.push("../(home)/subwallet"); 
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.3, top: 50, left: -150 }}>
        <Link href="../subwallet">
          <Ionicons name="arrow-back" size={40} color={'black'}/>
        </Link>
      </View>

      <View style={{flex: 0.8, top: -60 }}>
        <Text style={styles.title}>Add Money</Text>
      </View>

      <View style={{ flex: 3 }}> 

        {/* first row */}
        <View style={{ flexDirection:"row", top: -15, alignSelf: 'center' }}>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: fiveShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }} 
          onPress={addFive}>
            <Text style={styles.amount}>$5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40 }}/>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: tenShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }}  
            onPress={addTen}>
            <Text style={styles.amount}>$10</Text>
          </TouchableOpacity>
        </View>

        {/* second row */}
        <View style={{ flexDirection:"row", top: 0, alignSelf: 'center' }}>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: fifteenShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }}  
            onPress={addFifteen}>
            <Text style={styles.amount}>$15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40 }}/>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: twentyShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }}  
            onPress={addTwenty}>
            <Text style={styles.amount}>$20</Text>
          </TouchableOpacity>
        </View>

        {/* third row */}
        <View style={{ flexDirection:"row", top: 15, alignSelf: 'center' }}>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: fiftyShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }}  
            onPress={addFifty}>
            <Text style={styles.amount}>$50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40 }}/>
          <TouchableOpacity style={{ 
            height: 66, 
            width: 112,
            backgroundColor: hundredShow,
            borderRadius: 10,
            borderWidth: 1,  
            borderColor: "#8a8a8a",
            justifyContent: 'center',
            }}  
            onPress={addHundred}>
            <Text style={styles.amount}>$100</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            autoCapitalize='none'
            keyboardType='numeric'
            value={String(extraAmount)}
            placeholder='Input Top-up Amount'
            placeholderTextColor="#b1b1b1"
            onChangeText={(text) => {
              const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
              if (validated) {
                setExtraAmount(text)
              }
            }} 
          />
        </View>

        {/* save button */}
        <View style={{ flexDirection:"row", top: 80, alignSelf: 'center' }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.saveContainer} 
            onPress={handleSave}>
            <Text style={ styles.setWhite }>Save</Text>
          </TouchableOpacity>
        </View>
        {errMsg !== "" && <Text style={ {top: 30, left: 10} }>{errMsg}</Text>}

      </View>
    </View>
  )
}

export default AddMoneyPage; 


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  title: {
    fontSize: 32,
    fontWeight: 'bold', 
    textAlign: 'center',
    top: 100, 
  }, 
  amount: {
    textAlign: 'center',
    fontSize: 24,
    color: "#000", 
  }, 
  inputContainer: {
    height: 52, 
    width: 265, 
    padding: 10, 
    top: 35, 
    borderRadius: 10,
    borderWidth: 1,  
    borderColor: "#8a8a8a",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  input: {
    //backgroundColor: '#fff',
    padding: 5,
    height: 52, 
    width: 230,
    fontSize: 20,
  }, 
  saveContainer: {
    backgroundColor: "#c5c5c5",
    width: 300,
    height: 50,
    padding: 15,
    borderRadius: 20,
    top: 10, 
    left: 10,
    alignSelf: 'center', 
  }, 
  setWhite: {
    color:'white',
    fontSize: 14,
    textAlign:"center"
  },
})