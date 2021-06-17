import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, paddingSizes } from "../utils/sizes";

const minutesToMillis = (minute) => minute * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));

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
    // console.log(millis / minutesToMillis(minutes));
    return () => clearInterval(interval.current);
  }, [isPaused, millis]);

  // console.log(millis);

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
    backgroundColor: colors.brown,
  },
});
