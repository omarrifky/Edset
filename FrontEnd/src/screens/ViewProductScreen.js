import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import TopBarProduct from '../components/topBarProduct';

export default function ViewProductScreen({ navigation }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorate, setIsFavorate] = useState(false);

  const increase = () => {
    setQuantity(quantity + 1);
   };
  const decrease = () => {
    if(quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };
  const addtocart = () => {
  };
  const handleFavorite = () => {
    setIsFavorate(!isFavorate);
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopBarProduct navigation={navigation} handleFavorite={handleFavorite} isFavorate={isFavorate} />
      <View style={styles.card}>
        <Text style={styles.productbrand}>Faber-Castel</Text>
        <Text style={styles.productname}>24 Colour Grip Pencil</Text>
        <Image
          style={styles.pic}
          source={{
            uri: 'https://scontent.fcai2-2.fna.fbcdn.net/v/t31.18172-8/19787527_1362038537236890_6923746836663638186_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=zp6oQPYahT0AX8AVUv-&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBL53UM48RqFqnycVFzkZGkF3-CNLwCoeBKGI9rC5Aidw&oe=641DE597',
          }}
        />
      </View>

      <View style={styles.holder1}>
        <Pressable style={styles.button} onPress={decrease}>
          <Text style={styles.buttontext}>-</Text>
        </Pressable>
        <Text style={styles.productprice}>{quantity}</Text>
        <Pressable style={styles.button} onPress={increase}>
          <Text style={styles.buttontext}>+</Text>
        </Pressable>
      </View>

      <View style={styles.holder2}>
        <View>
          <Text style={styles.productpricelabel}>Price</Text>
          <Text style={styles.productprice}>EGP 120</Text>
        </View>
        <View>
          <Pressable style={styles.button2} onPress={addtocart}>
            <Text style={styles.button2text}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  holder1: {
    gap: 20,
    display: 'flex',
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  holder2: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 25
  },
  button: {
    borderRadius: 150,
    backgroundColor: '#FFE605',
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button2: {
    backgroundColor: '#FFE605',
    borderRadius: 20,
    padding: 14,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  buttontext: {
    fontWeight: 700,
    fontSize: 25,
    alignSelf: 'center',
    color: 'white',
  },
  button2text: {
    fontWeight: 400,
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
  price: {
    fontWeight: 700,
    fontSize: 25,
  },
  productprice: {
    fontWeight: 700,
    fontSize: 25,
  },
  productpricelabel: {
    fontSize: 20,
    marginBottom: 10
  },
  productbrand: {
    fontWeight: 700,
    fontSize: 25,
  },
  productname: {
    fontSize: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: Dimensions.get('window').width,
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
    width: '100%',
    paddingTop: 100,
    paddingBottom: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic: {
    marginTop: 30,
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "space-between"
  },
});
