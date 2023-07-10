import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight,
  SafeAreaView, 
  Animated,
  StatusBar,
} from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useUserAuth } from '../../context/auth';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getWallet, deleteWallet, updateCurrAmount } from '../../firebase/firestore';
import { AntDesign, } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { set } from 'date-fns';

const AddMoneyPage = (props) => {
  const { user } = useUserAuth();
  const [errMsg, setErrMsg] = useState('');
  const [walletId, setWalletId] = useState('');
  const [currAmount, setCurrAmount] = useState(0);
  const [newAmount, setNewAmount] = useState(0); 
  const [extraAmount, setExtraAmount] = useState(0);
  // const [input, setInput] = useState(0);
  const [color, setColor] = useState("#f2f2f2"); 
  const [fiveShow, setFiveShow] = useState(false);
  const [tenShow, setTenShow] = useState(false);
  const [fifteenShow, setFifteenShow] = useState(false);
  const [twentyShow, setTwentyShow] = useState(false);
  const [fiftyShow, setFiftyShow] = useState(false);
  const [hundredShow, setHundredShow] = useState(false); 
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

  const changeColor = async () => {
    setColor("#c5c5c5"); 
  }

  const addFive = async () => {
    changeColor(); 
    setExtraAmount(5);
    setFiveShow(true);
    setTenShow(false);
    setFifteenShow(false);
    setTwentyShow(false);
    setFiftyShow(false);
    setHundredShow(false);
  }
  const addTen = async () => {
    changeColor(); 
    setExtraAmount(10);
    setFiveShow(false);
    setTenShow(true);
    setFifteenShow(false);
    setTwentyShow(false);
    setFiftyShow(false);
    setHundredShow(false);
  }
  const addFifteen = async () => {
    changeColor(); 
    setExtraAmount(15);
    setFiveShow(false);
    setTenShow(false);
    setFifteenShow(true);
    setTwentyShow(false);
    setFiftyShow(false);
    setHundredShow(false);
  }
  const addTwenty = async () => { 
    changeColor(); 
    setExtraAmount(20);
    setFiveShow(false);
    setTenShow(false);
    setFifteenShow(false);
    setTwentyShow(true);
    setFiftyShow(false);
    setHundredShow(false);
  }
  const addFifty = async () => {
    changeColor(); 
    setExtraAmount(50);
    setFiveShow(false);
    setTenShow(false);
    setFifteenShow(false);
    setTwentyShow(false);
    setFiftyShow(true);
    setHundredShow(false);
  }
  const addHundred = async () => {
    changeColor(); 
    setExtraAmount(100);
    setFiveShow(false);
    setTenShow(false);
    setFifteenShow(false);
    setTwentyShow(false);
    setFiftyShow(false);
    setHundredShow(true);
  }

  const handleSave = async () => {
    setErrMsg(''); 
    if (extraAmount < 0) {
      setErrMsg("Top-up amount cannot be less than 0")
      return; 
    }
    
    try { 
      const result = currAmount + extraAmount; 
      setNewAmount(result);
      await updateCurrAmount(walletId, newAmount);  
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
      <View style={{flex: 0.3, top: -10 }}>
        <Text style={styles.title}>Add Money</Text>
      </View>

      <View style={{ flex: 3, flexDirection: 'column' }}> 
        <View style={styles.row}>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$10</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$20</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.amountItem}>
            <Text style={styles.amount}>$100</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            autoCapitalize='none'
            keyboardType='numeric'
            value={extraAmount}
            placeholder='Input Top-up Amount'
            placeholderTextColor="#b1b1b1"
            onChangeText={(text) => {
              const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
              if (validated) {
                setExtraAmount(text)
              }
            }}>$</TextInput>
        </View>

        {/* save button */}
        <View style={{ flexDirection:"row", top: 80 }}>
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
  }, 
  title: {
    fontSize: 32,
    fontWeight: 'bold', 
    textAlign: 'center',
    top: 100, 
  }, 
  amountItem: {
    backgroundColor: "#f2f2f2",

  }, 
  amount: {
    textAlign: 'center',
    fontSize: 15,
    color: "#000", 
  }, 
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    height: 60, 
    width: 200, 
    padding: 10, 
    top: 0, 
    borderRadius: 10,
    borderWidth: 1, 
  },
  input: {
    padding: 5, 
  }, 
  saveContainer: {
    backgroundColor: "#c5c5c5",
    width: 300,
    height: 50,
    padding: 15,
    borderRadius: 20,
    top: 30, 
    left: 10,
  }, 
})