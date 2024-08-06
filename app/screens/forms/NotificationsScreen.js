import React, { useState, useEffect } from 'react';
import { View, StyleSheet,  Switch } from 'react-native';
import Screen from '../../components/Screen';
import HeaderText from '../../components/HeaderText';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import AppLogo from '../../components/AppLogo';
import AppButton from '../../components/AppButton';
import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
const NotificationsScreen = (props) => {
  const userId =  props.route.params.user.userId;
  const checkNotificationApi = useApi(usersApi.checkNotification);


  const [isEnabled, setIsEnabled] = useState(false);
  console.log("🚀 ~ NotificationsScreen ~ isEnabled:", isEnabled)


  useEffect(() => {
    checkUsersNotificationSettings(userId);
  },[]);

  const checkUsersNotificationSettings = async (userId) => {
    const result = await checkNotificationApi.request(userId);
    console.log("🚀 ~ NotificationsScreen ~ result:", result.data)
    // if (result.data == 'true') {
    //  // setIsEnabled(true);
    // } else {
    //  // setIsEnabled(false);
    // }
  }
  // This function will be called when the user toggles the switch
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // Handle enabling/disabling notifications here
    if (!isEnabled) {
      // Code to enable notifications
    } else {
      // Code to disable notifications
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppLogo />
        <HeaderText style={styles.title}>
          Notifications
        </HeaderText>
       
        <View style={styles.switchContainer}>
          {/* <Text style={styles.label}>{isEnabled ? 'Disable Notifications' : 'Enable Notifications'}</Text> */}
          <Switch
            trackColor={{ false: "black", true: "white" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {isEnabled ? (
          <AppText style={styles.comment}>
            Notifications are currently enabled.
             Click here to disable them.
          </AppText>
        ) : (
          <AppText style={styles.comment}>
            Notifications are currently disabled. Click here to enable them.
          </AppText>
        )}
        <AppButton title="Save Selection" color="gold" onPress={() => console.log('dfdf')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
   
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:colors.primary,
  },
  comment: {
    color:colors.gold,
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    color:'gold'
  },
  switchContainer: {
  flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',

  },
  label: {
    fontSize: 18,
    marginRight: 8,
    color:colors.gold
  },
});

export default NotificationsScreen;
