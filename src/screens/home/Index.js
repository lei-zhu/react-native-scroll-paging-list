import React, {PureComponent} from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  // Text,
  Button,
  // StatusBar,
} from 'react-native';
// import PropTypes from 'prop-types';

import {Navigation} from 'react-native-navigation';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {zoomHeight} from '../../utils/getScreenSize';

export default class Home extends PureComponent {
  // static propTypes = {
  //   prop: PropTypes
  // }

  static options() {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
        subtitle: {
          text: 'react native scroll paging list',
        },
      },
    };
  }

  constructor(props) {
    super(props);

    AntDesignIcons.getImageSource('github', 24).then((githubIcon) => {
      Navigation.mergeOptions('HOME_SCREEN', {
        topBar: {
          rightButtons: [
            {
              id: 'homeTopBarGithub',
              icon: githubIcon,
            },
          ],
        },
      });
    });
  }

  render() {
    return (
      <View style={styles.homeWrap}>
        <Button
          title="FlatList Demo"
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Home.FlatListDemo',
              },
            });
          }}
        />
        <View style={[styles.separatorWrap]} />
        <Button
          title="Video Player Demo"
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Home.VideoPlayerDemo',
              },
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeWrap: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  separatorWrap: {
    height: 30 / zoomHeight,
  },
});
