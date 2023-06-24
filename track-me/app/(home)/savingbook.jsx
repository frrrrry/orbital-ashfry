import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
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

  let totalIncome = 0.00;
  let totalExpense = 0.00;
  let totalBalance = 0.00;
  let negtotalBalance = 0;
  
  for (let i = 0; i < transactions.length; i++) {
    const res = transactions[i];
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
      const result = await getTransactions(user.uid);
      setTransactions(result);
    };
    loadData();

  }, [isFocused]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* header */}
      <View style={{ flex: 1 }}></View>
      <View style={{ flexDirection:"row", top: 80, position: 'absolute'  }}>
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
      <View style={{ flex: 4.2 }}>
        <SafeAreaView style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          
          {transactions.map((transaction) => (
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
    height: 580
  },
  scrollView: {
    backgroundColor: 'white',
  }
});
