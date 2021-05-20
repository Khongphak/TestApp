import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';

import MainPage from './Screen/MainPage';
import PaymentPage from './Screen/PaymentPage';



function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/payment" component={PaymentPage}/>
        </Switch>
      </Router>     
  );
}

export default App;
