import { TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from './AppText';
import colors from '../config/colors';

const HowToPlay = ({
  navigation,
  textColor = 'secondary',
  align = 'center',
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('HowToPlay')}>
      <AppText
        style={[
          styles.helpLink,
          { color: colors[textColor], textAlign: align },
        ]}
      >
        How To Play?
      </AppText>
    </TouchableOpacity>
  );
};

const styles = {
  helpLink: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginVertical: 2,
  },
};
export default HowToPlay;
