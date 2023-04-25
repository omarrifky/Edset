import {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CartCard from '../components/cartCard';
import TopBar from '../components/topBar';
import {AuthContext} from '../providers/auth';
import OrdersService from '../services/orders';
import UsersService from '../services/users';

export default function CartScreen({route, navigation}) {
  const {user, token, cart, setCart} = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({
    tax: 0,
    total: 0,
    delivery: 0,
    itemTotal: 0,
  });

  useEffect(() => {
    UsersService.cart(token)
      .then(res => {
        setCartData(res?.data.cart);
        const priceCart = res?.data.cart
          .map(el => el.productPrice * el.quantity)
          .reduce((prev, next) => (prev || 0) + (next || 0), 0);
        const delivery = 50;
        setPrices({
          delivery,
          itemTotal: priceCart,
          tax: (priceCart * 0.14).toFixed(2).replace('.00', ''),
          total: (priceCart * 1.14 + delivery).toFixed(2).replace('.00', ''),
        });
      })
      .catch(e => {
        console.log(e);
        alert(e.response?.data.err);
      });
  }, [cart]);

  const handleProceedPayment = () => {
    setLoading(true);
    OrdersService.createOrder(token, {
      products: cartData.map(el => ({...el, priceatPurchase: el.productPrice}))
    })
    .then(async res => {
      await UsersService.clearCart(token);
      navigation.navigate("Orders");
    })
    .catch(e => {
      alert(e.response?.data.err || 'Something went wrong!');
    })
    .finally(() => {
      setLoading(false);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.body}>
          {cartData.length > 0 ? (
            <>
              <View style={styles.cardholder}>
                {cartData.map(product => (
                  <CartCard prod={product} navigation={navigation} />
                ))}
              </View>
              <Pressable style={styles.coupon}>
                <Text style={styles.couponText}>Apply Coupons</Text>
              </Pressable>
              <View style={styles.priceHolder}>
                <View style={styles.content}>
                  <Text style={styles.title}>Item Total</Text>
                  <Text style={styles.info}>EGP {prices.itemTotal}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.title}>Delivery Charge</Text>
                  <Text style={styles.info}>EGP {prices.delivery}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.title}>Tax</Text>
                  <Text style={styles.info}>EGP {prices.tax}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.title, styles.totalTitle]}>Total</Text>
                  <Text style={[styles.info, styles.totalInfo]}>
                    EGP {prices.total}
                  </Text>
                </View>
              </View>
              <Pressable style={[styles.coupon, styles.payment]} disabled={loading} onPress={handleProceedPayment}>
                <Text style={[styles.couponText, styles.paymentText]}>
                  Proceed To Payment
                </Text>
              </Pressable>
            </>
          ) : (
            <Text>Cart Empty</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    padding: 20,
  },
  cardholder: {
    gap: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coupon: {
    padding: 12,
    width: '100%',
    borderRadius: 15,
    marginVertical: 20,
    paddingVertical: 18,
    backgroundColor: '#111111',
  },
  couponText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  payment: {
    backgroundColor: '#FFE605',
  },
  priceHolder: {
    gap: 8,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: '#666666',
  },
  info: {
    fontSize: 15,
    color: '#000000',
  },
  totalTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  totalInfo: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
});
