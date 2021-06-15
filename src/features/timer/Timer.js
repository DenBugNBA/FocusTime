import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { colors } from "../../utils/colors";
import { fontSizes, paddingSizes } from "../../utils/sizes";
import { Countdown } from "../../components/Countdown";

export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <Countdown />
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>
          Focusing on: <Text style={styles.task}>{focusSubject}</Text>
        </Text>
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
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.medium,
  },
  task: {
    fontSize: fontSizes.medium,
    fontFamily: "mt-bold",
    color: colors.white,
    textAlign: "center",
  },
});
