import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CartCard from '../components/cartCard';
import TopBar from '../components/topBar';
import {AuthContext} from '../providers/auth';
import UsersService from '../services/users';

export default function CartScreen({route, navigation}) {
  const {user, token, cart, setCart} = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    UsersService.cart(token)
      .then(res => {
        setCartData(res?.data.cart);
      })
      .catch(e => {
        console.log(e);
        alert(e.response?.data.err);
      });
  }, [cart]);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.body}>
          {cartData.length > 0 ? (
            <View style={styles.cardholder}>
              {cartData.map(product => (
                <CartCard product={product} navigation={navigation} />
              ))}
            </View>
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
});
