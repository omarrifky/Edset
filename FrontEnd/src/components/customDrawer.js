import React, {useContext} from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../providers/auth';
import {toTitleCase} from '../screens/Categories';

const CustomDrawer = props => {
  const {navigation} = props;
  const {setUser, user, token, setToken, logout} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(token);
    } catch(e) {
      e && alert(e);
    } 
    setUser(false);
    setToken(undefined);
    navigation.closeDrawer();
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.titleHolder}>
        <Image style={styles.pic} source={{uri: user.imageURL}} />
        <Text style={[styles.text, styles.title]}>
          {toTitleCase(user.firstname)} {toTitleCase(user.lastname)}
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <View>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Home', {screen: 'Orders', initial: false});
              navigation.closeDrawer();
            }}>
            <Text style={styles.text}>Orders</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            title="Account"
            onPress={() => {
              navigation.navigate('Home', {screen: 'Account', initial: false});
              navigation.closeDrawer();
            }}>
            <Text style={styles.text}>Account</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            title="Customer Service"
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'CustomerService',
                initial: false,
              });
              navigation.closeDrawer();
            }}>
            <Text style={styles.text}>Customer Service</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            title="Settings"
            onPress={() => {
              navigation.navigate('Home', {screen: 'Settings', initial: false});
              navigation.closeDrawer();
            }}>
            <Text style={styles.text}>Settings</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.logout}>
        <Pressable
          style={styles.btn}
          title="Logout"
          onPress={() => handleLogout()}>
          <Text style={[styles.text, styles.logoutTxt]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safe: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  spread: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pic: {
    width: 50,
    height: 50,
    borderWidth: 1,
    marginRight: 18,
    borderRadius: 50,
    borderColor: '#AAAAAA',
  },
  btn: {
    marginBottom: 12,
  },
  logoutTxt: {
    fontSize: 16,
  },
  container: {
    paddingTop: 12,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    padding: 18,
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  titleHolder: {
    padding: 18,
    display: 'flex',
    marginBottom: 18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    padding: 0,
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
});
export default CustomDrawer;
