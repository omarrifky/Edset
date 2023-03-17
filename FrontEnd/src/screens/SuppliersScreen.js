import { SafeAreaView, ScrollView, View ,Image, StyleSheet, Text, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import SuppliersService from "../services/suppliers";

export default function StoresScreen({ navigation }) {
  const [suppliers, setSuppliers] = useState([]);
    const viewproducts = () => {
      navigation.navigate('Cart', { params: { store: "SamirandAli" }, screen: 'ViewProducts' });
    }
  useEffect(() => {   
      
    SuppliersService.getSuppliers({
        limit: 4,
        page: 1
      })
        .then(res => {
          const { count = 0, suppliers = [] } = res.data || {};
          setSuppliers(suppliers);
        }).catch(e => {
          alert(e.response.data.err)
        }); 
      

  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.title}>Stores</Text>
        <ScrollView>

       
            <View style = {styles.imageholder}>

            {suppliers.map(supplier =>    {supplier.image> 0 ? <Pressable onPress={viewproducts}><Image style={styles.cardimageholder} source={{ uri: supplier.image }}>
            </Image> : <Image style={styles.cardimageholder} source={productPlaceholder}></Image></Pressable>: <></>}   )}

            </View>

      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    pic: {
        width: "50%",
        height:150,
        resizeMode:"contain"
 
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 25,
        fontWeight: 700,
        width:"100%",
        padding:25
    
      },
      imageholder:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        // gap:30

        
      },
  container: {
    flex: 1,
    backgroundColor: "white",
    display:"flex",
    justifyContent:""
  },
})