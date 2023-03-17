import { Pressable, SafeAreaView, StyleSheet, Text,View } from "react-native";
import TopBar from "../components/topBar";

export default function CategoriesScreen({ navigation }) {

  const viewproducts = () => {
    navigation.navigate('Cart', { params: { category: "chosencategory" }, screen: 'ViewProducts' });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <View style={styles.card1}>
      <Pressable onPress={viewproducts}>
      <Text style={styles.card1Text} >Architecture Engineering</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>Mechanical Engineering</Text>
      </Pressable>
      </View>    
      <View style={styles.card1}>
      <Pressable onPress={viewproducts }>
      <Text style={styles.card1Text} >Mechanical Engineering</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>Computer Engineering</Text>
      </Pressable>
      </View> 
      <View style={styles.card1}>
      <Pressable onPress={viewproducts }>
      <Text style={styles.card1Text} >Civil Engineering</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>Pharmacy</Text>
      </Pressable>
      </View> 
      <View style={styles.card1}>
      <Pressable onPress={viewproducts }>
      <Text style={styles.card1Text} >Medicine</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>Dentistry</Text>
      </Pressable>
      </View> 
      <View style={styles.card1}>
      <Pressable onPress={viewproducts }>
      <Text style={styles.card1Text} >Mechatronics</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>School</Text>
      </Pressable>
      </View> 
      <View style={styles.card1}>
      <Pressable onPress={viewproducts }>
      <Text style={styles.card1Text} >Applied Arts</Text>
      </Pressable>
      </View> 
      <View style={styles.card2}>
      <Pressable onPress={viewproducts }>
      <Text  style={styles.card2Text}>Other</Text>
      </Pressable>
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