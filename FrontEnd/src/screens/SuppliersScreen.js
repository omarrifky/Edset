import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {useEffect, useState} from 'react';
import SuppliersService from '../services/suppliers';

export default function StoresScreen({navigation}) {
  const [suppliers, setSuppliers] = useState([]);

  const viewProductsforSupplier = (_id, companyName) => {
    navigation.navigate('Home', {
      params: {supplier: _id, screenTitle: companyName},
      screen: 'ViewProducts',
      initial: false,
    });
  };
  useEffect(() => {
    SuppliersService.getSuppliers({
      limit: 4,
      page: 1,
    })
      .then(res => {
        const {count = 0, suppliers = []} = res.data || {};
        setSuppliers(suppliers);
      })
      .catch(e => {
        alert(e.response?.data?.err || 'Something went wrong!');
      });
  }, []);
  return (
    <SafeAreaView>
      <Text style={styles.title}>Stores</Text>
      <ScrollView>
        <View style={styles.subcard2holder}>
          {suppliers.map(supplier => (
            <Pressable
              onPress={() =>
                viewProductsforSupplier(supplier._id, supplier.companyName)
              }>
              <View style={styles.card}>
                <Image
                  style={styles.cardimageholder}
                  source={{uri: supplier.imageURL}}></Image>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    fontSize: 50,
    fontWeight: 700,
    width: '100%',
    padding: 25,
  },

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFF',
    height: 200,
  },
  card: {
    width: '100%',
  },
  cardimageholder: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  subcard2holder: {
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'space-between',
    gap: 20,
    padding: 25,
    backgroundColor: 'white',
  },
});
