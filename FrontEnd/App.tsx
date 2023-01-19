import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import {  Alert, Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AuthStack from "./src/navigation/AuthStack";
import HomeStack from "./src/navigation/HomeStack";

export default function App(){
  const user :number= 0;
  return(
<NavigationContainer>
{user==1?<HomeStack/>:<AuthStack/>}
</NavigationContainer>
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