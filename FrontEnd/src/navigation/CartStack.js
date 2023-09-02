import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../screens/Cart';
import CheckoutScreen from '../screens/Checkout';

const CartStackNav = createStackNavigator();
export default function CartStack() {
  return (
    <CartStackNav.Navigator
      headerShown="none"
      headerMode="none"
      initialRouteName="CartScreen">
      <CartStackNav.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false, headerMode: false}}
      />
      <CartStackNav.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{headerShown: false, headerMode: false}}
      />
    </CartStackNav.Navigator>
  );
}
