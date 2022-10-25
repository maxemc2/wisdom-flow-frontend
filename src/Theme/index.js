import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './colors'
import Button from './components/Button';

export default extendTheme({
  styles,
  colors,
  fonts: {
    body: 'Open Sans, Roboto, PingFang HK',
  },
  components: {
    Button,
    Link: {
      baseStyle: {
        fontSize: '14px',
        fontWeight: 600,
      },
    },
  },
});
