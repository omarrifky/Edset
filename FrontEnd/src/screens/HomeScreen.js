import { SafeAreaView, StyleSheet, View, Text, ScrollView, Dimensions, Pressable, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import milaneraser from "../assets/milaneraser.jpeg"
import TopBar from "../components/topBar";
import { AuthContext } from "../providers/auth";
import ProductCard from "../components/productCard";
import ProductsService from "../services/products";
import SupplierCard from "../components/supplierCard";
import SuppliersService from "../services/suppliers";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const viewproducts = () => {
    navigation.navigate('Cart', { params: { category: "Engineer" }, screen: 'ViewProducts' });
  }
  const viewsuppliers= () => {
    navigation.navigate('Cart', { screen: 'Suppliers' })
  }
  useEffect(() => {
    ProductsService.getProducts({
      limit: 4,
      page: 1
    })
      .then(res => {
        const { count = 0, products = [] } = res.data || {};
        console.log("PRODDD",products)
        setProducts(products);
      }).catch(e => {
        alert(e.response.data.err)
      });    
      
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
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.holder}>
          <Text style={styles.title}>Hi {user.firstname}!</Text>
          <View style={styles.bannerholder}>
            <View style={styles.leftholder}>
              <Text style={styles.bannertitle}>Black Friday!</Text>
              <Text style={styles.bannersubtitle}>Use promocode: blckfriday50 and get 50% off!</Text>
              <View style={styles.ordernow}>
                <Text style={styles.ordernowtext}>Order NOW!</Text>
              </View>
            </View>
            <View >
              <View style={styles.promotionpercentage}>
                <Text style={styles.promotiontext} >50%</Text>
              </View>
            </View>
          </View>

          <View style={styles.shoppingholder}>
            <Text style={styles.shoppingtitle} >Essentials</Text>
            <Pressable onPress={viewproducts}><Text style={styles.link}>View all {">"}</Text></Pressable>
          </View>
          <View style={styles.cardholder}>
            {products.map(product => <ProductCard navigation={navigation} product={product} />)}
          </View>
          <View style={styles.shoppingholder}>
            <Text style={styles.shoppingtitle} >Stores</Text>
            <Pressable onPress={viewsuppliers}><Text style={styles.link}>View all {">"}</Text></Pressable>
          </View>
          
          <View style={[styles.cardholder, styles.card2holder]}>
            {suppliers.map(supplier => <SupplierCard navigation={navigation} supplier={supplier} />)}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  supplierrating: {
    position: "absolute",
    right: 5,
    top: 5,

  },
  supplierdiscount: {
    position: "absolute",
    left: 5,
    top: 5,
    color: "red"
  },
  subcard2holder: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    minWidth: "50%"
  },

  titletext: {
    fontWeight: 700,
    fontSize: 15,
  },
  descriptiontext: {
    fontWeight: 500,
    fontSize: 13,
  },
  pricetext: {
    fontWeight: 700,
    fontSize: 20,
  },
  Instocktext: {
    fontWeight: 700,
    fontSize: 10,
    color: "green"
  },
  Outofstocktext: {
    fontWeight: 700,
    fontSize: 10,
    color: "red",
  },
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

    // shadowColor: '#EEE',
    // shadowOffset: { width: -2, height: 8 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },
  cardimageholder: {
    width: "100%",
    height: 150,
    padding: 5,
    resizeMode: "contain"
  },
  shoppingtitle: {
    fontWeight: 700,
    fontSize: 23,
  },
  shoppingholder: {
    display: "flex",
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  link: {
    alignSelf: "flex-end",
    fontWeight: 600,
    fontSize: 12,

  },
  promotiontext: {
    color: "#FFE605",
    fontSize: 25,
    fontWeight: 900,
  },
  ordernowtext: {
    color: "#FFE605",
    fontSize: 15,
    fontWeight: 900,

  },
  ordernow: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    marginTop: 10

  },
  promotionpercentage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    display: "flex",
    color: "#FFE605",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  leftholder: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: Dimensions.get("window").width - 186
  },
  bannertitle: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontWeight: 900,

  },
  bannersubtitle: {
    color: "white",
    fontSize: 15,
    fontWeight: 500,
    textAlign: "center",

  },

  bannerholder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#FFE605",
    borderRadius: 20,
    gap: 6,
    marginVertical: 20
  },
  holder: {
    padding: 25,

  },
  title: {
    alignSelf: "flex-start",
    fontSize: 40,
    fontWeight: 700,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
})