import React from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import AppText from "../AppText";
import colors from "../../config/colors";
import config from "../../config/config";
import { navigationRef } from "../../navigation/rootNavigation";
import routes from "../../navigation/routes";

const PlayerInfo = ({
  leaguePlayers,
  onPress,
  width = 30,
  height = 30,
  borderColor = "AccentPurple",
}) => {
  if(!onPress) onPress = (item) => navigationRef.current.navigate(routes.PERSONAL_STATS, { userDetails: item.User});
  return (
    <View style={styles.container}>
      <FlatList
        data={leaguePlayers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={6} // Adjust this number based on how many items you want per row
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={styles.playerContainer}
          >
            <Image
              style={[
                styles.image,
                { width, height, borderColor: colors[borderColor] },
              ]}
              source={{ uri: `${config.s3.baseUrl}${item.User.image}` }}
            />
            <AppText style={styles.playerName}>{item.User.nickName}</AppText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 50,
    height: 30,
    width: 30,
    borderColor: colors.AccentPurple,
    borderWidth: 2,
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    // margin: 5,
  },
  playerName: {
    color: colors.AccentPurple,
    fontSize: 8,
    textAlign: "center",
  },
});

export default PlayerInfo;
