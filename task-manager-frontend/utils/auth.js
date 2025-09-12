// utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'tm_token';

export const storeToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('storeToken error', e);
  }
};

// Alias for clarity in other modules/prompts
export const setToken = storeToken;

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('getToken error', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('removeToken error', e);
  }
};
