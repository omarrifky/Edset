import { SafeAreaView, StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import TopBar from "../components/topBar";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import ProductsService from "../services/products";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen({ route, navigation }) {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [showPager, setShowPage] = useState(false);
  const [search, setSearch] = useState('');
  const [productsData, setProducts] = useState([]);
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setShowPage(true);

    const { screenTitle, ...rest} = route?.params || {};
    const queryBody = {
      ...rest
    };
    if (search) {
      queryBody.$or = [
        {
          category: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          productName: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          Subcategory: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          tags: {
            $in: search
          }
        }
      ];
    }
    // if (route?.params?.category) {
    //   queryBody.category = route.params.category;
    // }
    const q = {
      page,
      limit,
      queryBody
    };

    ProductsService.getProducts(q)
      .then(res => {
        const { count = 0, pages = 1, products = [] } = res.data || {};
        setProducts(products);
        if (page >= pages) {
          setShowPage(false)
        } else {
          setShowPage(true)
        }
      }).catch(e => {
        alert(e.response.data.err)
      });
  }, [search, route.params])

  const loadMore = () => {
    setPage(page + 1)
    const queryBody = {};
    if (search) {
      queryBody.$or = [
        {
          category: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          productName: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          Subcategory: {
            $regex: search,
            $options: 'i'
          }
        }
      ];
    }
    if (route.params.category) {
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
        if ((page + 1) >= pages) {
          setShowPage(false)
        } else {
          setShowPage(true)
        }
      }).catch(e => {
        alert(e.response.data.err)
      });
  };
  const onSearchhandle = e => {
    setSearch(e);
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.holder}>
          <Text style={styles.title}>{ route?.params?.screenTitle || 'All Products' }</Text>
          <TextInput
            placeholder="Search"
            value={search}
            style={styles.textInput}
            onChangeText={$event => onSearchhandle($event)}
          />
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    padding: 12,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
  }
})