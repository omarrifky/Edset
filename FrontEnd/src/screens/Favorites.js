import { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ProductCard from "../components/productCard";
import TopBar from "../components/topBar";
import { AuthContext } from "../providers/auth";
import UsersService from "../services/users";

export default function FavoritesScreen({ route, navigation }) {
  const { user, token, setFavorites } = useContext(AuthContext);
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    UsersService
      .favorites(token)
      .then(res => {
        setFavoritesData(res?.data.favorites);
        const ids = res?.data.favorites.map(el => el._id) || [];
        setFavorites(ids);
      }).catch(e => {
        alert(e.response?.data.err)
      })
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.body}>
          {favoritesData.length > 0 ?
            <View style={styles.cardholder}>
              {favoritesData.map(product => <ProductCard product={product} navigation={navigation} />)}
            </View>
            : <Text>No Favorites</Text>}
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
    padding: 20
  },
  cardholder: {
    gap: 10,
    display: "flex",
    flexWrap: "wrap",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
})