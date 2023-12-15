import { useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../providers/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const { setUser, login, setToken } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: null,
    password: null
  })

  const onChangehandle = (value, field) => {
    setLoginData({
      ...loginData,
      [field]: value
    })
  }

  const submit = () => {
    if(!loginData.email || !loginData.password) {
      alert("Email or password is missing")
      return
    } 
    // else if(loginData.email) {
      // TODO: check email pattern
    // }
    
    login(loginData.email, loginData.password).then(
      res => {
        try {
          if(!res) {
            throw "Something went wrong"
          }
          setToken(res.data.token)
          setUser(res.data.user)

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
          alert(error || 'Something went wrong!')
        }
      }
    ).catch(e => {
      alert(e.response?.data?.err || 'Something went wrong!')
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holder}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <TextInput style={styles.textInput}
          onChangeText={($event) => onChangehandle($event, "email")}
          value={loginData.email}
          placeholder="Email"
          placeholderTextColor={"#aaaaaa"}
        />
        <TextInput secureTextEntry={true} style={styles.textInput}
          onChangeText={($event) => onChangehandle($event, "password")}
          value={loginData.password}
          placeholder="Password"
          placeholderTextColor={"#aaaaaa"}
        />
        <Pressable><Text style={styles.link}>Forgot your Password?</Text></Pressable>
        <Pressable style={styles.button} onPress={submit}><Text style={styles.buttontext}>SIGN IN</Text></Pressable>

      </View>
      <View style={styles.signup}><Text>Don't have an account? </Text><Pressable onPress={() => navigation.navigate("Signup")}><Text style={styles.signupbuttontext} >Signup</Text></Pressable></View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  signupbuttontext: {
    fontWeight: 700
  },
  signup: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",

  },
  buttontext: {
    color: "white",
    fontWeight: 700,
    fontSize: 15
  },
  button: {
    backgroundColor: "#FFE605",
    borderRadius: 20,
    padding: 14,
    width: "50%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "white"
  },
  holder: {
    paddingHorizontal: 24,
    paddingTop: 120
  },
  title: {
    alignSelf: "flex-start",
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
    borderColor: "white",
    borderRadius: 8,
    width: "100%",
    backgroundColor: "white",
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  link: {
    alignSelf: "flex-end",
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
})