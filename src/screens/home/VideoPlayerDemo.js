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
// import PropTypes from 'prop-types';
import Video from 'react-native-video';
import {zoomWidth, zoomHeight, width} from '../../utils/getScreenSize';

export default class VideoPlayerDemo extends PureComponent {
  // static propTypes = {
  //   prop: PropTypes
  // }

  static options() {
    return {
      topBar: {
        title: {
          text: 'Video Player Demo',
        },
      },
      bottomTabs: {visible: false},
    };
  }

  constructor(props) {
    super(props);

    // this.state = {

    // };
  }

  // componentDidMount() {

  // }

  // 当视频开始加载时调用的回调函数，在安卓模拟器下回调了两次。
  onVideoLoadStart = (data) => {
    // const {src} = data;
    // const {isNetwork, requestHeaders, type, uri} = src;
    console.log('onLoadStart: ' + JSON.stringify(data));
  };

  // 加载媒体并准备播放时调用的回调函数，回调一次。
  onVideoLoad = (data) => {
    // const {duration, naturalSize} = data;
    // const {width, height, orientation} = naturalSize;
    console.log('onLoad: ' + JSON.stringify(data));
  };

  // 当第一个视频帧准备好显示时调用的回调函数，回调一次，没有回调参数。
  onReadyForDisplay = () => {
    console.log('onReadyForDisplay');
  };

  onVideoBuffer = (data) => {
    console.log('onBuffer: ' + JSON.stringify(data));
  };

  // 每隔 progressUpdateInterval 秒回调一次该函数。
  onVideoProgress = (data) => {
    // const {
    //   currentTime, // 当前位置（以秒为单位）
    //   playableDuration, // 已缓存并可以播放的时长（以秒为单位）
    //   seekableDuration, // 可搜索（加载指定位置）的时长，通常为视频的总时长
    // } = data;
    console.log('onProgress: ' + JSON.stringify(data));
  };

  // 搜索完成时调用的回调函数。
  onVideoSeek = (data) => {
    // const {currentTime, seekTime} = data;
    console.log('onSeek: ' + JSON.stringify(data));
  };

  // 播放器到达媒体结尾时调用的回调函数，没有回调参数。
  onVideoEnd = () => {
    console.log('onEnd');
  };

  // 当音频输出从耳机等外部源切换回内部扬声器时，将调用此方法。
  // 最好在发生这种情况时暂停媒体播放，以免扬声器开始发出声音。
  // 没有回调参数
  onAudioBecomingNoisy = () => {
    console.log('onAudioBecomingNoisy');
  };

  // 可用带宽更改时调用的回调函数。
  onBandwidthUpdate = (data) => {
    // const {bitrate} = data;
    console.log('onBandwidthUpdate: ' + JSON.stringify(data));
  };

  // 播放速率更改时暂停或开始/继续播放时调用的回调函数。
  onPlaybackRateChange = (data) => {
    // const {playbackRate} = data;
    console.log('onPlaybackRateChange: ' + JSON.stringify(data));
  };

  render() {
    // const posterUrl = '';
    const videoUrl =
      'https://course-video-source.oss-cn-shanghai.aliyuncs.com/OTHER/QYSZJJ01/001_kcjs.mp4';

    return (
      <View style={[styles.videoPlayerWrap]}>
        <Video
          style={styles.videoWrap}
          // poster={posterUrl}
          // posterResizeMode="cover"
          resizeMode="cover"
          progressUpdateInterval={1000} // onProgress 事件回调之间的延迟（以毫秒为单位），默认值为：250ms
          source={{uri: videoUrl}}
          controls={true} // 确定是否显示播放器控件
          paused={false} // 控制媒体是否暂停
          rate={1.0} // 媒体播放的速度
          muted={false} // 控制音频是否静音
          repeat={false} // 确定在结束时是否重复视频
          volume={1.0} // 音量
          stereoPan={0} // 调整左右音频通道的平衡，可接受 –1.0（左声道）到 1.0（右声道）之间的任何值
          allowsExternalPlayback={false} // 指示播放器是否允许切换到外部播放模式，例如 AirPlay 或 HDMI
          onLoad={this.onVideoLoad}
          onLoadStart={this.onVideoLoadStart}
          onReadyForDisplay={this.onReadyForDisplay}
          // onBuffer={this.onVideoBuffer}
          onProgress={this.onVideoProgress}
          onSeek={this.onVideoSeek}
          onEnd={this.onVideoEnd}
          onAudioBecomingNoisy={this.onAudioBecomingNoisy}
          onBandwidthUpdate={this.onBandwidthUpdate}
          onPlaybackRateChange={this.onPlaybackRateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoPlayerWrap: {
    flex: 1,
  },
  videoWrap: {
    width: width,
    height: width * 0.5625,
    backgroundColor: '#ff0000',
  },
});
