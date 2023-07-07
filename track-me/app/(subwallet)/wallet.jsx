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
  }
]

const Wallet = () => {
  const { user } = useUserAuth();
  // const wallets = getWallet(user.uid); 
  /*
  const [data, setData] = useState(
    wallets.map((walletItem) => ({
      key: walletItem.id,
      title: walletItem.title,
    })),
  );
  */

  const [listData, setListData] = useState(
    DATA.map((dataItem) => ({
      key: dataItem.id,
      title: dataItem.title
    })) 
  )

  const router = useRouter();

  const editRow = (rowMap, rowKey) => {
    AsyncStorage.setItem('walletid', rowMap[rowKey]); 
    router.push("/editwalletpage");
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey); 
    // deleteWallet(rowMap[rowKey]);
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

  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem
        data={data}
      />  
    );
  }

  const HiddenItemWithActions = props => {
    const {onClose, onDelete} = props; 

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity 
          style={[styles.backBtn, styles.backBtnLeft]}
          onPress={onClose}> 
          <AntDesign name="edit" size={22} color="#c5c5c5" style={styles.icon} /> 
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.backBtn, styles.backBtnRight]}
          onPress={onDelete}> 
          <AntDesign name="delete" size={22} color="#c5c5c5" style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
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
    height: 110,
    // width: 300,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    height: 110,
    width: 300,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    height: 10,
  },
  backBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 80,
    height: 110,
    paddingRight: 17,
  },
  backBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 80,
    height: 110,
  },
  backBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: 110,
  },
  title: {
    fontSize: 15,
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
