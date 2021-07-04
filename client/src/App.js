import React, { useState , useEffect , createContext , useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Profile from './components/profile';
import Homepost from './components/home';
import { BrowserRouter , Route, Switch, useHistory } from 'react-router-dom';
import Createpost from './components/createpost';
import LoginSignUp from './components/Signinup';
import { reducer , initialState} from './reducers/userReducer';
import { ToastProvider} from 'react-toast-notifications';
import UserProfile from './components/UserProfile';
export const UserContext = createContext();


const Routing = ({setisSignin}) => {
    const history = useHistory();
        const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
      fetch('http://localhost:5000/protected', {
        method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            dispatch({ type: 'USER', payload: data.userdata });
            setisSignin(true);
          } else history.push('/');
        });
    }, []);
  return (
    <Switch>
      <Route
        path='/'
        exact
        render={() => (
          <LoginSignUp toggleSign={(value) => setisSignin(value)} />
        )}
      />
      <Route path='/home' exact component={Homepost} />
      <Route path='/profile' exact component={Profile} />
      <Route path='/profile/:userId' exact component={UserProfile} />
      <Route path='/createpost' exact component={Createpost} />
    </Switch>
  );
}

const  App = () => {
  const [state , dispatch] = useReducer(reducer, initialState)
  const [ isSignin , setisSignin] = useState(false);
  return (
    <div className='body'>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <ToastProvider>
            {isSignin ? <Navbar setisSignin={setisSignin} /> : null}
            <Routing setisSignin={setisSignin} />
          </ToastProvider>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
