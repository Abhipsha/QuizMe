import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { QuizScreen } from "./container/QuizScreen/index";
export default function App() {
  return (
    <SafeAreaView
      style={{ flex: 1, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}
    >
      <QuizScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
