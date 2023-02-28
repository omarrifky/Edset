import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopBar from "../components/topBar";

export default function CartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <View style={styles.body}>
        <Text>Cart Screen</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE605"
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})