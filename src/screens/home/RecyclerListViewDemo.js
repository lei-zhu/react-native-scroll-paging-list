import React, {PureComponent} from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {zoomWidth, zoomHeight} from '../../utils/getScreenSize';

export default class RecyclerListViewDemo extends PureComponent {
  static options() {
    return {
      topBar: {
        title: {
          text: 'Recycler ListView Demo',
        },
      },
      bottomTabs: {visible: false},
    };
  }

  render() {
    return (
      <View>
        <Text>RecyclerListViewDemo</Text>
      </View>
    );
  }
}
