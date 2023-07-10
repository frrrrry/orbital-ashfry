import { SafeAreaView, View, FlatList, StyleSheet, Text, } from "react-native";
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First wallet\n(subwallet reminders to be implemented in ms3)',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second wallet',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third wallet',
  },
];

const Item = ({ title, totalAmount, currAmount, id }) => (
  <View key={id} style={styles.item}>
    <Text style={styles.percentage}>
      {((currAmount / totalAmount) * 100).toFixed(1)}%</Text>
    <Text style={styles.subText}>closer towards:</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
)

export const SubwalletReminders = (props) => {
  const wallets = props.wallets;
  // console.log("subwallet reminders", wallets); 

  const renderItem = ({ item }) => (
    <Item 
      id={item.id} 
      title={item.title} 
      totalAmount={item.totalAmount}
      currAmount={item.currAmount} 
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={wallets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#e1e1e1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 170,
    width: 220,
    borderRadius: 20,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    top: 10, 
    color: '#EF2323', 
    fontWeight: 'bold', 
  },
  percentage: {
    fontSize: 30, 
    fontWeight: 'bold',
    textAlign:'left',
    color: '#585858',
  }, 
  subText: {
    fontSize: 15, 
    color: '#8a8a8a'
  }, 
})
