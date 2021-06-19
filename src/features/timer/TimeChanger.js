import React from "react";
import { StyleSheet, View } from "react-native";

import { RoundedButton } from "../../components/RoundedButton";

export const TimeChanger = ({ changeTime }) => {
  return (
    <>
      <View style={styles.changeTimeButton}>
        <RoundedButton
          size={75}
          title="10"
          onPress={() => changeTime(10)}
        ></RoundedButton>
      </View>
      <View style={styles.changeTimeButton}>
        <RoundedButton
          size={75}
          title="15"
          onPress={() => changeTime(15)}
        ></RoundedButton>
      </View>
      <View style={styles.changeTimeButton}>
        <RoundedButton
          size={75}
          title="20"
          onPress={() => changeTime(20)}
        ></RoundedButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  changeTimeButton: {
    flex: 1,
    alignItems: "center",
  },
});
