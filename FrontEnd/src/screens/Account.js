import {useContext, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
} from 'react-native';
import TopBar from '../components/topBar';
import {AuthContext} from '../providers/auth';
import UsersService from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toTitleCase} from './Categories';
export default function AccountScreen({navigation}) {
  const [edit, setEdit] = useState(false);
  const {user, token, setUser} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: user.email,
    lastname: user.lastname,
    firstname: user.firstname,
    mobileNumber: user.mobileNumber,
  });

  function editInfo(flag) {
    console.log('USER DATA', user);
    if (!flag) {
      UsersService.updateUser(userData, token).then(async res => {
        console.log(res);
        setUser(res.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        alert('Edited successfully');
      });
    }
    setEdit(flag);
  }
  const onChangehandle = (value, field) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <View style={styles.body}>
        <View style={styles.holder}>
          <View style={styles.titleHolder}>
            <Image
              style={styles.pic}
              source={{
                uri: user.imageURL,
              }}
            />
            <Text style={[styles.text, styles.title]}>
              {toTitleCase(user.firstname)} {toTitleCase(user.lastname)}
            </Text>
          </View>
          <ScrollView>
            <View style={styles.inputsHolder}>
              <TextInput
                style={styles.textInput}
                onChangeText={$event => onChangehandle($event, 'firstname')}
                value={userData.firstname}
                placeholder="firstname"
                placeholderTextColor={"#aaaaaa"}
                editable={edit}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={$event => onChangehandle($event, 'lastname')}
                value={userData.lastname}
                placeholderTextColor={"#aaaaaa"}
                placeholder="lastname"
                editable={edit}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"#aaaaaa"}
                onChangeText={$event => onChangehandle($event, 'email')}
                value={userData.email}
                placeholder="Email"
                editable={edit}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"#aaaaaa"}
                onChangeText={$event => onChangehandle($event, 'mobileNumber')}
                value={userData.mobileNumber}
                placeholder="Mobile Number"
                editable={edit}
              />
            </View>
          </ScrollView>
          {edit === false ? (
            <SafeAreaView>
              <Pressable onPress={() => editInfo(true)} style={styles.button}>
                <Text style={styles.buttontext}>Edit Info</Text>
              </Pressable>
            </SafeAreaView>
          ) : (
            <SafeAreaView>
              <Pressable onPress={() => editInfo(false)} style={styles.button}>
                <Text style={styles.buttontext}>Save</Text>
              </Pressable>
            </SafeAreaView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  inputsHolder: {
    paddingBottom: 24,
  },
  signupbuttontext: {
    fontWeight: 700,
  },
  signup: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttontext: {
    color: 'white',
    fontWeight: 700,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#FFE605',
    borderRadius: 20,
    padding: 14,
    width: '50%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  holder: {
    paddingHorizontal: 24,
    // paddingTop: 120,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 50,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    padding: 12,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: {width: -2, height: 8},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  link: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
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
  pic: {
    width: 50,
    height: 50,
    borderWidth: 1,
    marginRight: 18,
    borderRadius: 50,
    borderColor: '#AAAAAA',
  },
});
