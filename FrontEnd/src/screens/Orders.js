import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TopBar from "../components/topBar";
import AccordionItem from "../components/accordionItem"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import OrdersService from "../services/orders";
import OrderProductCard from "../components/orderProductCard";

export default function OrdersScreen({ navigation }) {
  const { user, token, orders, setOrders } = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    OrdersService.getOrders(token)
      .then(res => {
        setOrders(res.data)
        setOrderData(res.data)
      })
      .catch(e => {
        alert(e.response?.data.err);
      })
      .finally(() => { setLoading(false) })
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <ScrollView>
        <View style={styles.body}>
          {orderData.map(({ ordernumber, price, products, status }) => (
            <AccordionItem title={`Order #${ordernumber}`}>
              {products.map(product => <OrderProductCard navigation={navigation} productData={product} />)}
              <View style={styles.totalHolder}>
                <Text style={styles.total}>EGP {price}</Text>
              </View>
            </AccordionItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  body: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 24,
    flexDirection: "column",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalHolder: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  }
})