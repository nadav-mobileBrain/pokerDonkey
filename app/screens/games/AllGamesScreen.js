import { View, Text, StyleSheet } from "react-native";
import React from "react";

const AllGamesScreen = ({ route }) => {
  const { league } = route.params;
  console.log("🚀 ~ AllGamesScreen ~ league:", league);
  return (
    <View>
      <Text>AllGamesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default AllGamesScreen;
