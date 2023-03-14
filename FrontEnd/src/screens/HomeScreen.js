import { SafeAreaView, StyleSheet, View, Text, ScrollView, Dimensions, Pressable, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import milaneraser from "../assets/milaneraser.jpeg"
import TopBar from "../components/topBar";
import { AuthContext } from "../providers/auth";
import ProductCard from "../components/productCard";
import ProductsService from "../services/products";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const viewproduct = () => {
    navigation.navigate('Cart', { screen: 'ViewProduct' })
  }
  const viewproducts = () => {
    navigation.navigate('Cart', { screen: 'ViewProducts' });
  }
  const viewstores = () => {
    navigation.navigate('Cart', { screen: 'Stores' })
  }

  useEffect(() => {
    ProductsService.getProducts({
      limit: 4,
      page: 1
    })
      .then(res => {
        const { count = 0, products = [] } = res.data || {};
        setProducts(products);
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
            <Pressable onPress={viewstores}><Text style={styles.link}>View all {">"}</Text></Pressable>
          </View>

          <View style={[styles.cardholder, styles.card2holder]}>

            <View style={styles.subcard2holder}>
              <Pressable onPress={viewproducts}>
                <View style={styles.card}>
                  <Image style={styles.cardimageholder} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t39.30808-6/307317580_192243113187416_3278791085684623431_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dUkFDc4-BqAAX_OxIXi&_nc_ht=scontent.fcai2-2.fna&oh=00_AfAvth5ROf3dBvtVqOOnqQugQ4UMHEQ4hpN5pdk_HvmgjA&oe=63FB5581" }} />
                  <Text style={styles.supplierdiscount}>
                    -5%
                  </Text>
                  <Text style={styles.supplierrating}>
                    4.1
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={viewproducts}>
                <View style={styles.card}>
                  <Image style={styles.cardimageholder} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t31.18172-8/665460_434144229956164_1282990638_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=2aqwIK6g60sAX8-BUtO&_nc_ht=scontent.fcai2-1.fna&oh=00_AfCkjmk8uoQ-LaGWk1-tXEmz54vN1dsiMF2diROH7b0VTA&oe=6421741C" }} />
                  <Text style={styles.supplierdiscount}>
                    -15%
                  </Text>
                  <Text style={styles.supplierrating}>
                    4.1
                  </Text>
                </View>
              </Pressable>
            </View>


            <View style={styles.subcard2holder}>
              <Pressable onPress={viewproducts}>
                <View style={styles.card}>
                  <Image style={styles.cardimageholder} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/277580457_376103014524313_4416877040863470373_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g7htpCBlEPoAX_1mcFW&_nc_ht=scontent.fcai2-1.fna&oh=00_AfBYSmQKIofpJBfz3fw_yAqs0BrO6OUwHYoiUiR9Gr8eDw&oe=63FFD041" }} />
                  <Text style={styles.supplierdiscount}>
                    -20%
                  </Text>
                  <Text style={styles.supplierrating}>
                    4.1
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={viewproducts}>
                <View style={styles.card}>
                  <Image style={styles.cardimageholder} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/299685801_5138280906294387_7991562011588907931_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OmAxaC5D8YMAX9owyV9&_nc_ht=scontent.fcai2-1.fna&oh=00_AfA8__pUOljVGyhWBcDfPqL8bQMHySLt4BhabPhGOFeKbA&oe=63FFB1EA" }} />
                  <Text style={styles.supplierdiscount}>
                    -10%
                  </Text>
                  <Text style={styles.supplierrating}>
                    4.1
                  </Text>
                </View>
              </Pressable>
            </View>
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