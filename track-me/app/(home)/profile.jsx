import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { useUserAuth } from "../../context/auth";
import { Link } from "expo-router";

export default function ProfilePage() {

  const { logOut, user } = useUserAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logOut();
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      <StatusBar style="auto" />
      <Button onPress={handleLogout} 
                mode="contained" buttonColor="#c5c5c5" style={ styles.signoutButton }>
                    Sign out</Button>
      <View>
        <Link href="../(profile)/profilecreationpage">
          <Button textColor="#8A8A8A">Edit Profile</Button>
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
  signoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
