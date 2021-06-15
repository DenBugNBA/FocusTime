import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { FocusInput } from "./src/features/focus/FocusInput";
import { Timer } from "./src/features/timer/Timer";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { colors } from "./src/utils/colors";
import { paddingSizes } from "./src/utils/sizes";

const fonts = () =>
  Font.loadAsync({
    "mt-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "mt-light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

export default function App() {
  const [font, setFont] = useState(false);
  const [focusSubject, setFocusSubject] = useState("gardening");

  if (font) {
    return (
      <View style={styles.container}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} />
        ) : (
          <FocusInput setFocusSubject={setFocusSubject} />
        )}
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFont(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === "ios" ? paddingSizes.medium : paddingSizes.medium,
    backgroundColor: colors.paleOrange,
  },
});
