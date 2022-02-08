import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, Appearance } from "react-native";
import { readKey } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { Lotiesplash } from "./component/lottie";
import { styles } from "../theme/appTheme";
import { useTheme } from 'react-native-paper';

const Splashc = () => {

  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();

  const navigation = useNavigation();
  const [llave, setLlave] = useState("");
  readKey().then((value) => {
    setLlave(value);
  });

  setTimeout(() => {
    if (llave != null && llave != "" && llave != undefined) {
      navigation.navigate("Pass" as any);
    }
    navigation.navigate("Home" as any);
  }, 3500);



  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
      <StatusBar 
        backgroundColor= {colors.background}
        barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
      />
      <View
        style={[
          styles.completo,
          {backgroundColor:colors.background,alignItems: "center", justifyContent: "center"}
        ]}
      >
        <Lotiesplash />
      </View>
    </SafeAreaView>
  );
};

export default Splashc;
