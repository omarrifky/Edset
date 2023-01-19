import {  SafeAreaView, StyleSheet, Text } from "react-native";


export default function SignUpScreen({navigation}){
  return(
    <SafeAreaView style = {styles.container}>
      <Text>Signup Screen</Text>
 
    </SafeAreaView>


  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"yellow",
    alignItems:"center",
    justifyContent:"center",
  },
})