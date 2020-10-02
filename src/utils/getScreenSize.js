/* eslint-disable radix */
/**
 * 获取设备尺寸和缩放比例
 */
import {Dimensions, StatusBar, Platform} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const width = Dimensions.get('window').width;
export const height =
  Platform.OS === 'ios' ? windowHeight : windowHeight - StatusBar.currentHeight;

export const zoomWidth = 375 / parseInt(width);
export const zoomHeight = 667 / parseInt(height);
