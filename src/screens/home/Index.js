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
          title="Scroll Paging List"
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Home.ScrollPagingList',
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
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
