import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../utils/colors";
import { fontSizes, paddingSizes } from "../utils/sizes";

const minutesToMillis = (minute) => minute * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  // const [showText, setShowText] = useState(true);

  // useEffect(() => {
  //   // Change the state every second or the time given by User.
  //   const interval = setInterval(() => {
  //     setShowText((showText) => !showText);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return 0;
      }
      const timeleft = time - 1000;
      return timeleft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
    return () => clearInterval(interval.current);
  }, [isPaused, millis]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={[styles.minutesStyle, countdownStyles(millis, minutes)]}>
        {formatTime(minute)}
      </Text>
      <Text style={[styles.colonStyle, countdownStyles(millis, minutes)]}>
        {" "}
        :{" "}
      </Text>
      <Text style={[styles.secondsStyle, countdownStyles(millis, minutes)]}>
        {formatTime(second)}
      </Text>
    </View>
  );
};

const countdownStyles = (millis, minutes) => ({
  fontSize: fontSizes.xxxl - 2,
  fontFamily: "mt-bold",
  color: millis / minutesToMillis(minutes) < 0.2 ? "#ff0000" : colors.white,
});

const styles = StyleSheet.create({
  container: {
    marginTop: paddingSizes.medium,
    padding: fontSizes.medium,
    backgroundColor: "#b07a2f",
    height: 118,
    fontSize: 12,
    minWidth: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    borderRadius: 70,
  },
  minutesStyle: {
    position: "absolute",
    top: 5,
    left: 21,
  },
  colonStyle: {
    position: "absolute",
    left: 131,
  },
  secondsStyle: {
    position: "absolute",
    top: 5,
    left: 201,
  },
});
