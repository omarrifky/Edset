import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen({ navigation }) {
  const [currentscreen, setCurrentscreen] = useState(0);
  function nextScreen() {
    setCurrentscreen(currentscreen + 1);
  }
  function prevScreen() {
    setCurrentscreen(currentscreen - 1);
  }
  function submit() {
    alert("Registered successfully")
  }

  return (
    <>
      {currentscreen === 0 ? <SafeAreaView style={styles.container}>
        <View style={styles.holder}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Let's get to know you more</Text>
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="First Name"
          />
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="Last Name"
          /><TextInput style={styles.textInput}
            // value={number}
            placeholder="Date of Birth"
          /><TextInput style={styles.textInput}
            // value={number}
            placeholder="Address"
          />

        </View>
        <View style={styles.steps}>
          <Pressable onPress={nextScreen} style={[styles.button, styles.stepsBtn]} ><Text style={styles.buttontext}>NEXT</Text></Pressable>
        </View>
      </SafeAreaView> : <></>}

      {currentscreen === 1 ? <SafeAreaView style={styles.container}>
        <View style={styles.holder}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>We are almost there</Text>
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="Email Address"
          />
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="Create Password"
          />
        </View>
        <View style={styles.steps}>
          <Pressable onPress={prevScreen} style={[styles.button, styles.stepsBtn]} ><Text style={styles.buttontext}>Back</Text></Pressable>
          <Pressable onPress={nextScreen} style={[styles.button, styles.stepsBtn]} ><Text style={styles.buttontext}>NEXT</Text></Pressable>
        </View>
      </SafeAreaView> : <></>}

      {currentscreen === 2 ? <SafeAreaView style={styles.container}>
        <View style={styles.holder}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>We are almost there</Text>
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="University"
          />
          <TextInput style={styles.textInput}
            // value={number}
            placeholder="Faculty"
          /><TextInput style={styles.textInput}
            // value={number}
            placeholder="Year"
          />
        </View>
        <View style={styles.steps}>
          <Pressable onPress={prevScreen} style={[styles.button, styles.stepsBtn]} ><Text style={styles.buttontext}>Back</Text></Pressable>
          <Pressable onPress={submit} style={[styles.button, styles.stepsBtn]} ><Text style={styles.buttontext}>FINISH</Text></Pressable>
        </View>
      </SafeAreaView> : <></>}
    </>
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
    marginTop: 20,
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
  steps: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  stepsBtn: {
    width: "40%"
  }
})