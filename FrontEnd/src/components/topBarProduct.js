import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TopBarProduct = ({ navigation, handleFavorite, isFavorate = false}) => {
    const handleBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.TopBar}>
            <Pressable onPress={handleBack} style={styles.btn}>
                <MaterialCommunityIcons name="arrow-left" color={"#000000"} size={24} />
            </Pressable>
            <Pressable onPress={handleFavorite} style={styles.btn}>
                <MaterialCommunityIcons name={isFavorate ? "heart" : "heart-outline"} color={"#FFE605"} size={24} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    TopBar: {
        width: "100%",
        display: "flex",
        paddingVertical: 6,
        flexDirection: "row",
        paddingHorizontal: 12,
        alignContent: "center",
        justifyContent: "space-between",
    },
    btn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        shadowColor: '#00000055',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 5,

        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#0000000A",
        
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    }
});

export default TopBarProduct