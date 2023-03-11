import { createStackNavigator } from '@react-navigation/stack';
import SideNavbar from '../components/sideNavbar';

const UserStackNav = createStackNavigator();
export default function UserStack() {

  return (
    <UserStackNav.Navigator headerShown='none' headerMode='none'>
      <UserStackNav.Screen name='Side' component={SideNavbar} options={{ headerShown: false, headerMode: false }}
      />
    </UserStackNav.Navigator>
  );
}