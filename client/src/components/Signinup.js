import React,{useState , useContext} from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import online_friends from '../image/online_friends.svg';
import mobile_user from '../image/mobile_user.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter,faFacebook,faGoogle,faGithub} from '@fortawesome/free-brands-svg-icons';
import { faUser,faLock,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import {FacebookProvider , GoogleProvider , GithubProvider, TwitterProvider} from '../service/authmethod';
import SocialAuth from '../service/auth'
import '../css/Signinup.css';
import {UserContext} from '../App';

const Signinup = ({props}) =>{
    const {state , dispatch} = useContext(UserContext);
    let history = useHistory();
    const[isOpen,setIsOpen] = useState(false);
    const [username , setusername] = useState('');
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');

    const OnClick = () =>{
        setIsOpen(!isOpen)
    }

    const OnSubmitSignup = (event) => {
        event.preventDefault();
      fetch('/signup', {
        method: 'post',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then(({error , message}) => {
          if(error)
          toast.error(error);
          else if(message)
          toast.success(message);
        })
    };
        const OnSubmitSignin = (event) => {
          event.preventDefault();
          fetch('/signin', {
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.error) toast.error(data.error);
              else
              { props.toggleSign(true); 
                history.push('/home');
                toast.success('Successfully Signed In');
                dispatch({type:'USER',payload:data.savedperson})
              }
            });
        };

        const Validation = (e) =>{
          if(e ==='Username')
          {
            if(!(/^[a-z\d]{5,12}$/i.test(username)))
             {toast.error('Username must be 5 to 12 character long');
            }

          }
          else if(e === 'Email')
          {
            if(!(/^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(email)))
            toast.error('Invalid Email');
          }
          else if(e === 'Password')
          if(!(/^[#\w@_-]{8,20}$/.test(password)))
          toast.error('Password should be 8 to 20 characters long with @ # - _ special characters');

        }
        const AuthHandler = async (provider) =>{
          const res = await SocialAuth(provider);
          console.log(res);
        }
    return (
      <div className={classNames('signinup', { 'sign-up-mode': isOpen })}>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form className='sign-in-form'>
              <h2 className='title'>Welcome Back</h2>
              <h4 style={{ marginBottom: '1.5rem', color: '#444' }}>
                Login to your account
              </h4>
              <div className='input-field'>
                <span className='userlabel'>
                  {' '}
                  <FontAwesomeIcon icon={faUser} />{' '}
                </span>
                <input
                  type='text'
                  placeholder='Email'
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    lineHeight: '1',
                    fontWeight: '6000',
                    fontSize: '1.0rem',
                    color: '#333',
                  }}
                  onChange={(e) => setemail(e.target.value)}
                  onBlur={(e) => Validation(e.target.placeholder)}
                />
              </div>
              <div className='input-field'>
                <span className='userlabel'>
                  {' '}
                  <FontAwesomeIcon icon={faLock} />{' '}
                </span>
                <input
                  type='password'
                  placeholder='Password'
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    lineHeight: '1',
                    fontWeight: '6000',
                    fontSize: '1.0rem',
                    color: '#333',
                  }}
                  onChange={(e) => setpassword(e.target.value)}
                  onBlur={(e) => Validation(e.target.placeholder)}
                />
              </div>
              <input
                type='submit'
                value='Login'
                className='btn solid'
                onClick={(event) => OnSubmitSignin(event)}
              />
              <p className='social-text' style={{ marginTop: '0.3rem' }}>
                Or Sign in with social platforms
              </p>
              <div className='social-media'>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faGoogle}
                    onClick={() => AuthHandler(GoogleProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    onClick={() => AuthHandler(TwitterProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    onClick={() => AuthHandler(FacebookProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    onClick={() => AuthHandler(GithubProvider)}
                  />
                </p>
              </div>
            </form>

            <form className='sign-up-form'>
              <h2 style={{ marginBottom: '1.5rem' }} className='title'>
                Create an account
              </h2>
              <div className='input-field'>
                <span className='userlabel'>
                  {' '}
                  <FontAwesomeIcon icon={faUser} />{' '}
                </span>
                <input
                  type='text'
                  placeholder='Username'
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    lineHeight: '1',
                    fontWeight: '6000',
                    fontSize: '1.0rem',
                    color: '#333',
                  }}
                  onChange={(e) => setusername(e.target.value)}
                  onBlur={(e) => Validation(e.target.placeholder)}
                />
              </div>
              <div className='input-field'>
                <span className='userlabel'>
                  {' '}
                  <FontAwesomeIcon icon={faEnvelope} />{' '}
                </span>
                <input
                  type='text'
                  placeholder='Email'
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    lineHeight: '1',
                    fontWeight: '6000',
                    fontSize: '1.0rem',
                    color: '#333',
                  }}
                  onChange={(e) => setemail(e.target.value)}
                  onBlur={(e) => Validation(e.target.placeholder)}
                />
              </div>
              <div className='input-field'>
                <span className='userlabel'>
                  {' '}
                  <FontAwesomeIcon icon={faLock} />{' '}
                </span>
                <input
                  type='password'
                  placeholder='Password'
                  style={{
                    background: 'none',
                    outline: 'none',
                    border: 'none',
                    lineHeight: '1',
                    fontWeight: '6000',
                    fontSize: '1.0rem',
                    color: '#333',
                  }}
                  onChange={(e) => setpassword(e.target.value)}
                  onBlur={(e) => Validation(e.target.placeholder)}
                />
              </div>
              <input
                type='submit'
                value='Sign up'
                className='btn solid'
                onClick={(event) => OnSubmitSignup(event)}
              />
              <p className='social-text' style={{ marginTop: '0.3rem' }}>
                Or Sign Up with social platforms
              </p>
              <div className='social-media'>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faGoogle}
                    onClick={() => AuthHandler(GoogleProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faTwitter}
                    onClick={() => AuthHandler(TwitterProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    onClick={() => AuthHandler(FacebookProvider)}
                  />
                </p>
                <p className='social-icon' style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    onClick={() => AuthHandler(GithubProvider)}
                  />
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='panels-container'>
          <div className='panel left-panel'>
            <div className='content'>
              <h2>Looking for fellow Coders and Developers</h2>
              <p>
                We give you access to million of people to connect with you.Be a
                part of our commnity and enjoy.
              </p>
              <button
                className='btn transparent'
                id='sign-up-btn'
                style={{ marginTop: '0.2rem' }}
                onClick={OnClick}
              >
                Sign Up
              </button>
            </div>
            <img src={online_friends} className='image' alt='' />
          </div>
          <div className='panel right-panel'>
            <div className='content'>
              <h2>Looking for fellow Coders and Developers</h2>
              <p>
                We give you access to million of people to connect with you.Be a
                part of our commnity and enjoy.
              </p>
              <button
                className='btn transparent'
                id='sign-in-btn'
                style={{ marginTop: '0.2rem' }}
                onClick={OnClick}
              >
                Sign In
              </button>
            </div>
            <img src={mobile_user} className='image' alt='' />
          </div>
        </div>
      </div>
    );
    
}

const LoginSignUp = (props) =>{
    return(
        <Signinup props ={props} />)
}
export default LoginSignUp;