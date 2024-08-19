import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';

const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <MaterialCommunityIcons name={icon} size={24} color={colors.gold} />
    <View style={styles.featureText}>
      <AppText style={styles.featureTitle}>{title}</AppText>
      <AppText style={styles.featureDescription}>{description}</AppText>
    </View>
  </View>
);

const HowToPlayScreen = () => {
  return (
    <Screen style={styles.screen}>
      <ImageBackground
        source={require('../assets/newLogo.jpeg')}
        style={styles.background}
        blurRadius={5}
      >
        <View style={styles.overlay} />
        <ScrollView>
          <AppText style={styles.title}>How to Use Poker Donkey</AppText>

          <AppText style={styles.subtitle}>Getting Started</AppText>
          <FeatureItem
            icon="account-plus"
            title="Create an Account"
            description="Sign up to start tracking your poker games and joining leagues."
          />

          <AppText style={styles.subtitle}>Leagues</AppText>
          <FeatureItem
            icon="plus-circle"
            title="Create a League"
            description="Start your own league and invite friends to join."
          />
          <FeatureItem
            icon="account-group"
            title="Join a League"
            description="Enter a league number to join an existing league."
          />

          <AppText style={styles.subtitle}>Tracking Games</AppText>
          <FeatureItem
            icon="poker-chip"
            title="Start a Live Game"
            description="Begin tracking a new poker session within a league."
          />
          <FeatureItem
            icon="cash-multiple"
            title="Record Buy-ins and Profits"
            description="Enter the buy-in for every player during the game
            and the cash every player has at the end of the game."
          />

          <AppText style={styles.subtitle}>Stats and Analysis</AppText>
          <FeatureItem
            icon="chart-bar"
            title="View Player Stats"
            description="See individual stats like total profit, average profit, and success rate."
          />
          <FeatureItem
            icon="chart-line"
            title="League Statistics"
            description="Access league-wide stats including top performers and overall trends."
          />

          <AppText style={styles.subtitle}>Tips for Success</AppText>
          <AppText style={styles.tip}>
            1. Consistently track all your games for accurate stats.
          </AppText>
          <AppText style={styles.tip}>
            2. Use the app's insights to improve your poker strategy.
          </AppText>
          <AppText style={styles.tip}>
            3. Engage with your league to make the most of the social features.
          </AppText>
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 20,
    // backgroundColor: colors.background,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.gold,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    marginRight: 10,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gold,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.light,
  },
  tip: {
    fontSize: 14,
    color: colors.light,
    marginBottom: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
    opacity: 0.55,
  },
});

export default HowToPlayScreen;
