import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { colors } from "../../utils/colors";
import { fontSizes, paddingSizes } from "../../utils/sizes";

import { ProgressBar } from "react-native-paper";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { TimeChanger } from "./TimeChanger";

let key = 0; // key for re-rendering Countdown component

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.25);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const ONE_SECOND_IN_MS = 500;

  const PATTERN = [
    0 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(PATTERN);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(10);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    if (min === minutes) {
      key = String(new Date().getTime());
    } else {
      setMinutes(min);
    }
    setProgress(1);
    setIsStarted(false);
  };

  // useEffect(() => {
  //   // console.log(minutes);
  // }, [minutes]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
          key={key}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>
          Focusing on: <Text style={styles.task}>{focusSubject}</Text>
        </Text>
      </View>
      <ProgressBar
        color={progress < 0.2 ? "#ff0000" : colors.brown}
        style={{ height: 7, marginTop: paddingSizes.medium }}
        progress={progress}
      />
      <View style={styles.buttonWrapper}>
        <TimeChanger changeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="Back" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "mt-light",
    color: colors.black,
    textAlign: "center",
    fontSize: fontSizes.medium,
  },
  task: {
    fontSize: fontSizes.medium,
    fontFamily: "mt-bold",
    color: colors.black,
    textAlign: "center",
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: paddingSizes.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: paddingSizes.large,
    paddingLeft: paddingSizes.large,
  },
});
