import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import swarnim  from '../image/swarnim.jpeg';
import '../css/profile.css';
import { baseURL, UserContext } from '../App';
const Profile = () =>{
  const { state , dispatch} = useContext(UserContext);
  const [myprofile, setmyprofile] = useState(null);
  const [myposts, setmyposts] = useState(null);
  useEffect(()=>{
    fetch(`${baseURL}/myprofile`, {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setmyprofile(data.user);
        setmyposts(data.post)
      });
  },[])

    return (
      <>
        {myprofile && myposts ? (
          <div
            style={{
              margin: '0px auto',
              maxWidth: '970px',
              marginTop: '5rem',
              padding: '0 0.5rem',
            }}
          >
            <div
              className='row'
              style={{ borderBottom: '1px solid grey', paddingBottom: '3rem' }}
            >
              <div className='col-md-3'>
                <img
                  src={swarnim}
                  alt='profile'
                  style={{
                    height: '160px',
                    width: '160px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <span
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '5rem',
                  }}
                >
                  <FontAwesomeIcon icon={faUserEdit} />
                </span>
              </div>
              <div
                className='col-md-9'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h3>{state ? state.username : null}</h3>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <h6 style={{ paddingRight: '4rem' }}>
                    <b>{myposts.length}</b> posts
                  </h6>
                  <h6 style={{ paddingRight: '4rem' }}>
                    <b>{myprofile.followers.length}</b> followers
                  </h6>
                  <h6 style={{ paddingRight: '4rem' }}>
                    <b>{myprofile.following.length}</b> following
                  </h6>
                </div>
                <div>
                  <h6>
                    <b>{myprofile.username}</b>
                  </h6>
                  <h6>IIIT Gwalior</h6>
                </div>
              </div>
            </div>
            <div className='posts'>
              {myposts.map((item) => {
                return <img className='post' src={item.imageuri} alt='post' />;
              })}
            </div>
          </div>
        ) : (
          <h2
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent:'center'
            }}
          >
            Loading...
          </h2>
        )}
      </>
    );
}

export default Profile;