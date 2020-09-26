import React, {PureComponent} from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  Text,
  // StatusBar,
} from 'react-native';
// import PropTypes from 'prop-types';

export default class Setting extends PureComponent {
  // static propTypes = {
  //   prop: PropTypes
  // }

  static options() {
    return {
      topBar: {
        title: {
          text: 'Setting',
        },
      },
    };
  }

  render() {
    return (
      <View style={styles.settingWrap}>
        <Text>Setting Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingWrap: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
