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

  const viewproducts = () => {
    navigation.navigate('Cart', {
      params: {store: 'SamirandAli'},
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
        alert(e.response.data.err);
      });
  }, []);
  return (
    <SafeAreaView>
      <Text style={styles.title}>Stores</Text>
      <ScrollView>
        <View style={styles.subcard2holder}>
          {suppliers.map(supplier => (
            <Pressable>
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
  },
  card: {
    width: '100%',
  },
  cardimageholder: {
    height: 150,
    width: 150,
  },
  subcard2holder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'space-between',
    gap: 20,
    padding: 25,
  },
});
