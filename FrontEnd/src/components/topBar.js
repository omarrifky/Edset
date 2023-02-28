import SelectDropdown from 'react-native-select-dropdown';
import { Image, Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerToggleButton } from '@react-navigation/drawer';

const TopBar = ({ navigation, iconColor = "#FFE605" }) => {
    const data = ["GUC, Cairo", "Mall, Giza"];
    const handleSelect = (selectedItem, index) => {
        return selectedItem;
    }
    const handleButtonTextAfterSelection = (selectedItem, index) => {
        return selectedItem;
    }
    const handleRowTextForSelection = (item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item
    }
    const handleNavigateProfile = () => {
        navigation.navigate('Account');
    }
    return (
        <View style={styles.TopBar}>
            <DrawerToggleButton pressColor={"#000000"} tintColor={"#000000"} />
            <View style={styles.locationHolder}>
                
                <SelectDropdown
                    data={data}
                    onSelect={handleSelect} 
                    dropdownIconPosition="left"
                    defaultValue={"GUC, Cairo"}
                    buttonStyle={styles.location}
                    rowTextStyle={styles.locationRowText}
                    buttonTextStyle={styles.locationText}
                    dropdownStyle={styles.locationDropdown}
                    selectedRowStyle={styles.locationSelected}
                    rowTextForSelection={handleRowTextForSelection}
                    selectedRowTextStyle={styles.locationSelectedText}
                    buttonTextAfterSelection={handleButtonTextAfterSelection} 
                    renderDropdownIcon={(selectedItem, index) => <MaterialCommunityIcons name="map-marker" color={iconColor} size={24} />}
                    >
                </SelectDropdown>
            </View>
            <Pressable onPress={handleNavigateProfile}>
                <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t1.6435-9/78416817_10218449129812468_5834337807438446592_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RhmGHff4ErYAX_u8Rsd&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBZHofQDA_ct-42lh03bD-loNMK9Lfv5Fq5lUwWKt4vAA&oe=63FE5852" }} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    TopBar: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
    },
    pic: {
        width: 40,
        height: 40,
        borderRadius: 40
    },
    locationHolder: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    location: {
        width: 150,
        height: 20,
        backgroundColor: "transparent",
    },
    locationText: {
        fontSize: 18,
        fontWeight: 500,
    },
    locationSelectedText: {
        fontSize: 16,
        fontWeight: 900
    },
    locationRowText: {
        fontSize: 14,
    },
    locationDropdown: {
        borderRadius: 12,
    },
    locationSelected: {
        color: "#000000",
        backgroundColor: "#FFE605",
    },
});

export default TopBar