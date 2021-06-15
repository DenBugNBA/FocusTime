import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, paddingSizes } from "../../utils/sizes";
import { colors } from "../../utils/colors";

export const FocusInput = ({ setFocusSubject }) => {
  const [tempItem, setTempItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Enter here..."
            selectionColor={colors.paleOrange}
            style={{ flex: 1, marginRight: 11 }}
            underlineColor={colors.paleOrange}
            theme={{
              colors: {
                text: colors.black,
                primary: colors.brightOrange,
                background: colors.white,
              },
            }}
            onSubmitEditing={({ nativeEvent }) => {
              setTempItem(nativeEvent.text);
              setFocusSubject(tempItem);
            }}
            onChangeText={(text) => {
              setTempItem(text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              setFocusSubject(tempItem);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: Platform.OS === "android" ? paddingSizes.medium : 18,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: fontSizes.large,
    fontFamily: "mt-bold",
  },
  inputContainer: {
    paddingTop: paddingSizes.medium,
    flexDirection: "row",
    alignItems: "center",
  },
});
