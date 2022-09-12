import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Fallback.styles';

export type Props = {
  error: Error,
  resetError: Function
}

const FallbackComponent: React.FC<Props> = ({ error, resetError }) => {
  // const imagePath = Image.resolveAssetSource(image).uri;
  return (
    <View style={styles.content}>
      {/* <View style={styles.imageContainer}>
          <img src={require('./src/assets/empty-emoji.png')} width={200} height={200} />
          <Image style={styles.cardImage} source={images.failureEmojiImage} />
        </View> */}
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>{'There\'s an error'}</Text>
      <Text style={styles.error}>{error.toString()}</Text>
      <TouchableOpacity style={styles.button} onPress={() => resetError()}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FallbackComponent;
