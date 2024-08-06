import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import PlayerDetails from "../components/player/PlayerDetails";
import ListitemSeperator from "../components/ListitemSeperator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import config from "../config/config";
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
  //   title: "My Messages-Coming soon...",
  //   icon: {
  //     name: "email",
  //     backgroundColor: colors.AccentPurple,
  //   },
  //   targetScreen: "Messages",
  // },
  {
    title: "Notifications",
    icon: {
      name: "bell",
      backgroundColor: colors.AccentPurple,
    },
    targetScreen: "Notifications",
  },
];

const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();
  console.log("🚀 ~ AccountScreen ~ user:", user)

  return (
    <>
      <ActivityIndicator visible={!user} />
      <Screen style={styles.screen}>
        <LinearGradient
          colors={colors.secondaryGradientArray}
          style={styles.background}
        >
          <View style={styles.container}>
            <PlayerDetails
              title={user.nickName}
              subTitle="Go To Personal Stats"
              image={{ uri:user?.image.startsWith('https')? user.image : `${config.s3.baseUrl}${user.image}` }}
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
                  onPress={() => navigation.navigate(item.targetScreen, { user })}
                  ItemsSeperatorComponent={ListitemSeperator}
                />
              )}
            />
          </View>
          <View>
          </View>
          <PlayerDetails
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
            onPress={() => logOut()}
          />
        </LinearGradient>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  screen: {
    flex: 1,
  },
});

export default AccountScreen;
