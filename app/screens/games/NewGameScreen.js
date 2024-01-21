import React from "react";
import { View, StyleSheet, Text } from "react-native";

function NewGame({ route, navigation }) {
  console.log("🚀 ~ NewGame ~ route:", route);
  return (
    <View style={styles.container}>
      <Text>newwew</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NewGame;
