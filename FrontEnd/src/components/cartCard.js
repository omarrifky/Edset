import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../providers/auth';
import productPlaceholder from '../assets/product.png';
import UsersService from '../services/users';

export default function CartCard({ navigation, prod }) {
  const { user, token, cart, setCart } = useContext(AuthContext);
  const { _id, product, quantity, productLogo, productName, productQuantity, productPrice } =
    prod || {};

  const removeitem = () => {
    UsersService.removeOnefromCart(
      {
        product_id: _id,
      },
      token,
    ).then(res => {
      setCart(res.data);
    });
  };
  const increase = () => {
    console.log('IDDD', product);
    console.log('Quantity', quantity);
    UsersService.addtoCart(
      {
        productid: product,
        quantity: 1,
      },
      token,
    ).then(res => {
      console.log('CARTTTT', res.data);
      setCart(res.data);
    });
  };
  const decrease = () => {
    if (quantity >= 1) {
      UsersService.addtoCart(
        {
          productid: product,
          quantity: -1,
        },
        token,
      ).then(res => {
        console.log('CARTTTT', res.data);
        setCart(res.data);
      });
    } else {
      removeitem();
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardimageholder}>
        {productLogo.length > 0 ? (
          <Image style={styles.image} source={{ uri: productLogo }}></Image>
        ) : (
          <Image style={styles.image} source={productPlaceholder}></Image>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {productName ? (
            <Text style={styles.titletext}>{productName}</Text>
          ) : (
            <></>
          )}
          <Pressable onPress={removeitem}>
            <Text style={styles.x}>x</Text>
          </Pressable>
        </View>
        {productQuantity ? (
          <Text style={productQuantity > 0 ? styles.Instocktext : styles.Outofstocktext}>
            {productQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </Text>
        ) : <></>}
        <View style={styles.holder1}>
          <Pressable style={styles.button} onPress={decrease}>
            <Text style={styles.buttontext}>-</Text>
          </Pressable>
          <Text style={styles.productprice}>{quantity}</Text>
          <Pressable style={styles.button} onPress={increase}>
            <Text style={styles.buttontext}>+</Text>
          </Pressable>
        </View>
        <View style={styles.priceholder}>
          {productPrice ? (
            <Text style={styles.pricetext}>EGP {productPrice}</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  x: {
    color: 'red',
    fontWeight: 700,
    fontSize: 15,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceholder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
    padding: 8,
    borderRadius: 15,
    // gap: 8,
  },
  titletext: {
    fontWeight: 700,
    fontSize: 15,
  },
  cardimageholder: {
    width: '35%',
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    gap: 8,
    paddingLeft: 8,
  },
  pricetext: {
    fontWeight: 700,
    fontSize: 20,
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
  buttontext: {
    fontWeight: 700,
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
  },
  price: {
    fontWeight: 700,
    fontSize: 15,
  },
  productprice: {
    fontWeight: 700,
    fontSize: 15,
  },
  productpricelabel: {
    fontSize: 20,
    marginBottom: 10,
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  holder1: {
    gap: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
