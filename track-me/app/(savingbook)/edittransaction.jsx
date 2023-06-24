import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useUserAuth } from "../../context/auth";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { updateTransaction, deleteTransaction } from '../../firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from "expo-router";

export default function EditTransactionPage() {
  const isFocused = useIsFocused();

  const [transactionid, setTransactionid] = useState('');

  useEffect(() => {
    const getValueFunction = () => {
        // Function to get the value from AsyncStorage
        AsyncStorage.getItem('transactionid').then(
        (value) =>
            setTransactionid(value),
        );
    
    };
    getValueFunction();
  }, [isFocused]);

  console.log("transactionid", transactionid);

  const navigation = useNavigation();
  const router = useRouter();
  const platform = Platform.OS != 'ios';

  const { user } = useUserAuth();
  const [errMsg, setErrMsg] = useState('');

  // for income and expenses
  const [type, setType] = useState('');

  // false will mean no border around the income/expense word
  const [incomeshow, setIncomeshow] = useState(false);
  const [expenseshow, setExpenseshow] = useState(false);
  const typeIncome = async () => { 
    setType("Income"); 
    setIncomeshow(true); 
    setExpenseshow(false);
  };
  const typeExpense = async () => { 
    setType("Expense"); 
    setExpenseshow(true); 
    setIncomeshow(false);
  };

  // for date picker
  const [date, setDate] = useState(new Date());
  const [dateshow, setdateShow] = useState(false);

  let Todaydate = new Date(Date.now());
  Todaydate = Todaydate.getDate() + '/' + (Todaydate.getMonth() + 1) 
                + '/' + Todaydate.getFullYear();

  const [displayDate, setdisplayDate] = useState(Todaydate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setdateShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) 
                + '/' + tempDate.getFullYear();
    setdisplayDate(fDate);
    console.log('text', displayDate);
  };

  const showCalender = () => {setdateShow(true); };

  // text input - amount and note
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');

  // category dropdown box
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([
    {label: 'Food', value: 'Food'},
    {label: 'Shopping', value: 'Shopping'},
    {label: 'Transport', value: 'Transport'},
    {label: 'Education', value: 'Education'},
    {label: 'Others', value: 'Others'}
  ]);

  const handleSave = async () => {
    setErrMsg('');
    if (type == '') {
      setErrMsg("Please select Income or Expense")
      return;
    }
    if (category == '') {
      setErrMsg("Category cannot be empty")
      return;
    }
    if (amount == 0) {
      setErrMsg("Amount cannot be empty")
      return;
    }
    if (amount <= 0) {
      setErrMsg("Amount must be more than 0")
      return;
    }

    //wanted to make amount into int but in firebase it is still saved as string
    setAmount(parseInt(amount)); 
    try {
      await updateTransaction(transactionid, type, date, category, amount, note )
    } catch (error) {
      setErrMsg(error.message)
      console.log("error message: ", error.message);
      console.log("uid:", user.uid);
      console.log('error due to text');
    }
    router.push("../(home)/savingbook");
  }

  //console.log(typeof amount);

  const handleDelete = async () => {
    setErrMsg('');

    try {
      await deleteTransaction(transactionid)
    } catch (error) {
      setErrMsg(error.message)
      console.log("error message: ", error.message);
    }
    router.push("../(home)/savingbook");
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2, top: 50, left: -150 }}>
        <Link href="../savingbook">
          <Ionicons name="arrow-back" size={40} color={'black'}/>
        </Link>
      </View>
      
      <View style={{ flex: 0.8, top: -30 }}>
        <Text style={styles.title}>Edit Transaction</Text>
      </View>

      <View style={{ flex: 2.5 }}>
          {/* income and expense choosing - no border around the words when unselected */}
          {incomeshow === false && expenseshow === false &&
          <View style={{ flexDirection:"row" }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
              onPress={typeIncome}>
              <Text style={ styles.setBlue }>Income</Text>
            </TouchableOpacity>
           <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
              onPress={typeExpense}>
              <Text style={ styles.setRed }>Expense</Text>
            </TouchableOpacity>
          </View>}

          {/* when user select income */}
          {incomeshow && expenseshow === false && 
          <View style={{ flexDirection:"row" }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.incomeContainer} 
              onPress={typeIncome}>
              <Text style={ styles.setBlue }>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
              onPress={typeExpense}>
              <Text style={ styles.setRed }>Expense</Text>
            </TouchableOpacity>
          </View>}
          
          {/* when user select expense */}
          {incomeshow === false && expenseshow &&
          <View style={{ flexDirection:"row" }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
              onPress={typeIncome}>
              <Text style={ styles.setBlue }>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.expenseContainer} 
              onPress={typeExpense}>
              <Text style={ styles.setRed }>Expense</Text>
            </TouchableOpacity>    
          </View>}

        {/* Android date picker */}
        { platform && (
        <View style={{ flexDirection:"row", top: 30 }}>
          <View style={styles.displayContainer}>
            <Text style={styles.body}>Date</Text>
          </View>
          
          <View style={styles.dateContainer}>
            {dateshow === false && (<TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
              onPress={showCalender}>
                <Text style={{textAlign: 'center', fontSize: 16}}>{displayDate}</Text>
              </TouchableOpacity>)
            }

            {dateshow && (
              <DateTimePicker 
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChange}
              />
            )}
          </View>
        </View>
        )}
        
        {/* ios date picker - removed the box that is around the date picker */}
        { platform === false && (
        <View style={{ flexDirection:"row", top: 30 }}>
          <View style={styles.displayContainer}>
            <Text style={styles.body}>Date</Text>
          </View>
          
          <View style={{ left: -10 }}>
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
          </View>
        </View>
        )}

        {/* category dropdown box */}
        <View style={{ flexDirection:"row", top: 50 }}>
          <View style={styles.displayContainer}>
            <Text style={styles.body}>Category</Text>
          </View>
         
          <View style={[styles.viewContainer, Platform.OS === 'ios'? {position:'relative', zIndex:99} : {position:'relative'}]}>
            <DropDownPicker
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              containerStyle={{height: 40}}
              zIndex={199}
              dropDownDirection="TOP"
            />
          </View>
        </View>

        {/* amount input */}
        <View style={{ flexDirection:"row", top: 80 }}>
          <View style={styles.displayContainer}>
            <Text style={styles.body}>Amount</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              keyboardType = 'numeric'
              value={String(amount)}
              onChangeText={setAmount} />
          </View>
        </View>

        {/* note input */}
        <View style={{ flexDirection:"row", top: 100  }}>
          <View style={styles.displayContainer}>
            <Text style={styles.body}>Note</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              value={note}
              onChangeText={setNote} />
          </View>
        </View>

        {/* delete and save button */}
        <View style={{ flexDirection:"row", top: 115 }}>
          <TouchableOpacity activeOpacity={0.8} style={styles.cancelContainer} 
            onPress={handleDelete}>
            <Text style={ styles.setWhite }>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity></TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.saveContainer} 
            onPress={handleSave}>
              <Text style={ styles.setWhite }>Save</Text>
          </TouchableOpacity>
        </View>
        {errMsg !== "" && <Text style={ {top: 80, left: 10} }>{errMsg}</Text>}
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {  
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    top: 100,
  },
  body: {
    color: "#38434D",
    textAlign: 'left'
  },
  income_expenseContainer: {
    width: 140,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeContainer: {
    width: 140,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2D6DE9',
  },
  expenseContainer: {
    width: 140,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EF2323',
  },
  viewContainer: { 
    zIndex: 1, 
    width:200, 
    minheight: 500 
  },
  cancelContainer: {
    backgroundColor: "#c5c5c5",
    width: 140,
    height: 50,
    padding: 15,
    borderRadius: 20,
    top: 30, 
  },
  saveContainer: {
    backgroundColor: "#c5c5c5",
    width: 140,
    height: 50,
    padding: 15,
    borderRadius: 20,
    top: 30, 
    left: 10,
  },
  setBlue: {
    color:'#2D6DE9',
    fontSize: 15,
    textAlign:"center",
    fontWeight: "bold",
  },
  setRed: {
    color:'#EF2323',
    fontSize: 15,
    textAlign:"center",
    fontWeight: "bold",
  },
  setWhite: {
    color:'white',
    fontSize: 14,
    textAlign:"center"
  },
  displayContainer : {
    height: 40,
    width: 100,
    padding: 10,
  },
  inputContainer : {
    height: 50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  dateContainer : {
    height: 50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    padding: 5,
  },
});