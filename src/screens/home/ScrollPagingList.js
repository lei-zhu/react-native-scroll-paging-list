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
import {zoomWidth, zoomHeight} from '../../utils/getScreenSize';

import IMG_CAT from '../../assets/cat.png';
import IMG_PANDA from '../../assets/panda.png';

const ITEM_HEIGHT = 240 / zoomHeight;
const ITEM_SPEARATOR_HEIGHT = 12 / zoomHeight;
const API_ADDRESS = 'http://apis.juhe.cn/goodbook/query';

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
      pageNumber: 1,
      pageSize: 10,
      dataList: [],
      totalCount: null,
      totalPages: null,
      loading: false,
      refreshing: false,
      refreshFlag: false,
      finished: false,
    };
  }

  componentDidMount() {
    const {pageNumber, pageSize} = this.state;
    this.getPageDataList(pageNumber, pageSize);
  }

  fetchRequest = async (url, request) => {
    return new Promise((resolve, reject) => {
      fetch(url, request)
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getPageDataList = async (pageNumber, pageSize) => {
    this.setState({loading: true});

    const {dataList} = this.state;
    const start = (pageNumber - 1) * pageSize;
    const queryParams = {
      key: 'b2a2d1c0283d9f8e3c2e16f78fd2507a',
      catalog_id: '242',
      pn: start,
      rn: pageSize,
    };

    const url = `${API_ADDRESS}?key=${queryParams.key}&catalog_id=${queryParams.catalog_id}&pn=${queryParams.pn}&rn=${queryParams.rn}`;
    const request = {method: 'GET'};

    await this.fetchRequest(url, request).then((res) => {
      const {result, error_code, reason} = res;
      if (result === null && error_code && reason) {
        this.setState({
          pageNumber: pageNumber,
          dataList: [],
          totalCount: 0,
          totalPages: 0,
          loading: false,
          refreshing: false,
          finished: true,
        });

        console.log(reason);
        return;
      }

      const {data, totalNum} = result;
      const newDataList = pageNumber > 1 ? dataList.concat(data) : data;
      const tempValue =
        totalNum % pageSize === 0
          ? totalNum / pageSize
          : totalNum / pageSize + 1;

      const totalPages = Math.floor(tempValue);

      this.setState({
        pageNumber: pageNumber,
        dataList: newDataList,
        totalCount: totalNum,
        totalPages: totalPages,
        loading: false,
        refreshing: false,
        finished: totalPages <= pageNumber,
      });
    });
  };

  itemRender = ({item}) => {
    const {title, catalog, sub2, reading, img, bytime} = item;
    return (
      <View style={[styles.itemWrap]}>
        <View style={[styles.itemImageWrap]}>
          <Image
            source={{uri: img}}
            resizeMode="contain"
            style={[styles.itemImage]}
          />
        </View>
        <View style={[styles.itemPropsWrap]}>
          <Text style={[styles.itemPropText]}>书名：{title}</Text>
          <Text style={[styles.itemPropText]} numberOfLines={1}>
            分类：{catalog}
          </Text>
          <Text style={[styles.itemPropText]}>阅读人数：{reading}</Text>
          <Text style={[styles.itemPropText]}>发布时间：{bytime}</Text>
          <Text style={[styles.itemPropText]} numberOfLines={4}>
            简介：{sub2}
          </Text>
        </View>
      </View>
    );
  };

  getItemLayout = (item, index) => {
    const offset = ITEM_HEIGHT * index + ITEM_SPEARATOR_HEIGHT * index;
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

  handleFlatListRefresh = async () => {
    this.setState({refreshing: true});
    const {pageSize} = this.state;
    await this.getPageDataList(1, pageSize);
  };

  handleLoadNextPageDataList = () => {
    const {pageNumber, pageSize, totalPages} = this.state;
    const nextPage = pageNumber + 1;
    if (nextPage <= totalPages) {
      this.getPageDataList(nextPage, pageSize);
    }
  };

  renderItemSeparatorComponent = () => {
    return <View style={styles.separatorWrap} />;
  };

  renderListEmptyComponent = () => {
    return (
      <View style={styles.listStatusWrap}>
        <Image source={IMG_CAT} style={[styles.listStatusImage]} />
        <Text style={[styles.listStatusText]}>矮油，什么都没有耶</Text>
      </View>
    );
  };

  renderListFooterComponent = () => {
    const {loading, finished} = this.state;
    if (finished === true) {
      return (
        <View style={[styles.loadMoreWrap]}>
          <Text style={[styles.loadMoreText]}>没有了</Text>
        </View>
      );
    }

    if (loading === true) {
      return (
        <View style={[styles.loadMoreWrap]}>
          <Text style={[styles.loadMoreText]}>加载中...</Text>
        </View>
      );
    }

    return <View style={styles.separatorWrap} />;
  };

  renderListHeaderComponent = () => {
    return <View style={styles.separatorWrap} />;
  };

  render() {
    const {
      pageNumber,
      dataList,
      totalCount,
      totalPages,
      loading,
      refreshing,
      finished,
    } = this.state;

    if (
      pageNumber === 1 &&
      (!dataList || dataList.length === 0) &&
      totalCount === 0 &&
      totalPages === 0 &&
      loading === false &&
      finished === true
    ) {
      return this.renderListEmptyComponent();
    }

    if (
      pageNumber === 1 &&
      (!dataList || dataList.length === 0) &&
      totalCount === null &&
      totalPages === null &&
      loading === true &&
      finished === false
    ) {
      return (
        <View style={styles.scrollPagingListWrap}>
          <View style={[styles.listStatusWrap]}>
            <Image source={IMG_PANDA} style={[styles.listStatusImage]} />
            <Text style={[styles.listStatusText, {color: '#1890ff'}]}>
              正在努力加载哟
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.scrollPagingListWrap}>
        <FlatList
          data={dataList}
          extraData={this.state}
          renderItem={this.itemRender}
          getItemLayout={this.getItemLayout} // 用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度
          keyExtractor={this.keyExtractor} // 此函数用于为给定的 item 生成一个不重复的 key
          refreshing={refreshing}
          onRefresh={this.handleFlatListRefresh}
          onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发 onEndReached 回调
          onEndReached={this.handleLoadNextPageDataList} // 当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用
          ItemSeparatorComponent={this.renderItemSeparatorComponent} // 行与行之间的分隔线组件
          // ListEmptyComponent={this.renderListEmptyComponent} // 列表为空时显示
          ListFooterComponent={this.renderListFooterComponent} // 尾部组件
          ListHeaderComponent={this.renderListHeaderComponent} // 头部组件
          // progressViewOffset={0} // 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollPagingListWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStatusWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStatusImage: {
    width: 72 / zoomWidth,
    height: 68 / zoomHeight,
  },
  listStatusText: {
    marginTop: 10 / zoomHeight,
    color: '#999999',
    fontSize: 14,
    letterSpacing: 1 / zoomWidth,
  },
  separatorWrap: {
    height: ITEM_SPEARATOR_HEIGHT,
    backgroundColor: '#f3f3f3',
  },
  loadMoreWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40 / zoomHeight,
    backgroundColor: '#f3f3f3',
  },
  loadMoreText: {
    color: '#666666',
    fontSize: 14,
  },
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ITEM_HEIGHT * 0.05,
    maxHeight: ITEM_HEIGHT,
  },
  itemImageWrap: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEM_HEIGHT * 0.9,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  itemImage: {
    width: '94%',
    height: '100%',
  },
  itemPropsWrap: {
    flex: 3,
    marginTop: 2 / zoomHeight,
    paddingLeft: 12 / zoomWidth,
  },
  itemPropText: {
    fontSize: 16,
    marginBottom: 10 / zoomHeight,
  },
});
