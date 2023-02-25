import { SafeAreaView, ScrollView, View ,Image, StyleSheet, Text } from "react-native";

export default function StoresScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.title}>Stores</Text>
        <ScrollView>
            <View style = {styles.imageholder}>

      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t39.30808-6/307317580_192243113187416_3278791085684623431_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dUkFDc4-BqAAX_OxIXi&_nc_ht=scontent.fcai2-2.fna&oh=00_AfAvth5ROf3dBvtVqOOnqQugQ4UMHEQ4hpN5pdk_HvmgjA&oe=63FB5581" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/299685801_5138280906294387_7991562011588907931_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OmAxaC5D8YMAX9owyV9&_nc_ht=scontent.fcai2-1.fna&oh=00_AfA8__pUOljVGyhWBcDfPqL8bQMHySLt4BhabPhGOFeKbA&oe=63FFB1EA" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t31.18172-8/665460_434144229956164_1282990638_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=2aqwIK6g60sAX8-BUtO&_nc_ht=scontent.fcai2-1.fna&oh=00_AfCkjmk8uoQ-LaGWk1-tXEmz54vN1dsiMF2diROH7b0VTA&oe=6421741C" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/277580457_376103014524313_4416877040863470373_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g7htpCBlEPoAX_1mcFW&_nc_ht=scontent.fcai2-1.fna&oh=00_AfBYSmQKIofpJBfz3fw_yAqs0BrO6OUwHYoiUiR9Gr8eDw&oe=63FFD041" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t39.30808-6/307317580_192243113187416_3278791085684623431_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dUkFDc4-BqAAX_OxIXi&_nc_ht=scontent.fcai2-2.fna&oh=00_AfAvth5ROf3dBvtVqOOnqQugQ4UMHEQ4hpN5pdk_HvmgjA&oe=63FB5581" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/299685801_5138280906294387_7991562011588907931_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OmAxaC5D8YMAX9owyV9&_nc_ht=scontent.fcai2-1.fna&oh=00_AfA8__pUOljVGyhWBcDfPqL8bQMHySLt4BhabPhGOFeKbA&oe=63FFB1EA" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t31.18172-8/665460_434144229956164_1282990638_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=2aqwIK6g60sAX8-BUtO&_nc_ht=scontent.fcai2-1.fna&oh=00_AfCkjmk8uoQ-LaGWk1-tXEmz54vN1dsiMF2diROH7b0VTA&oe=6421741C" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/277580457_376103014524313_4416877040863470373_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g7htpCBlEPoAX_1mcFW&_nc_ht=scontent.fcai2-1.fna&oh=00_AfBYSmQKIofpJBfz3fw_yAqs0BrO6OUwHYoiUiR9Gr8eDw&oe=63FFD041" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-2.fna.fbcdn.net/v/t39.30808-6/307317580_192243113187416_3278791085684623431_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=dUkFDc4-BqAAX_OxIXi&_nc_ht=scontent.fcai2-2.fna&oh=00_AfAvth5ROf3dBvtVqOOnqQugQ4UMHEQ4hpN5pdk_HvmgjA&oe=63FB5581" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/299685801_5138280906294387_7991562011588907931_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OmAxaC5D8YMAX9owyV9&_nc_ht=scontent.fcai2-1.fna&oh=00_AfA8__pUOljVGyhWBcDfPqL8bQMHySLt4BhabPhGOFeKbA&oe=63FFB1EA" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t31.18172-8/665460_434144229956164_1282990638_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=2aqwIK6g60sAX8-BUtO&_nc_ht=scontent.fcai2-1.fna&oh=00_AfCkjmk8uoQ-LaGWk1-tXEmz54vN1dsiMF2diROH7b0VTA&oe=6421741C" }} />
      <Image style={styles.pic} source={{ uri: "https://scontent.fcai2-1.fna.fbcdn.net/v/t39.30808-6/277580457_376103014524313_4416877040863470373_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g7htpCBlEPoAX_1mcFW&_nc_ht=scontent.fcai2-1.fna&oh=00_AfBYSmQKIofpJBfz3fw_yAqs0BrO6OUwHYoiUiR9Gr8eDw&oe=63FFD041" }} />
      
            </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    pic: {
        width: "50%",
        height:150,
        resizeMode:"contain"
 
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 25,
        fontWeight: 700,
        width:"100%",
        padding:25
    
      },
      imageholder:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        // gap:30

        
      },
  container: {
    flex: 1,
    backgroundColor: "white",
    display:"flex",
    justifyContent:""
  },
})