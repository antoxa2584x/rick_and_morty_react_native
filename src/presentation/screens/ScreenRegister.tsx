import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from './Screens';
import CharactersListScreen from './characters/CharactersListScreen';

const Stack = createStackNavigator();

export default class ScreensRegister {
  static rootStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}>
          <Stack.Screen
            name={Screens.MAIN_STACK}
            component={ScreensRegister.MainStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  static MainStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: 'black',
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name={Screens.CHARACTER_LIST_SCREEN}
          component={CharactersListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}
