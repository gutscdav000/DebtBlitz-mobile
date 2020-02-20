# DebtBlitz-mobile


**steps to setup React Native Debugger**
1) run: 'brew update && brew cask install react-native-debugger'
2) make sure the composeWithDevTools HOC is wrapping the middleware where the redux store is instantiated in App.js.
3) run: 'yarn start' then in another window run 'yarn run debug'
4) in your emulator make sure to enable remote debugging:
    - IOS simulator: cmd + d/ctrl + d then start remote debugging
    - android sim: cmd + m/ctrl + m then start remote debugging
this video might help if you have issues:
https://www.youtube.com/watch?v=JY279kbJ0KM