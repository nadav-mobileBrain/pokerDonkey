import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import PlayerDetails from "../components/player/PlayerDetails";
import ListitemSeperator from "../components/ListitemSeperator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Leagues",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.PrimaryBlue,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.AccentPurple,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <PlayerDetails
          title={user.nickName}
          subTitle="Joined at 2019-09-09"
          image={require("../assets/bibsDonkey.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <PlayerDetails
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
              ItemsSeperatorComponent={ListitemSeperator}
            />
          )}
        />
      </View>
      <PlayerDetails
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
