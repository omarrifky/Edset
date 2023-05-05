import { StyleSheet, View, Text, Dimensions, Pressable, Image } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import productPlaceholder from "../assets/product.png";

export default function SupplierCard({ navigation, supplier }) {
    const { user } = useContext(AuthContext);
    const { _id, companyName, discount ,rating,image} = supplier || {};

    const viewProductsforSupplier = () => {
        navigation.navigate('Cart', { params: { supplier: _id, screenTitle: companyName}, screen: 'ViewProducts', initial: false })
    }

    return (
        <View style={styles.subcard2holder}>
          <Pressable onPress={viewProductsforSupplier}>
            <View style={styles.card}>
            {image?.length > 0 ? <Image style={styles.cardimageholder} source={{ uri: image }}>
            </Image> : <Image style={styles.cardimageholder} source={productPlaceholder}></Image>}           
            {discount ? <Text style={styles.supplierdiscount}>{discount}</Text> : <></>}
            {rating ? <Text style={styles.supplierrating}>{rating}</Text> : <></>}
        </View>
          </Pressable>
     
        </View>
    )
}
const styles = StyleSheet.create({
    cardholder: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
        gap: 15,
      },
      card2holder: {
        gap: 5,
      },
      card: {
        flex: 1,
    
      },
      subcard2holder: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        minWidth: "50%"
      },
      supplierdiscount: {
        position: "absolute",
        left: 5,
        top: 5,
        color: "red"
      },
      cardimageholder: {
        width: "100%",
        height: 150,
        padding: 5,
        resizeMode: "contain"
      },
      supplierrating: {
        position: "absolute",
        right: 5,
        top: 5,
    
      },
})