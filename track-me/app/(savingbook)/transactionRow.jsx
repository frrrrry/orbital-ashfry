
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import {format} from 'date-fns';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function TransactionRow(props) {
  const router = useRouter();

  const transaction = props.transaction;

  let amountColor = 'black';
  if (transaction.type == "Income") {
    amountColor = '#2D6DE9'
  } else {
    amountColor = '#EF2323'
  }

  const handleEdit = async () => {
    AsyncStorage.setItem('transactionid', transaction.id);
    AsyncStorage.setItem('transactionType', transaction.type);
    AsyncStorage.setItem('transactionCategory', transaction.category);
    await AsyncStorage.setItem('transactionAmount', JSON.stringify(transaction.amount));
    AsyncStorage.setItem('transactionNote', transaction.note);
    await AsyncStorage.setItem('transactionMonth', JSON.stringify(transaction.month));
    await AsyncStorage.setItem('transactionYear', JSON.stringify(transaction.year));
    await AsyncStorage.setItem('transactionDate', JSON.stringify(transaction.date));

    router.push("/edittransaction");
  }

  const handleDelete = () => {
    AsyncStorage.setItem('transactionid', transaction.id);
    router.push("/edittransaction");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <TouchableOpacity onPress={handleEdit}> 
          <Text style={{ fontWeight: "bold" }}>{format(transaction.date, 'dd MMM')}</Text>

            <View style={{ flexDirection:"row", top: 0  }}>
              <View style={{ width: 95 }}>
                <Text>{transaction.category}</Text>
              </View>

              <View style={{ width: 105 }}>
                <Text>{transaction.note}</Text>
              </View>

              <View style={{ width: 105 }}>
                <Text style={{ textAlign: "right", color: amountColor }}>${parseFloat(transaction.amount).toFixed(2)}</Text>
              </View>
            </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      height: 50
  },
  scrollView: {
    backgroundColor: 'white',
  }
});