// import MainPage from './Screen/MainPage'
// import MyMapComponent from './components/MyMapComponent'
import InputLocation from './components/InputLocation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducer';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  justify-content: center;
  z-index:-1;
`;

function App() {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <InputLocation/>
      <Container>
        {/* <MyMapComponent/> */}
      </Container>
    </Provider>
  );
}

export default App;
