import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserTable from './components/UserTable';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserTable />
      </div>
    </Provider>
  );
};


export default App;
