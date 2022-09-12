# React Native App for Impulse

### Featuring

- iOS
- Android
- Web

## How to run

```
npm install
npm run web:local
```

## How To Debug React Native in VSCode

### Step by Step

1 - Add [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native) extension to VSCode

2 - From VSCode's Run and Debug section, select `create launch.json file`

3 - When asked to Select Environment, pick React Native

4 - From the `Pick debug configurations` modal, select `Attach to Packager` and make sure to deselect all the other boxes

5 - Run the app on android or ios `npm run ios` || `npm run android`

6 - Go to Run and Debug section on VSCode and press `Start debugging` (the green Play button to the left of Attach to packager button)

7 - From the Simulator window where the app is actively runing, press D, to show the React Native options and select Debug (or Debug with Chrome)

8 - Add breakpoints (possubly to a button target function) and make sure it works

### References:

[React Native Tutorial #21 (2021) - Debugging in VS Code](https://www.youtube.com/watch?v=UE66n7HOIAg)
[Webcam Usage Reference](https://github.com/aaronleopold/cheese/tree/5289dd37fa9d32e3099b334e9f4f837ce9a5f85f/src/renderer/hooks)
