import { SafeAreaView, StyleSheet, View, Text, ScrollView, Dimensions, Pressable, Image } from "react-native";
import milaneraser from "../assets/milaneraser.jpeg"
import roateringpencil from "../assets/roatringpencil.jpeg"
import canson from "../assets/canson.jpeg"
import TopBar from "../components/topBar";

export default function HomeScreen({ navigation }) {
  const viewproduct = () => {
    navigation.navigate('ViewProduct')
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} />
      <ScrollView>
        <View style={styles.holder}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.cardholder}>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={milaneraser}>
                </Image>
                <Text style={styles.titletext}>Milan Eraser</Text>
                <Text style={styles.pricetext}>EGP 12.5</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
         
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={canson}>
                </Image>
                <Text style={styles.titletext}>Canson Sketch</Text>
                <Text style={styles.descriptiontext}>150g 25 x 35 cm</Text>
                <Text style={styles.pricetext}>EGP 37</Text>
                <Text style={styles.Outofstocktext}>Out of Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={roateringpencil}>
                </Image>
                <Text style={styles.titletext}>Roatring Pencil</Text>
                <Text style={styles.descriptiontext}>0.5mm</Text>
                <Text style={styles.pricetext}>EGP 85</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>

            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={milaneraser}>
                </Image>
                <Text style={styles.titletext}>Milan Eraser</Text>
                <Text style={styles.pricetext}>EGP 12.5</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
         
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={canson}>
                </Image>
                <Text style={styles.titletext}>Canson Sketch</Text>
                <Text style={styles.descriptiontext}>150g 25 x 35 cm</Text>
                <Text style={styles.pricetext}>EGP 37</Text>
                <Text style={styles.Outofstocktext}>Out of Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={roateringpencil}>
                </Image>
                <Text style={styles.titletext}>Roatring Pencil</Text>
                <Text style={styles.descriptiontext}>0.5mm</Text>
                <Text style={styles.pricetext}>EGP 85</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={milaneraser}>
                </Image>
                <Text style={styles.titletext}>Milan Eraser</Text>
                <Text style={styles.pricetext}>EGP 12.5</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
         
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={canson}>
                </Image>
                <Text style={styles.titletext}>Canson Sketch</Text>
                <Text style={styles.descriptiontext}>150g 25 x 35 cm</Text>
                <Text style={styles.pricetext}>EGP 37</Text>
                <Text style={styles.Outofstocktext}>Out of Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={roateringpencil}>
                </Image>
                <Text style={styles.titletext}>Roatring Pencil</Text>
                <Text style={styles.descriptiontext}>0.5mm</Text>
                <Text style={styles.pricetext}>EGP 85</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={milaneraser}>
                </Image>
                <Text style={styles.titletext}>Milan Eraser</Text>
                <Text style={styles.pricetext}>EGP 12.5</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
         
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={canson}>
                </Image>
                <Text style={styles.titletext}>Canson Sketch</Text>
                <Text style={styles.descriptiontext}>150g 25 x 35 cm</Text>
                <Text style={styles.pricetext}>EGP 37</Text>
                <Text style={styles.Outofstocktext}>Out of Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={roateringpencil}>
                </Image>
                <Text style={styles.titletext}>Roatring Pencil</Text>
                <Text style={styles.descriptiontext}>0.5mm</Text>
                <Text style={styles.pricetext}>EGP 85</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={milaneraser}>
                </Image>
                <Text style={styles.titletext}>Milan Eraser</Text>
                <Text style={styles.pricetext}>EGP 12.5</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
         
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={canson}>
                </Image>
                <Text style={styles.titletext}>Canson Sketch</Text>
                <Text style={styles.descriptiontext}>150g 25 x 35 cm</Text>
                <Text style={styles.pricetext}>EGP 37</Text>
                <Text style={styles.Outofstocktext}>Out of Stock</Text>
              </View>
            </Pressable>
            <Pressable onPress={viewproduct}>
              <View style={styles.card}>
                <Image style={styles.cardimageholder} source={roateringpencil}>
                </Image>
                <Text style={styles.titletext}>Roatring Pencil</Text>
                <Text style={styles.descriptiontext}>0.5mm</Text>
                <Text style={styles.pricetext}>EGP 85</Text>
                <Text style={styles.Instocktext}>In Stock</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    fontWeight: 700,
    fontSize: 20,
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
  cardholder: {
    marginVertical: 20,
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    flexWrap:"wrap",
    flexDirection: "row",
    gap: 10,
  },
  holder: {
    padding: 25,

  },

  card: {
    // flex: 1,

    // shadowColor: '#EEE',
    // shadowOffset: { width: -2, height: 8 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },
  cardimageholder: {
    width: "100%",
    height: 150,
    padding: 5,
    resizeMode: "contain"
  },


  title: {
    alignSelf: "flex-start",
    fontSize: 40,
    fontWeight: 700,


  },
  container: {
    flex: 1,
    backgroundColor: "white",


  },
})