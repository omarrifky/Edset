import React, { useContext } from 'react';
import { View, Button, StyleSheet, SafeAreaView, Image, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../providers/auth';

const CustomDrawer = (props) => {
    const { navigation } = props;
    const { setUser } = useContext(AuthContext)
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.titleHolder}>
                <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t1.6435-9/78416817_10218449129812468_5834337807438446592_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RhmGHff4ErYAX_u8Rsd&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBZHofQDA_ct-42lh03bD-loNMK9Lfv5Fq5lUwWKt4vAA&oe=63FE5852" }} />
                <Text style={[styles.text, styles.title]}>Khaled Mahmoud</Text>
            </View>
            <ScrollView style={styles.container}>
                <View>
                    <Pressable
                        style={styles.btn}
                        onPress={() => { navigation.navigate('Orders'); navigation.closeDrawer() }}
                    >
                        <Text style={styles.text}>Orders</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btn}
                        title="Account"
                        onPress={() => { navigation.navigate('Account'); navigation.closeDrawer() }}
                    >
                        <Text style={styles.text}>Account</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btn} title="Customer Service" onPress={() => { navigation.navigate('CustomerService'); navigation.closeDrawer() }} >
                        <Text style={styles.text}>Customer Service</Text>
                    </Pressable>
                    <Pressable
                        style={styles.btn}
                        title="Settings"
                        onPress={() => { navigation.navigate('Settings'); navigation.closeDrawer() }}
                    >
                        <Text style={styles.text}>Settings</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.logout}>
                <Pressable
                    style={styles.btn}
                    title="Logout"
                    onPress={() => { setUser(false); navigation.closeDrawer() }}
                >
                    <Text style={[styles.text, styles.logoutTxt]}>Logout</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safe: {
        height:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    spread: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    pic: {
        width: 50,
        height: 50,
        borderWidth: 1,
        marginRight: 18,
        borderRadius: 50,
        borderColor: "#AAAAAA",
    },
    btn: {
        marginBottom: 12
    },
    logoutTxt: {
        fontSize: 16
    },
    container: {
        paddingTop: 12,
        height: "auto",
        display: "flex",
        flexDirection: "column",
    },
    text: {
        padding: 18,
        fontSize: 20,
        color: "#000",
        fontWeight: "700",
    },
    titleHolder: {
        padding: 18,
        display: "flex",
        marginBottom: 18,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        padding: 0,
        color: "#000",
        fontSize: 18,
        fontWeight: "800",
    },
});
export default CustomDrawer;