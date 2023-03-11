import { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TopBar from "../components/topBar";
import { AuthContext } from "../providers/auth";
import UsersService from "../services/users";

export default function FavoritesScreen({ navigation }) {
  const { user, token, favorites, setFavorates } = useContext(AuthContext);

  useEffect(() => {
    UsersService
    .favorites(token)
    .then(res => {
      setFavorates(res.data.favorites)
    }).catch(e => {
      alert(e.response.data.err)
    })
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <View style={styles.body}>
        {favorites.length > 0 ? <Text></Text> : <Text>No Favorites</Text> }
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE605",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})