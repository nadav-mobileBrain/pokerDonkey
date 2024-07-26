import React from "react";
import { StyleSheet, View, FlatList ,ImageBackground} from "react-native";

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
  {
    title: "My Messages-Coming soon...",
    icon: {
      name: "email",
      backgroundColor: colors.AccentPurple,
    },
    targetScreen: "Messages",
  },
];

const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();

  return (
    <>
      <ActivityIndicator visible={!user} />
      <Screen style={styles.screen}>
      <ImageBackground
      style={styles.background}
      source={require("../assets/bg56.webp")}>
          <View style={styles.overlay} />
          <View style={styles.container}>
            <PlayerDetails
              title={user.nickName}
              subTitle="Go To Personal Stats"
              image={{ uri: `${config.s3.baseUrl}${user.image}` }}
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
          <PlayerDetails
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
            onPress={() => logOut()}
          />
        </ImageBackground>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.20,
  },
});

export default AccountScreen;
