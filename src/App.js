

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import MainPage from './Screen/MainPage';

import reducer from './redux/reducer';

function App() {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <MainPage/>
    </Provider>
  );
}

export default App;
