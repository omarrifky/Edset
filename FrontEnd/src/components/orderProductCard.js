import {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import productPlaceholder from '../assets/product.png';
import {AuthContext} from '../providers/auth';
import OrdersService from '../services/orders';

export default function OrderProductCard({navigation, productData, order_id}) {
  const {token, refetchOrder, setRefetchOrder} = useContext(AuthContext);
  const {
    priceatPurchase,
    quantity,
    status,
    deliveryOn,
    dateOfPurchase,
    deliveryFees,
    product,
  } = productData || {};
  const {_id, photoLinks, productName} = product || {};

  const viewproduct = () => {
    navigation.navigate('Home', {
      params: {id: _id},
      screen: 'ViewProduct',
      initial: false,
    });
  };

  const handleCancelPart = () => {
    console.log('PRODDATA:', productData);
    OrdersService.cancelPart(token, order_id, productData)
      .then(res => {
        setRefetchOrder(!refetchOrder);
      })
      .catch(e => {
        alert(e.response?.data.err);
      });
  };

  return (
    <Pressable onPress={viewproduct}>
      <View style={styles.card}>
        <View style={styles.imgHolder}>
          {photoLinks?.length > 0 ? (
            <Image
              style={styles.cardimageholder}
              source={{uri: photoLinks[0]}}></Image>
          ) : (
            <Image
              style={styles.cardimageholder}
              source={productPlaceholder}></Image>
          )}
        </View>
        <View style={styles.info}>
          <View style={styles.statusHolder}>
            {status ? (
              <Text
                style={[
                  styles.titletext,
                  styles.statusText,
                  styles[`status${status}`],
                ]}>
                {status}
              </Text>
            ) : (
              <></>
            )}
            {status === 'Pending' ? (
              <Pressable
                style={styles.cancel}
                onPress={() => handleCancelPart()}>
                <Text style={styles.cancelText}>x</Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
          {productName ? (
            <Text style={styles.titletext}>{productName}</Text>
          ) : (
            <></>
          )}
          {priceatPurchase ? (
            <>
              <Text style={styles.pricetext}>{quantity} Items</Text>
              <Text style={styles.pricetext}>
                {deliveryFees + priceatPurchase}{' '}
                <Text style={styles.titletext}>EGP</Text>
              </Text>
            </>
          ) : (
            <></>
          )}
          {deliveryOn ? (
            <Text style={styles.pricetext}>
              <Text style={styles.titletext}>Expected Arrival On </Text>
              {new Date(deliveryOn).toLocaleDateString()}
            </Text>
          ) : (
            <></>
          )}
        </View>
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
    fontSize: 16,
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
    width: '100%',
    display: 'flex',
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardimageholder: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
  },
  imgHolder: {
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: '#eee',
    borderStyle: 'solid',
  },
  statusPending: {
    color: 'orange',
  },
  statusCanceled: {
    color: 'firebrick',
  },
  statusDelivered: {
    color: 'green',
  },
  cancel: {
    padding: 4,
    paddingHorizontal: 8,
    width: 'auto',
    borderRadius: 8,
    display: 'flex',
  },
  cancelText: {
    color: 'firebrick',
    fontWeight: '600',
  },
  statusHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
