/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Home from './src/screens/home/Index';
import FlatListDemo from './src/screens/home/FlatListDemo';
import Setting from './src/screens/setting/Index';

const themeColor = '#1890ff';
const whiteColor = '#ffffff';
const fontSize = 14;
const selectedFontSize = 14;

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Home.FlatListDemo', () => FlatListDemo);
Navigation.registerComponent('Setting', () => Setting);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: themeColor,
  },
  topBar: {
    background: {
      color: themeColor,
    },
    backButton: {
      color: whiteColor,
    },
    title: {
      color: whiteColor,
      fontSize: fontSize,
    },
    subtitle: {
      color: whiteColor,
      fontSize: fontSize - 2,
    },
    leftButtonColor: whiteColor,
    rightButtonColor: whiteColor,
  },
  bottomTab: {
    fontSize: fontSize,
    selectedFontSize: selectedFontSize,
    fontWeight: '400',
    selectedTextColor: themeColor,
    selectedIconColor: themeColor,
  },
  bottomTabs: {
    tabsAttachMode: 'afterInitialTab', // tab 初始化后再加载页面
    titleDisplayMode: 'alwaysShow',
  },
});

async function prepareIcons() {
  const icons = await Promise.all([
    AntDesignIcons.getImageSource('home', 24),
    AntDesignIcons.getImageSource('setting', 24),
  ]);

  const [homeIcon, settingsIcon] = icons;
  return {homeIcon, settingsIcon};
}

Navigation.events().registerAppLaunchedListener(async () => {
  const icons = await prepareIcons();
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'Home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: icons.homeIcon,
                  text: 'Home',
                },
              },
            },
          },
          {
            stack: {
              id: 'SETTING_TAB',
              children: [
                {
                  component: {
                    id: 'SETTING_SCREEN',
                    name: 'Setting',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: icons.settingsIcon,
                  text: 'Setting',
                },
              },
            },
          },
        ],
      },
    },
  });
});
