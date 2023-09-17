import { useContext, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AuthContext } from '../providers/auth';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

export default function SignUpScreen({ navigation }) {
  const universities = [
    { label: 'American University In Cairo', value: '1' },
    { label: 'German University In Cairo', value: '2' },
    { label: 'Future University In Cairo', value: '3' },
    { label: 'Cairo University', value: '4' },
    { label: 'Ain Shams University', value: '5' },
    { label: 'Canadian University In Cairo', value: '6' },
    { label: 'Britsh University In Cairo', value: '7' },
  ];
  const intrests = [
    { label: 'Drawing', value: '1' },
    { label: 'Dentistry', value: '2' },
    { label: 'Sculpture', value: '3' },
    { label: 'Mechanics', value: '4' },
    { label: 'Electronics', value: '5' },
    { label: 'Maths', value: '6' },
    { label: 'Astronomy', value: '7' },
  ];
  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);
  const [registerData, setRegisterData] = useState({
    email: null,
    password: null,
  });

  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const { setUser, register } = useContext(AuthContext);
  const [currentscreen, setCurrentscreen] = useState(0);
  function nextScreen() {
    setCurrentscreen(currentscreen + 1);
  }
  function prevScreen() {
    setCurrentscreen(currentscreen - 1);
  }
  function submit() {
    register({
      ...registerData,
      prefrences: {
        categories: selected,
        type: 'University',
        entityName: dropdown,
        major: registerData.faculty,
        year: registerData.year,
      },
    })
      .then(res => {
        setUser(res.data.user)
        setToken(res.data.token)

        try {
          AsyncStorage.multiSet([
            [
              'token',
              res.data.token,
            ],
            [
              'user',
              JSON.stringify(res.data.user),
            ]
          ]
          );
        } catch (error) {
          // Error saving data
        }
      })
      .catch(e => {
        alert(e.response.data.err);
      });
  }

  const onChangehandle = (value, field) => {
    if (field == 'address') {
      setRegisterData({
        ...registerData,
        [field]: [{ address: value }],
      });
    } else {
      setRegisterData({
        ...registerData,
        [field]: value,
      });
    }
  };

  return (
    <>
      {currentscreen === 0 ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.holder}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Let's get to know you more</Text>
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'firstname')}
              value={registerData.firstname}
              style={styles.textInput}
              placeholder="First Name"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'lastname')}
              value={registerData.lastname}
              style={styles.textInput}
              placeholder="Last Name"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'dateOfBirth')}
              value={registerData.dateOfBirth}
              style={styles.textInput}
              placeholder="Date of Birth"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'address')}
              value={registerData.address}
              style={styles.textInput}
              placeholder="Address"
            />
          </View>
          <View style={styles.steps}>
            <Pressable
              onPress={nextScreen}
              style={[styles.button, styles.stepsBtn]}>
              <Text style={styles.buttontext}>NEXT</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <></>
      )}

      {currentscreen === 1 ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.holder}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>We are almost there</Text>
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'mobileNumber')}
              value={registerData.mobileNumber}
              style={styles.textInput}
              placeholder="Mobile Number"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'username')}
              value={registerData.username}
              style={styles.textInput}
              placeholder="Username"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              onChangeText={$event => onChangehandle($event, 'email')}
              value={registerData.email}
              style={styles.textInput}
              placeholder="Email Address"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              secureTextEntry={true}
              onChangeText={$event => onChangehandle($event, 'password')}
              value={registerData.password}
              style={styles.textInput}
              placeholder="Create Password"
            />
          </View>
          <View style={styles.steps}>
            <Pressable
              onPress={prevScreen}
              style={[styles.button, styles.stepsBtn]}>
              <Text style={styles.buttontext}>Back</Text>
            </Pressable>
            <Pressable
              onPress={nextScreen}
              style={[styles.button, styles.stepsBtn]}>
              <Text style={styles.buttontext}>NEXT</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <></>
      )}

      {currentscreen === 2 ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.holder}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>We are almost there</Text>

            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.shadow}
              data={universities}
              search
              searchPlaceholder="Search"
              labelField="label"
              valueField="value"
              label="Dropdown"
              placeholder="University"
              placeholderStyle={styles.placeholder}
              value={dropdown}
              onChange={item => {
                setDropdown(item.value);
                console.log('selected', item);
              }}
              // renderLeftIcon={() => (
              //     // <Image style={styles.icon} source={require('./assets/account.png')} />
              // )}
              renderItem={item => _renderItem(item)}
              textError="Error"
            />

            <MultiSelect
              style={styles.dropdown}
              data={intrests}
              labelField="label"
              valueField="value"
              label="Multi Select"
              placeholder="Intrests"
              search
              searchPlaceholder="Search"
              placeholderStyle={styles.placeholder}
              value={selected}
              onChange={item => {
                setSelected(item);
                console.log('selected', item);
              }}
              renderItem={item => _renderItem(item)}
            />

            <TextInput
              placeholderTextColor={"#aaaaaa"}
              style={styles.textInput}
              onChangeText={$event => onChangehandle($event, 'faculty')}
              value={registerData.faculty}
              placeholder="Faculty"
            />
            <TextInput
              placeholderTextColor={"#aaaaaa"}
              style={styles.textInput}
              onChangeText={$event => onChangehandle($event, 'year')}
              value={registerData.year}
              placeholder="Year"
            />
          </View>
          <View style={styles.steps}>
            <Pressable
              onPress={prevScreen}
              style={[styles.button, styles.stepsBtn]}>
              <Text style={styles.buttontext}>Back</Text>
            </Pressable>
            <Pressable
              onPress={submit}
              style={[styles.button, styles.stepsBtn]}>
              <Text style={styles.buttontext}>FINISH</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <></>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  placeholder: {
    color: '#b7b7b7',
    fontSize: 15,
  },
  dropdown: {
    padding: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
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
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
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
  steps: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  stepsBtn: {
    width: '40%',
  },

  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
