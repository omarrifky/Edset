import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function FavoritesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favorites Screen</Text>
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