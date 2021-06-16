import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { colors } from "../../utils/colors";
import { fontSizes, paddingSizes } from "../../utils/sizes";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { ProgressBar } from "react-native-paper";

export const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} onProgress={onProgress} />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>
          Focusing on: <Text style={styles.task}>{focusSubject}</Text>
        </Text>
      </View>
      <ProgressBar
        color={colors.brown}
        style={{ height: 7, marginTop: paddingSizes.medium }}
        progress={progress}
      />
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
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
    padding: paddingSizes.medium,
    justifyContent: "center",
    alignItems: "center",
  },
});
