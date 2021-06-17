import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";

import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, paddingSizes } from "../../utils/sizes";

const HistoryItem = ({ item, index }) => {
  //   console.log(item);
  return <Text style={historyItemStyles(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  //   console.log(focusHistory);
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.androidSafeArea}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Your Focus history:</Text>
            <FlatList
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{
                alignItems: "center",
              }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const historyItemStyles = (status) => ({
  color: status > 1 ? "red" : "green",
  paddingTop: paddingSizes.small,
  fontSize: fontSizes.medium + 4,
});

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 0.5,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 15 : 0,
  },
  title: {
    fontSize: fontSizes.large,
    color: colors.black,
  },
  clearContainer: {
    alignItems: "center",
    padding: paddingSizes.medium,
  },
});
