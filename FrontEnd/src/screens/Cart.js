import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function CartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Cart Screen</Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE605",
    alignItems: "center",
    justifyContent: "center",
  },
})