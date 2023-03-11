import React, { useContext } from "react";

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import { AuthContext } from "../providers/auth";

const MainNavigation = (props) => {
    const { user } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {user ? <UserStack /> : <AuthStack />}
        </NavigationContainer>)
}
export default MainNavigation