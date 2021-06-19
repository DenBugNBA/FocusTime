import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";
import { colors } from "./src/utils/colors";
import { paddingSizes } from "./src/utils/sizes";

import { FocusInput } from "./src/features/focus/FocusInput";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";

const fonts = () =>
  Font.loadAsync({
    "mt-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "mt-light": require("./assets/fonts/Montserrat-Light.ttf"),
  });

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [font, setFont] = useState(false);
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  // useEffect(() => {
  //   if (focusSubject) {
  //     setFocusHistory([...focusHistory, focusSubject]);
  //   }
  // }, [focusSubject]);
  // console.log(focusHistory);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };
  // console.log(focusHistory);

  const onClearFocusHistory = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history.length)) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  if (font) {
    return (
      <View style={styles.container}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistorySubjectWithStatus(
                focusSubject,
                STATUSES.CANCELLED
              );
              setFocusSubject(null);
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <FocusInput setFocusSubject={setFocusSubject} />
            <FocusHistory
              focusHistory={focusHistory}
              onClear={onClearFocusHistory}
            />
          </View>
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
    paddingTop: paddingSizes.medium,
    backgroundColor: colors.paleOrange,
  },
});
