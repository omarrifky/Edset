import {useContext, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
export default function AccountScreen({navigation}) {
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
  });

  function editInfo(flag) {
    if(!flag) {
      alert('Edited successfully');
    }
    setEdit(flag);
  }
  const onChangehandle = (value, field) => {
    setUserData({
      ...userData,
      [field]: value
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holder}>
        <View style={styles.titleHolder}>
          <Image
            style={styles.pic}
            source={{
              uri: 'https://scontent.fcai2-2.fna.fbcdn.net/v/t1.6435-9/78416817_10218449129812468_5834337807438446592_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RhmGHff4ErYAX_u8Rsd&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBZHofQDA_ct-42lh03bD-loNMK9Lfv5Fq5lUwWKt4vAA&oe=63FE5852',
            }}
          />
          <Text style={[styles.text, styles.title]}>Khaled Mahmoud</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={$event => onChangehandle($event, 'username')}
          value={userData.name}
          placeholder="Username"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={$event => onChangehandle($event, 'email')}
          value={userData.name}
          placeholder="Email"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={$event => onChangehandle($event, 'password')}
          value={userData.name}
          placeholder="Password"
          editable={edit}
        />
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
    paddingTop: 120,
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
    justifyContent: 'space-between',
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
