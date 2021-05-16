// import MainPage from './Screen/MainPage'
// import MyMapComponent from './components/MyMapComponent'
import InputLocation from './components/InputLocation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';

function App() {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <InputLocation/>
    </Provider>
  );
}

export default App;
