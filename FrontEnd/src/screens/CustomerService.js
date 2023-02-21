import { useContext, useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../providers/auth";
export default function CustomerServiceScreen({ navigation }) {
  const sendEmail = () =>{
    alert("Email Sent!")
    return
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.holder}>
      <Text style={styles.title}>Contact Us!</Text>
      <Text style={styles.subtitle}>We will be in touch soon</Text>
      <TextInput style={styles.textInput}
      
        placeholder="Subject"
      />
      <TextInput style={styles.textInput2}
     
        placeholder="Email"
      />
      <Pressable style={styles.button} onPress={()=>sendEmail()}><Text style={styles.buttontext}>Send Email</Text></Pressable>

    </View>

  </SafeAreaView>
  )
}
const styles = StyleSheet.create({

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

  },  textInput2: {
    padding: 12,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    width: "100%",
    height:"40%",
    backgroundColor: "white",
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,

  },

  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
})