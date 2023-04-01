import React, { useState , useEffect , createContext , useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Profile from './components/profile';
import { BrowserRouter , Route, Switch, useHistory } from 'react-router-dom';
import Createpost from './components/createpost';
import LoginSignUp from './components/Signinup';
import Homepost from './components/home'
import Message from './components/message';
import { reducer , initialState} from './reducers/userReducer';
import UserProfile from './components/UserProfile';
import { Toaster } from 'react-hot-toast';
import socket from './www/socket';
export const UserContext = createContext();
export const baseURL = process.env.NODE_ENV === 'DEVELOPMENT' ? 'http://localhost:5000' : '/backend';
const Routing = ({setisSignin}) => {
    const history = useHistory();
        const { state, dispatch } = useContext(UserContext);
        useEffect(() => {
          fetch(`${baseURL}/protected`, {
        method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json())
        .then((data) => {
          if (data) {
            dispatch({ type: 'USER', payload: data.userdata });
            setisSignin(true);
            const sessionID = localStorage.getItem("sessionID");
            if(sessionID){
            socket.auth = { sessionID };
            socket.connect();
            }
            else{
            socket.auth = {username : data.userdata.username};
            console.log('triggered');
            socket.connect();}
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
      <Route path='/message' exact component={Message} />
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
            <Toaster
              position='top-center'
              reverseOrder={false}
              gutter={8}
              containerClassName=''
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                // Default options for specific types
                success: {
                  duration: 3000,
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
            {isSignin ? <Navbar setisSignin={setisSignin} /> : null}
            <Routing setisSignin={setisSignin} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
