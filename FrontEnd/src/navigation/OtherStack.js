import { createStackNavigator } from '@react-navigation/stack';

const OtherStackNav = createStackNavigator();
export default function OtherStack() {

    return (
        <OtherStackNav.Navigator headerShown='none' headerMode='none' initialRouteName='Home'>
            <OtherStackNav.Screen name='' component={HomeScreen} options={{ headerShown: false, headerMode: false }}
            />
        </OtherStackNav.Navigator>
    );
}