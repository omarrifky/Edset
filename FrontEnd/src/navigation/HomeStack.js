import { createStackNavigator } from '@react-navigation/stack';
import SideNavbar from '../components/sideNavbar';
import AccountScreen from '../screens/Account';
import CustomerServiceScreen from '../screens/CustomerService';
import OrdersScreen from '../screens/Orders';
import SettingsScreen from '../screens/Settings';
import StoresScreen from '../screens/StoresScreen';
import ViewProductScreen from '../screens/ViewProductScreen';
import ViewProductsScreen from '../screens/ViewProductsScreen';

const UserStack = createStackNavigator();
export default function HomeStack() {

  return (
    <UserStack.Navigator headerShown='none' headerMode='none'>
      <UserStack.Screen name='Side' component={SideNavbar} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='Orders' component={OrdersScreen} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='Account' component={AccountScreen} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='CustomerService' component={CustomerServiceScreen} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='ViewProduct' component={ViewProductScreen} options={{ headerShown: false, headerMode: false }}
      /> 
      <UserStack.Screen name='Stores' component={StoresScreen} options={{ headerShown: false, headerMode: false }}
      />
      <UserStack.Screen name='ViewProducts' component={ViewProductsScreen} options={{ headerShown: false, headerMode: false }}
      />
    </UserStack.Navigator>
  );
}