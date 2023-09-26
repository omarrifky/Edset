import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TopBar from '../components/topBar';
import AccordionItem from '../components/accordionItem';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../providers/auth';
import OrdersService from '../services/orders';
import OrderProductCard from '../components/orderProductCard';

export const cancel_cases = Object.freeze({
  NO_PENDING: 1,
  All_PENDING: 2,
  SOME_PENDING: 3,
});

export default function OrdersScreen({ navigation }) {
  const { user, token, orders, setOrders, refetchOrder, setRefetchOrder } =
    useContext(AuthContext);
  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrdersService.getOrders(token)
      .then(res => {
        setOrders(res.data);
        setOrderData(res.data || []);
      })
      .catch(e => {
        alert(e.response?.data?.err || 'Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchOrder]);

  const handleCancel = order_id => {
    OrdersService.cancelOrder(token, order_id)
      .then(res => {
        setRefetchOrder(!refetchOrder);
      })
      .catch(e => {
        alert(e.response?.data?.err || 'Something went wrong!');
      });
  };
  const checkCancelAll = useMemo(() => {
    const dd = {};
    (orderData || []).forEach(({ _id, products = [] }) => {
      const p_len = products.length;
      const p_filter = (products || []).filter(p => p.status !== 'Pending');
      if (p_filter?.length === p_len) {
        dd[_id] = cancel_cases.NO_PENDING;
      } else if (p_filter?.length > 0) {
        dd[_id] = cancel_cases.SOME_PENDING;
      } else {
        dd[_id] = cancel_cases.All_PENDING;
      }
    });
    return dd;
  }, [orderData]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <ScrollView>
        <View style={styles.body}>
          {orderData?.length > 0 ? (
            <>
              {orderData.map(({ ordernumber, price, products, status, _id }) => (
                <AccordionItem title={`Order #${ordernumber}`}>
                  {products.map(product => (
                    <OrderProductCard
                      navigation={navigation}
                      productData={product}
                      order_id={_id}
                    />
                  ))}
                  <View style={styles.totalHolder}>
                    <Text style={styles.total}>EGP {price}</Text>
                  </View>
                  {checkCancelAll[_id] !== cancel_cases.NO_PENDING && (
                    <Pressable
                      style={styles.cancelBtn}
                      onPress={() => handleCancel(_id)}>
                      <Text style={styles.cancelBtnTxt}>
                        {checkCancelAll[_id] === cancel_cases.SOME_PENDING
                          ? 'Cancel the rest'
                          : 'Cancel order'}
                      </Text>
                    </Pressable>
                  )}
                </AccordionItem>
              ))}
            </>
          ) : (
            <>
              {orderData ? (
                <Text style={styles.titletext}>You currently have no Orders</Text>
              ) : (
                <Text style={styles.titletext}>Loading...</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titletext: {
    fontWeight: 700,
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
    display: 'flex',
    paddingHorizontal: 24,
    flexDirection: 'column',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalHolder: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    padding: 4,
    width: '100%',
    display: 'flex',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: 'firebrick',
  },
  cancelBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
