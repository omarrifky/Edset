import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavbar from './bottomNavbar';
import CustomDrawer from './customDrawer';

const SideNavbar = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator headerMode="none"
            drawerPosition={'right'}
            drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen name="bottom" component={BottomNavbar} options={{ headerShown: false, headerMode: false }} />
        </Drawer.Navigator>
    )
}

export default SideNavbar