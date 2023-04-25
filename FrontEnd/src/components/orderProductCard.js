import { StyleSheet, View, Text, Dimensions, Pressable, Image } from "react-native";
import productPlaceholder from "../assets/product.png";

export default function OrderProductCard({ navigation, productData }) {
    const { priceatPurchase, quantity, status, deliveryOn, dateOfPurchase, deliveryFees, product } = productData || {};
    const { _id, photoLinks, productName } = product || {};

    const viewproduct = () => {
        navigation.navigate('Cart', { params: { id: _id }, screen: 'ViewProduct', initial: false })
    }

    return (
        <Pressable onPress={viewproduct}>
            <View style={styles.card}>
                <View style={styles.imgHolder}>
                    {photoLinks?.length > 0 ? <Image style={styles.cardimageholder} source={{ uri: photoLinks[0] }}>
                    </Image> : <Image style={styles.cardimageholder} source={productPlaceholder}></Image>}
                </View>
                <View style={styles.info}>
                    <View style={styles.statusHolder}>
                        {status ? <Text style={[styles.titletext, styles.statusText, styles[`status${status}`]]}>{status}</Text> : <></>}
                        {status === "Pending" ? <Pressable style={styles.cancel}>
                            <Text style={styles.cancelText}>x</Text>
                        </Pressable> : <></>}
                    </View>
                    {productName ? <Text style={styles.titletext}>{productName}</Text> : <></>}
                    {priceatPurchase ? (
                        <>
                            <Text style={styles.pricetext}>{quantity} Items</Text>
                            <Text style={styles.pricetext}>EGP {priceatPurchase}</Text>
                            <Text style={styles.pricetext}>Delivery - EGP {deliveryFees}</Text>
                        </>
                    ) : <></>}
                    {deliveryOn ? <Text style={styles.pricetext}>{deliveryOn}</Text> : <></>}
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    titletext: {
        fontWeight: 700,
        fontSize: 15,
    },
    descriptiontext: {
        fontWeight: 500,
        fontSize: 13,
    },
    pricetext: {
        fontSize: 16,
    },
    Instocktext: {
        fontWeight: 700,
        fontSize: 10,
        color: "green"
    },
    Outofstocktext: {
        fontWeight: 700,
        fontSize: 10,
        color: "red",
    },
    card: {
        width: "100%",
        display: "flex",
        marginBottom: 8,
        alignItems: "center",
        flexDirection: "row"
    },
    cardimageholder: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    info: {
        flex: 1
    },
    imgHolder: {
        borderWidth: 1,
        marginRight: 8,
        borderRadius: 12,
        overflow: "hidden",
        borderColor: "#eee",
        borderStyle: "solid",
    },
    statusPending: {
        color: "orange"
    },
    statusDelivered: {
        color: "green"
    },
    cancel: {
        padding: 4,
        paddingHorizontal: 8,
        width: "auto",
        borderRadius: 8,
        display: "flex"
    },
    cancelText: {
        color: "firebrick",
        fontWeight: "600"
    },
    statusHolder: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})