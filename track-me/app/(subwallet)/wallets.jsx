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
import { getWallet, deleteWallet } from '../../firebase/firestore';
import { AntDesign, } from '@expo/vector-icons';
import ProgressBar from 'react-native-progress/Bar';

const DATA = [
  {
    id: 1,
    title: 'birthday gift'
  },
  {
    id: 2,
    title: 'taylor swift concert'
  },
  {
    id: 3,
    title: 'new laptop'
  },
  {
    id: 4, 
    title: 'japan trip'
  },
  {
    id: 5, 
    title: 'test'
  }
]

// console.log("test data", DATA);

const Wallet = (props) => {
  const wallets = props.wallets; 
  // console.log('walletpage', wallets);
  const isFocused = useIsFocused();
  
  const [listData, setListData] = useState([]); 

  useEffect(() => {
    const result = wallets.map((walletItem) => ({
      key: walletItem.id,
      title: walletItem.title,
      startDate: walletItem.startDate,
      endDate: walletItem.endDate,
      note: walletItem.note,
      totalAmount: walletItem.totalAmount,
      currAmount: walletItem.currAmount,
    }))
    
    setListData(result); 
  }, [wallets]);

  /*
  const [listData, setListData] = useState(
    wallets.map((walletItem) => ({
      key: walletItem.id,
      title: walletItem.title,
    }))
  );
  */

  const router = useRouter();

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  const findArrayItemById = (array, id) => {
    return array.find((item) => {
      return item.id == id; 
    })
  }

  const editRow = async (rowMap, rowKey) => {
    closeRow(rowMap, rowKey); 
    // console.log("walletid", rowKey);
    // console.log("walletItem", rowMap[rowKey]); 
    const walletItem = findArrayItemById(wallets, rowKey); 
    // console.log("walletItem2", walletItem); 
   
    AsyncStorage.setItem('walletId', rowKey); 
    AsyncStorage.setItem('walletTitle', walletItem.title); 
    await AsyncStorage.setItem('walletStartDate', JSON.stringify(walletItem.startDate));
    await AsyncStorage.setItem('walletEndDate', JSON.stringify(walletItem.endDate));
    AsyncStorage.setItem('walletNote', walletItem.note);
    await AsyncStorage.setItem('walletTotalAmount', walletItem.totalAmount);
    await AsyncStorage.setItem('walletCurrAmount', walletItem.currAmount);

    router.push("/editwalletpage");
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey); 
    deleteWallet(rowKey);
    const newData = [...listData]; 
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1); 
    setListData(newData);
  }

  const addMoney = async (rowMap, rowKey) => {
    const walletItem = findArrayItemById(wallets, rowKey); 
    // console.log("walletItem", walletItem);
    AsyncStorage.setItem('walletId', rowKey); 
    await AsyncStorage.setItem('walletCurrAmount', walletItem.currAmount);
    router.push("/addmoneypage");
  }

  const convertMsToDays = ms => {
    const msInOneSecond = 1000
    const secondsInOneMinute = 60
    const minutesInOneHour = 60
    const hoursInOneDay = 24
  
    const minutesInOneDay = hoursInOneDay * minutesInOneHour
    const secondsInOneDay = secondsInOneMinute * minutesInOneDay
    const msInOneDay = msInOneSecond * secondsInOneDay
  
    return Math.ceil(ms / msInOneDay)
  }
  
  const getDaysBetweenDates = (dateOne, dateTwo) => {
    let differenceInMs = dateTwo.getTime() - dateOne.getTime()
  
    if (differenceInMs < 0) {
      differenceInMs = dateOne.getTime() - dateTwo.getTime()
    }
  
    return convertMsToDays(differenceInMs)
  }
  
  const convertToDate = (date) => {
    let tempDate = ''; 
    if (date.getMonth() + 1 > 9) {
      tempDate = tempDate + (date.getMonth() + 1) + '/' + date.getDate()
        + '/' + date.getFullYear();
    } else {
      tempDate = tempDate + '0' + (date.getMonth() + 1) + '/' + date.getDate()
        + '/' + date.getFullYear();
    }
    return tempDate; 
  }

  // const dateDiff = getDaysBetweenDates(new Date(Date.now()), endDate);

  const VisibleItem = props => {
    const {data, onAdd} = props; 

    return (
      <Animated.View style={styles.rowFront}> 
        <TouchableHighlight 
          style={styles.rowFrontVisible}
          onPress={onAdd}
          underlayColor={'#c5c5c5'}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.title}>{data.item.title}</Text>
              <Text style={styles.date}>
                {getDaysBetweenDates(new Date(Date.now()), data.item.endDate).toString()} days left
              </Text>
            </View>
            <Text style={styles.totalAmount}>
              ${data.item.currAmount} / ${data.item.totalAmount}</Text>
            <View style={{ top: 7, flexDirection: 'row' }}>
            <ProgressBar 
              progress={data.item.currAmount / data.item.totalAmount} 
              width={200} 
              height={25}
              borderRadius={20}
              color="#8a8a8a"
            />  
            <Text style={{ left: 10, color: '#666', fontWeight: 500 }}>
              {((data.item.currAmount / data.item.totalAmount) * 100).toFixed(1)}%</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    ); 
  }

  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem
        data={data}
        onAdd={() => addMoney(rowMap, data.item.key)}
      />  
    );
  }

  const HiddenItemWithActions = props => {
    const {onEdit, onDelete} = props; 

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity 
          style={[styles.backBtn, styles.backBtnLeft]}
          onPress={onEdit}> 
          <AntDesign name="edit" size={22} color="#fff" style={styles.icon} /> 
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.backBtn, styles.backBtnRight]}
          onPress={onDelete}> 
          <AntDesign name="delete" size={22} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onEdit={() => editRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)} 
      />
    )
  }

  return (
    <View style={styles.container}>
      <SwipeListView 
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        />
    </View>
  )
}

export default Wallet; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    top: 30,
  },
  rowFront: {
    backgroundColor: '#fff',
    borderRadius: 15, 
    height: 122,
    width: 300,
    margin: 5,
    marginBottom: 15,
    top: -5, 
    left: -5
  },
  rowFrontVisible: {
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    height: 122,
    width: 310,
    padding: 10,
    marginBottom: 8,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 8,
  },
  backBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 80,
    height: 122,
    paddingRight: 17,
  },
  backBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 80,
    height: 122,
  },
  backBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: 122,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
    left: 5,
    width: 200, 
    height: 30,
  },
  date: {
    textAlign: 'right', 
    color: "#8a8a8a", 
    width: 90,
    height: 30,
  },
  totalAmount: {
    fontSize: 17, 
    fontWeight: 600,
    color: '#666',
    left: 5, 
  },
  icon: {
    height: 25,
    width: 25, 
    marginRight: 7,
  },
})  