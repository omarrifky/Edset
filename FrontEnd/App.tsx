import {  Alert, Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App(){
  return(
    <SafeAreaView style = {styles.container}>
      <Text>EdSet</Text>
      <Button
   onPress={() => Alert.alert('Button with adjusted color pressed')}
  title="Lets get Started!"
  accessibilityLabel="Learn more about this purple button"
/>
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