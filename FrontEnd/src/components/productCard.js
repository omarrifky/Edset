import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../providers/auth';
import productPlaceholder from '../assets/product.png';

export default function ProductCard({navigation, product, style = null}) {
  const {user} = useContext(AuthContext);
  const {
    _id,
    productName,
    price,
    description,
    quantity,
    category,
    Subcategory,
    percentageDiscount,
    photoLinks,
  } = product || {};

  const viewproduct = () => {
    navigation.navigate('Home', {
      params: {id: _id, product},
      screen: 'ViewProduct',
      initial: false,
    });
  };

  const extraStyles = style ? { style } : {}
  return (
    <Pressable onPress={viewproduct} {...extraStyles}>
      <View style={styles.card}>
        {photoLinks?.length > 0 ? (
          <Image
            style={styles.cardimageholder}
            source={{uri: photoLinks[0]}}></Image>
        ) : (
          <Image
            style={styles.cardimageholder}
            source={productPlaceholder}></Image>
        )}
        {productName ? (
          <Text style={styles.titletext}>{productName}</Text>
        ) : (
          <></>
        )}
        {description ? (
          <Text style={styles.descriptiontext}>{description}</Text>
        ) : (
          <></>
        )}
        {price ? <Text style={styles.pricetext}>EGP {price}</Text> : <></>}
        <Text style={quantity > 0 ? styles.Instocktext : styles.Outofstocktext}>
          {quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>
    </Pressable>
  );
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
    color: 'green',
  },
  Outofstocktext: {
    fontWeight: 700,
    fontSize: 10,
    color: 'red',
  },
  card: {
    flex: 1,
  },
  cardimageholder: {
    width: 150,
    height: 150,
    padding: 5,
    resizeMode: 'contain',
    marginBottom: 15,
  },
});
