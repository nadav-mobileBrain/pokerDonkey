import Aptabase from '@aptabase/react-native';

export const useAptabase = () => {
  const trackEvent = (eventName, properties = {}) => {
    Aptabase.trackEvent(eventName, properties);
  };

  return { trackEvent };
};
