import {StyleSheet} from 'react-native';

const FallbackStyles: any = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    paddingBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    backgroundColor: '#007ACC',
    borderRadius: 50,
    padding: 16,
    width: 'fit-content',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardImage: {
    width: '300px',
    height: '300px',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  imageContainer: {
    backgroundColor: 'blue',
  },
});

export default FallbackStyles;
