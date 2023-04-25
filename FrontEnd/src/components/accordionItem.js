import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AccordionItem = ({ children, title, color = "", size = 24 }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleItem = () => {
        setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
                <Text style={styles.accordTitle}>{title}</Text>
                <MaterialCommunityIcons name={expanded ? 'chevron-up' : 'chevron-down'} color={color} size={size} />
            </TouchableOpacity>
            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    accordContainer: {
        paddingBottom: 12
    },
    accordHeader: {
        padding: 12,
        display: "flex",
        color: '#000000',
        borderRadius: 12,
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: '#FFE605',
        justifyContent: 'space-between',
    },
    accordTitle: {
        fontSize: 18,
        color: '#000000',
        fontWeight: "bold",
    },
    accordBody: {
        padding: 12,
        width: "100%"
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});

export default AccordionItem;