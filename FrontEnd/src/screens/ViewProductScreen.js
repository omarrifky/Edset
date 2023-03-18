import {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import TopBarProduct from '../components/topBarProduct';
import ProductsService from '../services/products';
import productPlaceholder from '../assets/product.png';
import {AuthContext} from '../providers/auth';
import UsersService from '../services/users';

export default function ViewProductScreen({route, navigation}) {
  const {user, token, favorites, setFavorites, cart, setCart} =
    useContext(AuthContext);
  const {id, product} = route.params || {};
  const [fecthProduct, setFecthProduct] = useState(product || null);

  const [quantity, setQuantity] = useState(1);
  const [isfavorite, setIsfavorite] = useState(false);

  const increase = () => {
    setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };
  const addtocart = () => {
    const {id, product} = route.params || {};
    console.log(id);
    UsersService.addtoCart(
      {
        productid: id,
        quantity: quantity,
        supplier: product.supplier,
        name: product.productName,
        price: product.price,
        logo: product.photoLinks?.[0],
      },
      token,
    ).then(res => {
      setCart(res.data);
    });
  };
  const handleFavorite = () => {
    setIsfavorite(!isfavorite);
    let updatedfavorite = [...favorites];
    if (isfavorite) {
      updatedfavorite = updatedfavorite.filter(el => el != id);
    } else {
      updatedfavorite = [id, ...updatedfavorite];
    }
    UsersService.updateUser({favorites: updatedfavorite}, token)
      .then(res => {
        const {user} = res.data;
        setFavorites(user.favorites);
        console.log(user.favorites);
        if ((user.favorites || []).includes(id)) {
          setIsfavorite(true);
        } else {
          setIsfavorite(false);
        }
      })
      .catch(e => {
        alert(e.response.data.err);
      });
  };

  useEffect(() => {
    const {id, product} = route.params || {};
    setFecthProduct(product);
    if ((favorites || []).includes(id)) {
      setIsfavorite(true);
    } else {
      setIsfavorite(false);
    }

    if (!product) {
      ProductsService.getProduct(id)
        .then(res => {
          const product = res.data;
          setFecthProduct(product);
        })
        .catch(e => {
          alert(e.response.data.err);
        });
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBarProduct
        navigation={navigation}
        handleFavorite={handleFavorite}
        isfavorite={isfavorite}
      />
      <View style={styles.card}>
        {fecthProduct?.supplier?.companyName ? (
          <Text style={styles.productbrand}>
            {fecthProduct.supplier.companyName}
          </Text>
        ) : (
          <></>
        )}
        {fecthProduct?.productName ? (
          <Text style={styles.productname}>{fecthProduct?.productName}</Text>
        ) : (
          <></>
        )}
        {fecthProduct?.photoLinks?.length > 0 ? (
          <Image
            style={styles.pic}
            source={{
              uri: fecthProduct.photoLinks[0],
            }}
          />
        ) : (
          <Image style={styles.pic} source={productPlaceholder}></Image>
        )}
      </View>

      <View style={styles.holder1}>
        <Pressable style={styles.button} onPress={decrease}>
          <Text style={styles.buttontext}>-</Text>
        </Pressable>
        <Text style={styles.productprice}>{quantity}</Text>
        <Pressable style={styles.button} onPress={increase}>
          <Text style={styles.buttontext}>+</Text>
        </Pressable>
      </View>

      {fecthProduct?.price ? (
        <View style={styles.holder2}>
          <View>
            <Text style={styles.productpricelabel}>Price</Text>
            <Text style={styles.productprice}>EGP {fecthProduct?.price}</Text>
          </View>
          <View>
            <Pressable style={styles.button2} onPress={addtocart}>
              <Text style={styles.button2text}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  holder1: {
    gap: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  holder2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 25,
  },
  button: {
    borderRadius: 150,
    backgroundColor: '#FFE605',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#FFE605',
    borderRadius: 20,
    padding: 14,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  buttontext: {
    fontWeight: 700,
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
  },
  button2text: {
    fontWeight: 400,
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
  price: {
    fontWeight: 700,
    fontSize: 25,
  },
  productprice: {
    fontWeight: 700,
    fontSize: 25,
  },
  productpricelabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  productbrand: {
    fontWeight: 700,
    fontSize: 25,
  },
  productname: {
    fontSize: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Dimensions.get('window').width,
    shadowColor: '#EEE',
    shadowOffset: {width: -2, height: 8},
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '100%',
    paddingTop: 100,
    paddingBottom: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic: {
    marginTop: 30,
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
