import { StyleSheet, Platform } from 'react-native';

export const ionicIconSelect = name => Platform.select({ios: `ios-${name}`, android: `md-${name}`});

export const fetchWithTimeout = (url, options, timeout = 30000) => 
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);

export const inlineStyle = styleProps => StyleSheet.create({ style: styleProps }).style;
