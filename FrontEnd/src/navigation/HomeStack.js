import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';



const UserStack = createStackNavigator();





export default function HomeStack() {

  return (
    <UserStack.Navigator headerShown='none'>
      <UserStack.Screen name='Home' component={HomeScreen} />
    </UserStack.Navigator>
  );
}