import { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import TopBar from "../components/topBar";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const toTitleCase = (s) => {
  try {
    if(typeof s !== "string") throw "";
    return `${s[0].toUpperCase()}${s.substring(1)}`
  } catch(e) {
    return s;
  }
}

export default function CategoriesScreen({ navigation }) {
  const dropdown = useRef(null);
  const [filter, setFilter] = useState("categories");
  const viewproducts = (category, screenTitle) => {
    navigation.navigate('Home', { params: { category, screenTitle }, screen: 'ViewProducts', initial: false });
  }

  const filters = [
    {
      id: "office",
      name: "Office",
      section: "categories",
    },
    {
      id: "school",
      name: "School",
      section: "categories",
    },
    {
      id: "drawing",
      section: "categories",
      name: "Drawing & Painting",
    },
    {
      id: "books",
      name: "Books",
      section: "categories",
    },
    {
      id: "crafts",
      name: "Crafts",
      section: "categories",
    },
    {
      id: "games",
      name: "Games",
      section: "categories",
    },
    {
      id: "copybooks",
      name: "Copybooks",
      section: "categories",
    },
    {
      id: "sculpture",
      name: "Sculpture",
      section: "categories",
    },
    {
      id: "adhesives",
      name: "Adhesives",
      section: "categories",
    },
    // ------
    {
      id: "architecture",
      name: "Architecture Engineering",
      section: "majors",
    },
    {
      id: "civil",
      name: "Civil Engineering",
      section: "majors",
    },
    {
      id: "mechanical",
      name: "Mechanical Engineering",
      section: "majors",
    },
    {
      id: "electrical",
      name: "Electrical Engineering",
      section: "majors",
    },
    {
      id: "computer",
      name: "Computer Engineering",
      section: "majors",
    },
    {
      id: "applied",
      name: "Applied Arts",
      section: "majors",
    },
    {
      id: "medicine",
      name: "Medicine",
      section: "majors",
    },
    {
      id: "dentistry",
      name: "Dentistry",
      section: "majors",
    },
    {
      id: "pharmacy",
      name: "Pharmacy",
      section: "majors",
    }
  ]

  const handleSelect = async (selectedItem, index) => {
    setFilter(selectedItem.toLowerCase())
    return selectedItem;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} iconColor="#FFFFFF" />
      <View style={styles.selectFilter}>
        {/* <Text style={styles.title}>{toTitleCase(filter)}</Text> */}
        <SelectDropdown
            ref={dropdown}
            onSelect={handleSelect}
            buttonStyle={styles.filter}
            dropdownIconPosition="right"
            data={["Categories", "Majors"]}
            defaultValue={toTitleCase(filter)}
            rowTextStyle={styles.filterText}
            buttonTextStyle={styles.title}
            dropdownStyle={styles.dropdown}
            // selectedRowStyle={styles.locationSelected}
            // rowTextForSelection={handleRowTextForSelection}
            // selectedRowTextStyle={styles.locationSelectedText}
            // buttonTextAfterSelection={handleButtonTextAfterSelection}
            renderDropdownIcon={(selectedItem, index) => (
              <MaterialCommunityIcons
                name="chevron-down"
                color={"#000000"}
                size={24}
              />
            )}
          >
        </SelectDropdown>
      </View>
      <ScrollView>
        <View>
          {filters.filter(({ section }) => section === filter).map(({ id, name }, i) => (
            <>
              {i % 2 !== 0 ? (
                <View style={styles.card1}>
                  <Pressable onPress={(e) => viewproducts(id, name)}>
                    <Text style={styles.card1Text}>{name}</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.card2}>
                  <Pressable onPress={(e) => viewproducts(id, name)}>
                    <Text style={styles.card1Text}>{name}</Text>
                  </Pressable>
                </View>
              )}
            </>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 700,
    textAlign: "left"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  card1: {
    width: "100%",
    // minHeight: "15%",
    paddingVertical: 24,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  }, 
  card2: {
    width: "100%",
    // minHeight: "15%",
    paddingVertical: 24,
    backgroundColor: "#FFE605",
    alignContent: "center",
    justifyContent: "center"
  },
  card1Text: {
    color: "black",
    fontWeight: 700,
    fontSize: 20,
    alignSelf: "center"
  },
  card2Text: {
    color: "white",
    fontWeight: 700,
    fontSize: 20,
    alignSelf: "center"
  },
  selectFilter: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 24,
    paddingHorizontal: 12,
  },
  filter: {
    padding: 0,
    width: "100%",
    textAlign: "left",
    backgroundColor: 'transparent',
  },
  dropdown: {
  }
})