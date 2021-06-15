import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, paddingSizes } from "../utils/sizes";

const minutesToMillis = (minute) => minute * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused }) => {
  const [millis, setMillis] = useState(minutesToMillis(20));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontFamily: "mt-bold",
    color: colors.white,
    marginTop: paddingSizes.medium,
    padding: fontSizes.large,
    backgroundColor: "rgba(120, 51, 0, 0.4)",
  },
});
