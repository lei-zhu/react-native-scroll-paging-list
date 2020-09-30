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
  // StatusBar,
} from 'react-native';
// import PropTypes from 'prop-types';

export default class ScrollPagingList extends PureComponent {
  // static propTypes = {
  //   prop: PropTypes
  // }

  static options() {
    return {
      topBar: {
        title: {
          text: 'Scroll Paging List',
        },
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      loading: false,
      refreshing: false,
      refreshFlag: false,
    };
  }

  itemRender = ({item}) => {
    const {title, img} = item;
    return (
      <View style={[]}>
        <Image source={{uri: img}} style={[]} />
        <Text style={[]}>{title}</Text>
      </View>
    );
  };

  getItemLayout = (item, index) => {
    const ITEM_HEIGHT = 120;
    const ITEM_SPEARATOR_HEIGHT = 10;

    const offset = ITEM_HEIGHT * index + ITEM_SPEARATOR_HEIGHT * index;
    console.log(`getItemLayout offset: ${offset}`);

    return {
      length: ITEM_HEIGHT,
      offset,
      index,
    };
  };

  keyExtractor = (item, index) => {
    const {title} = item;
    return `${index}-${title}`;
  };

  handleDataListRefresh = () => {
    //
  };

  handleLoadNextPageDataList = () => {
    //
  };

  renderRefreshControl = () => {
    const {refreshing} = this.state;
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this.handleDataListRefresh}
        colors={['#FF3300']} // andriod
        tintColor={'#FF3300'} // ios
        progressBackgroundColor={'#ffffff'}
      />
    );
  };

  renderItemSeparatorComponent = () => {
    return <View />;
  };

  renderListEmptyComponent = () => {
    return (
      <View>
        <Image source={{}} />
        <Text>矮油，什么都没有耶</Text>
      </View>
    );
  };

  renderListFooterComponent = () => {
    return <View />;
  };

  renderListHeaderComponent = () => {
    return <View />;
  };

  render() {
    const {dataList, refreshFlag} = this.state;
    return (
      <View style={styles.scrollPagingListWrap}>
        <FlatList
          data={dataList}
          extraData={{refreshFlag}}
          renderItem={this.itemRender}
          getItemLayout={this.getItemLayout} // 用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度
          keyExtractor={this.keyExtractor} // 此函数用于为给定的 item 生成一个不重复的 key
          refreshControl={this.renderRefreshControl} // 下拉刷新组件
          onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发 onEndReached 回调
          onEndReached={this.handleLoadNextPageDataList} // 当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用
          ItemSeparatorComponent={this.renderItemSeparatorComponent} // 行与行之间的分隔线组件
          ListEmptyComponent={this.renderListEmptyComponent} // 列表为空时显示
          ListFooterComponent={this.renderListFooterComponent} // 尾部组件
          ListHeaderComponent={this.renderListHeaderComponent} // 头部组件
          progressViewOffset={0} // 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollPagingListWrap: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
