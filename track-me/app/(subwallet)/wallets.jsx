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
  console.log('walletpage', wallets);
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
  }, [isFocused]);

  /*
  const [listData, setListData] = useState(
    wallets.map((walletItem) => ({
      key: walletItem.id,
      title: walletItem.title,
    }))
  );
  */

  const router = useRouter();

  const editRow = async (rowMap, rowKey) => {
    AsyncStorage.setItem('walletId', rowKey); 
    AsyncStorage.setItem('walletTitle', rowMap[rowKey].title); 
    await AsyncStorage.setItem('walletStartDate', JSON.stringify(rowMap[rowKey].startDate));
    await AsyncStorage.setItem('walletEndDate', JSON.stringify(rowMap[rowKey].endDate));
    AsyncStorage.setItem('walletNote', rowMap[rowKey].note);
    await AsyncStorage.setItem('walletTotalAmount', JSON.stringify(rowMap[rowKey].totalAmount));
    await AsyncStorage.setItem('walletCurrAmount', JSON.stringify(rowMap[rowKey].currAmount));

    router.push("/editwalletpage");
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey); 
    deleteWallet(rowKey);
    const newData = [...listData]; 
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1); 
    setListData(newData);
  }

  const VisibleItem = props => {
    const {data} = props; 

    return (
      <Animated.View style={styles.rowFront}> 
        <TouchableHighlight 
          style={styles.rowFrontVisible}
          onPress={() => console.log("wallet element touched")}
          underlayColor={'#c5c5c5'}>
          <View>
            <Text style={styles.title}>{data.item.title}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    ); 
  }

  const renderItem = (data) => {
    return (
      <VisibleItem
        data={data}
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
  },
  icon: {
    height: 25,
    width: 25, 
    marginRight: 7,
  },
})  