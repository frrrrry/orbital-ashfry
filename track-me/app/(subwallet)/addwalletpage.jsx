import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Platform } from 'react-native';
import { useState } from "react";
import { useUserAuth } from "../../context/auth";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { addWallet } from '../../firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from "expo-router";

export default function AddWalletPage() {
    const navigation = useNavigation();
    const router = useRouter();
    const platform = Platform.OS != 'ios';

    const { user } = useUserAuth();
    const [errMsg, setErrMsg] = useState('');
  
    // text input - title and note
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    // text input - total amount and current amount
    const [totalAmount, setTotalAmount] = useState(0);
    const [currAmount, setCurrAmount] = useState(0);

    // for start date picker
    const [startDate, setStartDate] = useState(new Date());
    const [startDateShow, setStartDateShow] = useState(false);

    let TodayStartDate = new Date(Date.now());
    TodayStartDate = TodayStartDate.getDate() + '/' + (TodayStartDate.getMonth() + 1) 
                    + '/' + TodayStartDate.getFullYear();

    const [displayStartDate, setdisplayStartDate] = useState(TodayStartDate);

    const onStartChange = (event, selectedStartDate) => {
        const currentStartDate = selectedStartDate || startDate;
        setStartDateShow(false);
        setStartDate(currentStartDate);

        let tempStartDate = new Date(currentStartDate);
        let fStartDate = tempStartDate.getDate() + '/' + (tempStartDate.getMonth() + 1) 
                    + '/' + tempStartDate.getFullYear();
        setdisplayStartDate(fStartDate);
        console.log('start date', displayStartDate);
    };

    const showStartCalender = () => {setStartDateShow(true); };

    // for end date picker
    const [endDate, setEndDate] = useState(new Date());
    const [endDateShow, setEndDateShow] = useState(false);

    let TodayEndDate = new Date(Date.now());
    TodayEndDate = TodayEndDate.getDate() + '/' + (TodayEndDate.getMonth() + 1) 
                    + '/' + TodayEndDate.getFullYear();

    const [displayEndDate, setdisplayEndDate] = useState(TodayEndDate);

    const onEndChange = (event, selectedEndDate) => {
        const currentEndDate = selectedEndDate || endDate;
        setEndDateShow(false);
        setEndDate(currentEndDate);

        let tempEndDate = new Date(currentEndDate);
        let fEndDate = tempEndDate.getDate() + '/' + (tempEndDate.getMonth() + 1) 
                    + '/' + tempEndDate.getFullYear();
        setdisplayEndDate(fEndDate);
        console.log('end date', displayEndDate);
        const endDateOther = new Date("15/7/2012") == new Date("15/6/2013");
        console.log("end date other", endDateOther); 
    };

    const showEndCalender = () => {setEndDateShow(true); };

    const dateConverter = (date) => {
    
    }

    const handleSave = async () => {
        setErrMsg('');
        if (title == '') {
          setErrMsg("Title cannot be empty")
          return;
        }
        if (totalAmount == 0) {
          setErrMsg("Total Amount cannot be empty")
          return;
        } else if (totalAmount <= 0) {
          setErrMsg("Total Amount must be more than 0")
          return;
        }
        if (currAmount < 0)  {
          setErrMsg("Current Amount must be more than 0")
          return;
        } 
        if (endDate < startDate) {
          setErrMsg("End Date cannot be before Start Date")
          return; 
        }
        if (currAmount > totalAmount) {
          setErrMsg("Current Amount cannot be more than Total Amount")
          return; 
        }
    
        // add to firestore collection 
        try {
            await addWallet(user.uid, title, parseFloat(totalAmount).toFixed(2), parseFloat(currAmount).toFixed(2), note, startDate, endDate);
        } catch (error) {
            setErrMsg(error.message)
            console.log("error message: ", error.message);
            console.log("uid:", user.uid);
            console.log('error due to addWallet');
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
          
          <View style={{ flex: 0.8, top: -60 }}>
            <Text style={styles.pageTitle}>Add Wallet</Text>
          </View>
    
          <View style={{ flex: 3 }}>
    
            {/* title */}
            <View style={{ flexDirection:"row", top: -15 }}>
              <View style={styles.displayContainer}>
                <Text style={styles.body}>Title</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='title'
                  autoCapitalize='none'
                  value={title}
                  onChangeText={setTitle} />
              </View>
            </View>

            {/* Start Date */}
            {/* Android date picker */}
            { platform && (
            <View style={{ flexDirection:"row", top: 0 }}>
              <View style={styles.displayContainer}>
                <Text style={styles.body}>Start Date</Text>
              </View>
              
              <View style={styles.dateContainer}>
                {startDateShow === false && (<TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
                  onPress={showStartCalender}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>{displayStartDate}</Text>
                  </TouchableOpacity>)
                }
    
                {startDateShow && (
                  <DateTimePicker 
                  testID="dateTimePicker"
                  value={startDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onStartChange}
                  />
                )}
              </View>
            </View>
            )}
            
            {/* ios date picker - removed the box that is around the date picker */}
            { platform === false && (
            <View style={{ flexDirection:"row", top: 0 }}>
              <View style={styles.displayContainer3}>
                <Text style={styles.body}>Start Date</Text>
                
              </View>
              
              <View style={{ left: -10 }}>
                <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onStartChange}
                />
              </View>
            </View>
            )}

            {/* End Date */}
            {/* Android date picker */}
            { platform && (
            <View style={{ flexDirection:"row", top: 15 }}>
              <View style={styles.displayContainer}>
                <Text style={styles.body}>End Date</Text>
              </View>
              
              <View style={styles.dateContainer}>
                {endDateShow === false && (<TouchableOpacity activeOpacity={0.8} style={styles.income_expenseContainer} 
                  onPress={showEndCalender}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>{displayEndDate}</Text>
                  </TouchableOpacity>)
                }
    
                {endDateShow && (
                  <DateTimePicker 
                  testID="dateTimePicker"
                  value={endDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onEndChange}
                  />
                )}
              </View>
            </View>
            )}
            
            {/* ios date picker - removed the box that is around the date picker */}
            { platform === false && (
            <View style={{ flexDirection:"row", top: 15 }}>
              <View style={styles.displayContainer}>
                <Text style={styles.body}>End Date</Text>
              </View>
              
              <View style={{ left: -10 }}>
                <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onEndChange}
                />
              </View>
            </View>
            )}

            {/* note input */}
            <View style={{ flexDirection:"row", top: 30  }}>
              <View style={styles.displayContainer}>
                <Text style={styles.body}>Note</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='note'
                  autoCapitalize='none'
                  value={note}
                  onChangeText={setNote} />
              </View>
            </View>
    
            {/* total amount input */}
            <View style={{ flexDirection:"row", top: 45 }}>
              <View style={styles.displayContainer2}>
                <Text style={styles.body}>Total</Text>
                <Text style={styles.body}>Amount</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType = 'numeric'
                  value={String(totalAmount)}
                  onChangeText={(text) => {
                    const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
                    if (validated) {
                      setTotalAmount(text)
                    }
                  }} 
                />
              </View>
            </View>
            
            {/* current amount input */}
            <View style={{ flexDirection:"row", top: 60 }}>
              <View style={styles.displayContainer2}>
                <Text style={styles.body}>Current</Text>
                <Text style={styles.body}>Amount</Text>
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType = 'numeric'
                  value={String(currAmount)}
                  onChangeText={(text) => {
                    const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
                    if (validated) {
                      setCurrAmount(text)
                    }
                  }}
                />
              </View>
            </View>
             
    
            {/* save button */}
            <View style={{ flexDirection:"row", top: 80 }}>
    
    
              <TouchableOpacity activeOpacity={0.8} style={styles.saveContainer} 
                onPress={handleSave}>
                  <Text style={ styles.setWhite }>Save</Text>
              </TouchableOpacity>
            </View>
            {errMsg !== "" && <Text style={{ top: 20, alignSelf: 'center', textAlign: 'center' }}>{errMsg}</Text>}
          
          </View>
        </View>
      );  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageTitle: {  
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "left",
      top: 100,
    },
    body: {
      color: "#38434D",
      textAlign: 'left',
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
      height: 45,
      padding: 15,
      borderRadius: 20,
      top: 30, 
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
    setWhite: {
      color:'white',
      fontSize: 14,
      textAlign:"center"
    },
    displayContainer : {
      height: 42,
      width: 100,
      padding: 10,
    },
    displayContainer2: {
      height: 42, 
      width: 100,
      padding: 10,
      top: -7,
    },
    displayContainer3: {
      height: 42, 
      width: 100,
      padding: 7,
      top: 0,
    },
    inputContainer : {
      height: 52,
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
  
