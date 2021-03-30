import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
