import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import swarnim from '../image/swarnim.jpeg';
import '../css/profile.css';
import { UserContext } from '../App';
const UserProfile = () => {
  const [userprofile, setuserprofile] = useState(null);
  const [userpost, setuserpost] = useState(null);
  const { state , dispatch } = useContext(UserContext)
  console.log('userprofile:' , userprofile);
  console.log('userpost',userpost);
  const {userId} = useParams();
  useEffect(() => {
    fetch(`/profile/${userId}`, {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('detail of fetched userId',data);
        setuserprofile(data.user);
        setuserpost(data.post);
      });
  }, []);

  const FollowUser = (followId) =>{
          fetch('/follow', {
          method: 'put',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            followId
           }),
          })
          .then((response) => response.json())
          .then((data) => {
            setuserprofile(data.result2)
          });
}
  const UnFollowUser = (followId) =>{
          fetch('/unfollow', {
          method: 'put',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            followId
           }),
          })
          .then((response) => response.json())
          .then((data) => {
            setuserprofile(data.result2)
          });
}
  return (
    <>
      {userprofile && userpost ? (
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
            </div>
            <div
              className='col-md-9'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <h3 style={{ marginRight: '1.5rem' }}>
                  {userprofile.username}
                </h3>

                {userprofile.followers.includes(state._id) ? (
                  <button
                    style={{
                      width: '7rem',
                      height: '2rem',
                      border: 'none',
                      color: 'white',
                      background: '#019be6',
                    }}
                    onClick={() => UnFollowUser(userprofile._id)}
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    style={{
                      width: '7rem',
                      height: '2rem',
                      border: 'none',
                      color: 'white',
                      background: '#019be6',
                    }}
                    onClick={() => FollowUser(userprofile._id)}
                  >
                    Follow
                  </button>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <h6 style={{ paddingRight: '4rem' }}>
                  <b>{userpost.length}</b> posts
                </h6>
                <h6 style={{ paddingRight: '4rem' }}>
                  <b>{userprofile.followers.length}</b> followers
                </h6>
                <h6 style={{ paddingRight: '4rem' }}>
                  <b>{userprofile.following.length}</b> following
                </h6>
              </div>
              <div>
                <h6>
                  <b>{userprofile.username}</b>
                </h6>
                <h6>IIIT Gwalior</h6>
              </div>
            </div>
          </div>
          <div className='posts'>
            {userpost.map((item) => {
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
            alignContent: 'center',
          }}
        >
          Loading...
        </h2>
      )}
    </>
  );
};

export default UserProfile;
