import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './Theme/index';
import 'leaflet/dist/leaflet.css'
import './App.css'

import CurrentFlow from './Pages/CurrentFlow';
import FutureFlow from './Pages/FutureFlow';
import LoginButton from './Components/Login/LoginButton';
import ModeFilter from './Components/General/ModeFilter';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <LoginButton />
        <ModeFilter />
        <Switch>
          <Route path="/future" component={FutureFlow} />
          <Route path="/" component={CurrentFlow} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
