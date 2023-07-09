import SelectDropdown from 'react-native-select-dropdown';
import { Image, Pressable, StyleSheet, View, Text, Modal, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../providers/auth';
import UsersService from '../services/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopBar = ({ navigation, iconColor = '#FFE605' }) => {
  const dropdown = useRef(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const { user, setUser, token, address, setAddress } = useContext(AuthContext);
  const data = useMemo(() => (
    (user.adresses || []).map(el => el.address)), [user]);
  const [newAddress, setNewAddress] = useState('');
  const handleSelect = async (selectedItem, index) => {
    setAddress(selectedItem);
    await AsyncStorage.setItem("address", selectedItem)
    return selectedItem;
  };

  const submitAddAddress = async () => {
    try {
      const res = await UsersService.updateAddress({
        address: newAddress
      }, token)
      setAddressModalVisible(!addressModalVisible)

      setAddress(newAddress)
      await AsyncStorage.setItem("address", newAddress)
      setNewAddress('')

      if (res?.data?.user) {
        setUser(res.data.user)
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user))

        dropdown.current.selectIndex(res.data.user.adresses.length - 1)
      }
    } catch (e) {
    }
  }

  const handleButtonTextAfterSelection = (selectedItem, index) => {
    return selectedItem;
  };
  const handleRowTextForSelection = (item, index) => {
    // text represented for each item in dropdown
    // if data array is an array of objects then return item.property to represent item in dropdown
    return item;
  };
  const addaddress = () => {
    setAddressModalVisible(true);
  };
  const handleNavigateProfile = () => {
    navigation.navigate('Home', { screen: 'Account', initial: false });
  };

  useEffect(() => {
    (async () => {
      const addr = await AsyncStorage.getItem("address")
      addr && setAddress(addr)
      if(addr && dropdown.current) {
        const i = (data || []).findIndex((a) => a === addr)
        dropdown.current.selectIndex(i)
      }
    })()
  }, [AsyncStorage, address, data, dropdown])
  return (
    <View style={styles.TopBar}>
      <Modal
        // style={}
        transparent={true}
        animationType="slide"
        visible={addressModalVisible}
        onRequestClose={() => {
          setAddressModalVisible(!addressModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Address</Text>
            <TextInput
              value={newAddress}
              editable={true}
              style={styles.textInput}
              onChangeText={$event => setNewAddress($event)}
              placeholder="Ex: Appartment, Floor, Building, Street, Area, City"
            />
            <View style={styles.actions}>
              <Pressable
                style={[styles.mbutton]}
                onPress={() => submitAddAddress()}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.mbutton, styles.mbuttonClose]}
                onPress={() => setAddressModalVisible(!addressModalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <DrawerToggleButton pressColor={'#000000'} tintColor={'#000000'} />
      <View style={styles.locationHolder}>
        <SelectDropdown
          data={data}
          ref={dropdown}
          onSelect={handleSelect}
          dropdownIconPosition="left"
          buttonStyle={styles.location}
          defaultValue={address || data[0]}
          rowTextStyle={styles.locationRowText}
          buttonTextStyle={styles.locationText}
          dropdownStyle={styles.locationDropdown}
          selectedRowStyle={styles.locationSelected}
          rowTextForSelection={handleRowTextForSelection}
          selectedRowTextStyle={styles.locationSelectedText}
          buttonTextAfterSelection={handleButtonTextAfterSelection}
          renderDropdownIcon={(selectedItem, index) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={iconColor}
              size={24}
            />
          )}>
        </SelectDropdown>
        <Pressable style={styles.button} onPress={addaddress}>
          <Text style={styles.buttontext}>+</Text>
        </Pressable>
      </View>
      <Pressable onPress={handleNavigateProfile}>
        <Image
          style={styles.pic}
          source={{
            uri: 'https://scontent.fcai2-2.fna.fbcdn.net/v/t1.6435-9/78416817_10218449129812468_5834337807438446592_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RhmGHff4ErYAX_u8Rsd&_nc_ht=scontent.fcai2-2.fna&oh=00_AfBZHofQDA_ct-42lh03bD-loNMK9Lfv5Fq5lUwWKt4vAA&oe=63FE5852',
          }}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 150,
    backgroundColor: '#FFE605',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    fontWeight: 700,
    fontSize: 15,
    alignSelf: 'center',
    color: 'white',
  },
  TopBar: {
    width: '100%',
    display: 'flex',
    paddingVertical: 6,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  pic: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  locationHolder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    width: 150,
    height: 20,
    backgroundColor: 'transparent',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 500,
  },
  locationSelectedText: {
    fontSize: 16,
    fontWeight: 900,
  },
  locationRowText: {
    fontSize: 14,
  },
  locationDropdown: {
    borderRadius: 12,
  },
  locationSelected: {
    color: '#000000',
    backgroundColor: '#FFE605',
  },

  //modal

  textInput: {
    padding: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#EEE',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  centeredView: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    width: "90%",
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actions: {
    gap: 4,
    display: "flex",
    flexDirection: "row"
  },
  mbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFE605',
  },
  mbuttonClose: {
    backgroundColor: 'firebrick',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TopBar;
