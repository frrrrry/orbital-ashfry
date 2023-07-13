import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from "expo-router";
import TransactionRow from "../(savingbook)/transactionRow";
import { useUserAuth } from "../../context/auth";
import { useState, useEffect } from 'react';
import { getTransactions } from '../../firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

export default function SavingBookPage() {
  
  const { user } = useUserAuth();
  const [transactions, setTransactions] = useState([]);
  const [partialtransactions, setpartialTransactions] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  let TodayMonth = new Date(Date.now());
  TodayMonth = TodayMonth.getMonth() + 1;
  console.log("first todaymonth", TodayMonth);
  const [MonthNumber, setMonthNumber] = useState(TodayMonth);
  console.log("first MonthNumber", MonthNumber);
  const [MonthName, setMonthName] = useState(getMonthName(MonthNumber));
  const [loading, setLoading] = useState(false);

  let TodayYear = new Date(Date.now());
  TodayYear = TodayYear.getFullYear();
  const [year, setYear] = useState(TodayYear);

  let totalIncome = 0.00;
  let totalExpense = 0.00;
  let totalBalance = 0.00;
  let negtotalBalance = 0;
  
  for (let i = 0; i < partialtransactions.length; i++) {
    const res = partialtransactions[i];
    if (res.type == "Income") {
      totalIncome += parseFloat(res.amount);
    } else {
      totalExpense += parseFloat(res.amount);
    }
    totalBalance = totalIncome - totalExpense;
    if (totalBalance < 0) {
      negtotalBalance = totalBalance * -1;
    }
  }

  // Get transactions once user is logged in
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadData = async () => {
      let result = await getTransactions(user.uid);

      setTransactions(result);
      const current_month_transactions = result.filter((item) => item.year == year && item.month == MonthNumber);
      setpartialTransactions(current_month_transactions);
    };
    loadData();
    

    console.log("2nd todaymonth", TodayMonth);
    console.log("2nd MonthNumber", MonthNumber);
    console.log("transactions", transactions);
    console.log("partial transactions", partialtransactions);

  }, [isFocused]);

  const handlePrevMonth = async () => {
    if (MonthNumber == 1) {
        TodayYear = year - 1;
        TodayMonth = 12;
        setMonthNumber(TodayMonth);
        setMonthName(getMonthName(TodayMonth));
        setYear(TodayYear);
        const current_month_transactions = transactions.filter((item) => item.year == year-1&& item.month == MonthNumber+11)
      setpartialTransactions(current_month_transactions);
      console.log("if partial transactions", partialtransactions);
    } else {
      TodayMonth = MonthNumber - 1;
      setMonthNumber(MonthNumber - 1);
      setMonthName(getMonthName(MonthNumber-1));
      const current_month_transactions = transactions.filter((item) => item.year == year && item.month == MonthNumber-1)
      setpartialTransactions(current_month_transactions);
    }

      console.log("todayMonth: ", TodayMonth);
      console.log("MonthNumber: ", MonthNumber);
      console.log("MonthName: ", MonthName);
      console.log("partial transactions", partialtransactions);
      console.log("year", year);
      console.log("---------------------------------");
  }

  const handleNextMonth = async () => {
    if (MonthNumber == 12) {
      TodayYear = year + 1;
      TodayMonth = 1
      setMonthNumber(TodayMonth);
      setMonthName(getMonthName(TodayMonth));
      setYear(TodayYear);
      const current_month_transactions = transactions.filter((item) => item.year == year+1 && item.month == MonthNumber-11)
      setpartialTransactions(current_month_transactions);
    } else {
      TodayMonth = MonthNumber + 1;
      console.log("---------------------------------");
      setMonthNumber(TodayMonth);
      setMonthName(getMonthName(TodayMonth));
      console.log("next todaymonth", TodayMonth);
      const current_month_transactions = transactions.filter((item) => item.year == year && item.month == MonthNumber+1)
      setpartialTransactions(current_month_transactions);
    }

      console.log("MonthNumber: ", MonthNumber);
      console.log("MonthName: ", MonthName);
      console.log("year: ", year);
      //console.log("transactions", transactions);
      console.log("next partial transactions", partialtransactions);
      console.log("---------------------------------");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* header */}
      <View style={{ flex: 1 }}></View>

      <View style={{ flexDirection:"row", top: 65, left: 43, position: 'absolute'  }}>

        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={25} color={'black'}/>
        </TouchableOpacity>
        
        <Text style={{fontWeight: "bold", top: 5, width: 120, textAlign: 'center'}}>
          {MonthName} {year} </Text>

        <TouchableOpacity
        onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={25} color={'black'}/>
        </TouchableOpacity>
        
      </View>

      <View style={{ flexDirection:"row", top: 110, position: 'absolute'  }}>
        <View style={{ width: 120 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Income</Text>
          <Text style={{ textAlign: "center", color: '#2D6DE9', fontWeight: "bold", }}>${totalIncome.toFixed(2)}</Text>
        </View>

        <View style={{ width: 120 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Expense</Text>
          <Text style={{ textAlign: "center", color: '#EF2323', fontWeight: "bold", }}>${totalExpense.toFixed(2)}</Text>
        </View>
          
        <View style={{ width: 120 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Balance</Text>
          {totalBalance < 0
          ? <Text style={{ textAlign: "center", fontWeight: "bold" }}>-${negtotalBalance.toFixed(2)}</Text>
          : <Text style={{ textAlign: "center", fontWeight: "bold" }}>${totalBalance.toFixed(2)}</Text>
          }
          
        </View>
      </View>

      {/* transaction rows */}
      <View style={{ flex: 4.5 }}>
        <SafeAreaView style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          
          {partialtransactions.map((transaction) => (
            <View key={transaction.id}>
              <TransactionRow transaction={transaction} />
            </View>
          )
          )}
          
          </ScrollView>
        </SafeAreaView>
      </View>
      
      <View style={{ alignSelf: 'flex-end', position: "absolute", bottom: 0 } } >
        <Link href="../(savingbook)/addtransactionpage">
          <Ionicons name="ios-add-circle" size={65} color={'black'}/>
        </Link>
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
  contentContainer: {
    alignItems: 'center',
    width: 330,
    height: 580, 
    top: 20,
  },
  scrollView: {
    backgroundColor: 'white',
  }
});
