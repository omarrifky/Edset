import { SafeAreaView, StyleSheet, Text,View } from "react-native";
import TopBar from "../components/topBar";

export default function CategoriesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Architecture Engineering</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>Mechanical Engineering</Text>
      </View>    
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Mechanical Engineering</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>Computer Engineering</Text>
      </View> 
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Civil Engineering</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>Pharmacy</Text>
      </View> 
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Medicine</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>Dentistry</Text>
      </View> 
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Mechatronics</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>School</Text>
      </View> 
      <View style={styles.card1}>
      <Text style={styles.card1Text} >Applied Arts</Text>
      </View> 
      <View style={styles.card2}>
      <Text  style={styles.card2Text}>Other</Text>
      </View> 
     
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE605",
  },
  card1:{
    width:"100%",
    height:"8%",
    backgroundColor:"white",
    alignContent:"center",
    justifyContent:"center"
  },card2:{
    width:"100%",
    height:"8%",
    backgroundColor:"#FFE605",
    alignContent:"center",
    justifyContent:"center"
  },
  card1Text:{
    color: "black",
    fontWeight: 700,
    fontSize: 20,
    alignSelf:"center"
  },
  card2Text:{
    color: "white",
    fontWeight: 700,
    fontSize: 20,
    alignSelf:"center"

  }
  
})