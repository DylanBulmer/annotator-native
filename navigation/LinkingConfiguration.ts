import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'LoginScreen',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'HomeScreen',
            },
          },
        },
      },
      // NotFound: '*', // this breaks the signin processes.
    },
  },
};
