import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import TopBar from "../components/topBar";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import ProductsService from "../services/products";

export default function HomeScreen({ route, navigation }) {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [showPager, setShowPage] = useState(false);
  const [productsData, setProducts] = useState([]);
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setShowPage(true);

    const queryBody = {};
    if(route.params.category) {
      queryBody.category = route.params.category;
    }

    ProductsService.getProducts({
      page,
      limit,
      queryBody
    })
    .then(res => {
      const { count = 0, pages = 1, products = [] } = res.data || {};
      setProducts(products);
      if(page >= pages) {
        setShowPage(false)
      } else {
        setShowPage(true)
      }
    }).catch(e => {
      alert(e.response.data.err)
    });
  }, [])

  const loadMore = () => {
    setPage(page + 1)
    const queryBody = {};
    if(route.params.category) {
      queryBody.category = route.params.category;
    }
    ProductsService.getProducts({
      limit,
      queryBody,
      page: page + 1,
    })
      .then(res => {
        const { count = 0, pages = 1, products = [] } = res.data || {};
        setProducts([...productsData, ...products]);
        if((page + 1) >= pages) {
          setShowPage(false)
        } else {
          setShowPage(true)
        }
      }).catch(e => {
        alert(e.response.data.err)
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.holder}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.cardholder}>
            {productsData.map(product => (
              <ProductCard product={product} navigation={navigation} />
            ))}
          </View>
          {showPager ? <Pressable style={styles.button} onPress={() => loadMore()}>
            <Text style={styles.buttontext}>View More</Text>
          </Pressable> : <></>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  cardholder: {
    marginVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  holder: {
    padding: 25,
    display: "flex",
    flexDirection: "column"
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
  buttontext: {
    color: "white",
    fontWeight: 700,
    fontSize: 15
  },
  button: {
    backgroundColor: "#FFE605",
    borderRadius: 20,
    padding: 14,
    width: "auto",
    marginTop: 20,
    color: "white",
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
  },
})