import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


describe('AsyncStorage', () => {
  it('checks if Async Storage calls setItem with correct values', async () => {
    const key = 'token';
    const value = 't0ken';
    await AsyncStorage.setItem(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('checks if Async Storage calls getItem with correct key', async () => {
    const key = 'token';
    await AsyncStorage.getItem(key);
    expect(AsyncStorage.getItem).toBeCalledWith(key);
  });
});
