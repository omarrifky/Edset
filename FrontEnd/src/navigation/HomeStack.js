import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/Account';
import CustomerServiceScreen from '../screens/CustomerService';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/Settings';

const HomeStackNav = createStackNavigator();
export default function HomeStack() {

    return (
        <HomeStackNav.Navigator headerShown='none' headerMode='none' initialRouteName='HomeScreen'>
            <HomeStackNav.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen name='Account' component={AccountScreen} options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false, headerMode: false }}
            />
            <HomeStackNav.Screen name='CustomerService' component={CustomerServiceScreen} options={{ headerShown: false, headerMode: false }}
            />
        </HomeStackNav.Navigator>
    );
}