import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import PlayerDetails from "../components/player/PlayerDetails";
import ListitemSeperator from "../components/ListitemSeperator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import apiClient from "../api/client";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "Edit Profile",
    icon: {
      name: "account",
      backgroundColor: colors.PrimaryBlue,
    },
    targetScreen: "EditProfile",
  },
  // {
  //   title: "My Leagues",
  //   icon: {
  //     name: "format-list-bulleted",
  //     backgroundColor: colors.PrimaryBlue,
  //   },
  // },
  {
    title: "My Messages-Coming soon...",
    icon: {
      name: "email",
      backgroundColor: colors.AccentPurple,
    },
    targetScreen: "Messages",
  },
];

const serverUrl = apiClient.getBaseURL();

const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <PlayerDetails
          title={user.nickName}
          subTitle="Go To Personal Stats"
          //subTitle="Joined at 2019-09-09"
          image={{ uri: `${serverUrl}${user.image}` }}
          onPress={() => navigation.navigate(routes.PERSONAL_STATS)}
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
              onPress={() =>
                navigation.navigate(item.targetScreen, { user, navigation })
              }
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
};

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
