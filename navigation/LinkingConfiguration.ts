import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'Login',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
        },
      },
      // NotFound: '*', // this breaks the signin processes.
    },
  },
};
