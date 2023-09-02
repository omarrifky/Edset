import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import {useContext, useEffect, useRef, useState} from 'react';
import TopBar from '../components/topBar';
import {AuthContext} from '../providers/auth';
import ProductCard from '../components/productCard';
import ProductsService from '../services/products';
import SupplierCard from '../components/supplierCard';
import SuppliersService from '../services/suppliers';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toTitleCase} from './Categories';

export default function HomeScreen({navigation}) {
  const {user} = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const viewproducts = () => {
    navigation.navigate('Home', {
      params: {tags: 'essentials', screenTitle: 'Essentials'},
      screen: 'ViewProducts',
      initial: false,
    });
  };
  const viewSearchProducts = () => {
    navigation.navigate('Home', {
      params: {},
      screen: 'ViewProducts',
      initial: false,
    });
  };

  const viewsuppliers = () => {
    navigation.navigate('Home', {screen: 'Suppliers', initial: false});
  };
  useEffect(() => {
    ProductsService.getProducts({
      limit: 4,
      page: 1,
      queryBody: {
        tags: {
          $in: 'essentials',
        },
      },
    })
      .then(res => {
        const {count = 0, products = []} = res.data || {};
        setProducts(products);
      })
      .catch(e => {
        alert(e.response.data.err);
      });

    SuppliersService.getSuppliers({
      limit: 4,
      page: 1,
    })
      .then(res => {
        const {count = 0, suppliers = []} = res.data || {};
        setSuppliers(suppliers);
      })
      .catch(e => {
        alert(e.response.data.err);
      });
  }, []);

  const carousel = useRef();
  const carousel_s = useRef();
  const _renderItem = ({item, index}) => {
    return <ProductCard navigation={navigation} product={item} />;
  };
  const _renderItem_s = ({item, index}) => {
    return <SupplierCard navigation={navigation} supplier={item} />;
  };

  useEffect(() => {
    carousel.activeSlideOffset = 0;
    carousel.current.swipeThreshold = 0;
  }, [carousel]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.holder}>
          <View style={styles.searchTitle}>
            <Text style={styles.title}>Hi {toTitleCase(user.firstname)}!</Text>
            <Pressable style={styles.searchBtn} onPress={viewSearchProducts}>
              <MaterialCommunityIcons
                name="store-search"
                color={'#000000'}
                size={20}
              />
            </Pressable>
          </View>
          <View style={styles.bannerholder}>
            <View style={styles.leftholder}>
              <Text style={styles.bannertitle}>Black Friday!</Text>
              <Text style={styles.bannersubtitle}>
                Use promocode: blckfriday50 and get 50% off!
              </Text>
              <View style={styles.ordernow}>
                <Text style={styles.ordernowtext}>Order NOW!</Text>
              </View>
            </View>
            <View>
              <View style={styles.promotionpercentage}>
                <Text style={styles.promotiontext}>50%</Text>
              </View>
            </View>
          </View>

          <View style={styles.shoppingholder}>
            <Text style={styles.shoppingtitle}>Essentials</Text>
            <Pressable onPress={viewproducts}>
              <Text style={styles.link}>View all {'>'}</Text>
            </Pressable>
          </View>
          <View style={styles.cardholder}>
            <Carousel
              ref={carousel}
              data={products}
              renderItem={_renderItem}
              itemWidth={Dimensions.get('screen').width / 2.8}
              sliderWidth={Dimensions.get('screen').width / 2.8}
            />
            {/* {products.map(product => <ProductCard navigation={navigation} product={product} />)} */}
          </View>
          <View style={styles.shoppingholder}>
            <Text style={styles.shoppingtitle}>Stores</Text>
            <Pressable onPress={viewsuppliers}>
              <Text style={styles.link}>View all {'>'}</Text>
            </Pressable>
          </View>

          <View style={[styles.cardholder, styles.card2holder]}>
            {suppliers.map(supplier => (
              <SupplierCard navigation={navigation} supplier={supplier} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  supplierrating: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  supplierdiscount: {
    position: 'absolute',
    left: 5,
    top: 5,
    color: 'red',
  },
  subcard2holder: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    minWidth: '50%',
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
    color: 'green',
  },
  Outofstocktext: {
    fontWeight: 700,
    fontSize: 10,
    color: 'red',
  },
  cardholder: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
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
    width: '100%',
    height: 150,
    padding: 5,
    resizeMode: 'contain',
  },
  shoppingtitle: {
    fontWeight: 700,
    fontSize: 23,
  },
  shoppingholder: {
    display: 'flex',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  link: {
    alignSelf: 'flex-end',
    fontWeight: 600,
    fontSize: 12,
  },
  promotiontext: {
    color: '#FFE605',
    fontSize: 25,
    fontWeight: 900,
  },
  ordernowtext: {
    color: '#FFE605',
    fontSize: 15,
    fontWeight: 900,
  },
  ordernow: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
    marginTop: 10,
  },
  promotionpercentage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    display: 'flex',
    color: '#FFE605',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  leftholder: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: Dimensions.get('window').width - 186,
  },
  bannertitle: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 900,
  },
  bannersubtitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
  },

  bannerholder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#FFE605',
    borderRadius: 20,
    gap: 6,
    marginVertical: 20,
  },
  holder: {
    padding: 25,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 40,
    fontWeight: 700,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchTitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBtn: {
    width: 40,
    height: 40,
    padding: 10,
    marginTop: 8,
    display: 'flex',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE605',
  },
});
