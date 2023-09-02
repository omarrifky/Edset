import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/Account';
import CustomerServiceScreen from '../screens/CustomerService';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/Orders';
import SettingsScreen from '../screens/Settings';
import ViewProductScreen from '../screens/ViewProductScreen';

import SuppliersScreen from '../screens/SuppliersScreen';
import ViewProductsScreen from '../screens/ViewProductsScreen';

const HomeStackNav = createStackNavigator();
export default function HomeStack() {

    return (
        <HomeStackNav.Navigator headerShown='none' headerMode='none' initialRouteName='HomeScreen'>
            <HomeStackNav.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name='Account'
                component={AccountScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name='Settings'
                component={SettingsScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name='CustomerService'
                component={CustomerServiceScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name="ViewProduct"
                component={ViewProductScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name="Suppliers"
                component={SuppliersScreen}
                options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen
                name="ViewProducts"
                component={ViewProductsScreen}
                options={{ headerShown: false, headerMode: false }}
            />
        </HomeStackNav.Navigator>
    );
}