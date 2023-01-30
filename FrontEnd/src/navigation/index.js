import React, { useContext } from "react";

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from "../providers/auth";
import BottomNavbar from "../components/bottomNavbar";

const MainNavigation = (props) => {
    const { user } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>)
}
export default MainNavigation