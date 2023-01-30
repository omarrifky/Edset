import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/Cart';
import CategoriesScreen from '../screens/Categories';
import FavoritesScreen from '../screens/Favorites';
import HomeScreen from '../screens/HomeScreen';

const BottomNavbar = (props) => {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator headerMode="none">
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerMode: false }} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false, headerMode: false }} />
            <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false, headerMode: false }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false, headerMode: false }} />
        </Tab.Navigator>
    )
}

export default BottomNavbar