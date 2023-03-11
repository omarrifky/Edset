import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/Cart';
import CategoriesScreen from '../screens/Categories';
import FavoritesScreen from '../screens/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../navigation/HomeStack';
import CartStack from '../navigation/CartStack';


const BottomNavbar = (props) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator headerMode="none">
            <Tab.Screen name="Home" component={HomeStack} options={{
                tabBarActiveTintColor:"#FFE605",
                headerShown: false, headerMode: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
                tabBarActiveTintColor:"#FFE605",headerShown: false, headerMode: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Categories" component={CategoriesScreen} options={{
                tabBarActiveTintColor:"#FFE605",headerShown: false, headerMode: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="menu" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Cart" component={CartStack} options={{
                tabBarActiveTintColor:"#FFE605",headerShown: false, headerMode: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cart" color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default BottomNavbar