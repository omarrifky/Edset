import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/Cart';
import OrdersScreen from '../screens/Orders';
import StoresScreen from '../screens/StoresScreen';
import ViewProductScreen from '../screens/ViewProductScreen';
import ViewProductsScreen from '../screens/ViewProductsScreen';

const CartStackNav = createStackNavigator();
export default function CartStack() {

    return (
        <CartStackNav.Navigator headerShown='none' headerMode='none' initialRouteName='CartScreen'>
            <CartStackNav.Screen name='CartScreen' component={CartScreen} options={{ headerShown: false, headerMode: false }}
            />
            <CartStackNav.Screen name='Orders' component={OrdersScreen} options={{ headerShown: false, headerMode: false }}
            />
            <CartStackNav.Screen name='ViewProduct' component={ViewProductScreen} options={{ headerShown: false, headerMode: false }}
            />
            <CartStackNav.Screen name='Stores' component={StoresScreen} options={{ headerShown: false, headerMode: false }}
            />
            <CartStackNav.Screen name='ViewProducts' component={ViewProductsScreen} options={{ headerShown: false, headerMode: false }}
            />
        </CartStackNav.Navigator>
    );
}