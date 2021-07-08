import React,{useState,useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card , CardHeader , CardMedia , CardContent , CardActions , Avatar ,IconButton , Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    margin:'0px auto',
    marginTop:'5rem'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Homepost = () => {
  const classes = useStyles();
  const {state , dispatch } = useContext(UserContext);
  useEffect(()=>{
    fetch('/showpost', {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((data)=>{
      sethomepost(data);
      console.log('to fetch data on refresh : /showpost',data);
      console.log(data)
    })
  },[])
  
  const [homepost , sethomepost] = useState([]);
  console.log(homepost,'before fetching')
  const [ comment , setcomment] = useState('');
  const likepost = (id) =>{
      fetch('/like', {
        method: 'put',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId:id
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const newhomepost = homepost.map((item)=>{
              if(item._id === data._id ){
                return(data);
              }
              else
              return item;
          })
          sethomepost(newhomepost);
        });
  }

    const unlikepost = (id) => {
      fetch('/unlike', {
        method: 'put',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const newhomepost = homepost.map((item) => {
            if (item._id === data._id) {
              return data;
            } else return item;
          });
          sethomepost(newhomepost);
        });
    };

      const Comment = (id , comment) => {
        fetch('/comment', {
          method: 'put',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: id,
            comment,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const newhomepost  = homepost.map((item) => {
              if (item._id === data._id) {
                return data;
              } else return item;
            });
            setcomment('')
            sethomepost(newhomepost);
          });
      };

            const DeleteComment = (id, commentId) => {
              fetch(`/delete/${commentId}`, {
                method: 'delete',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  postId: id,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  const newhomepost = homepost.map((item) => {
                    if (item._id === data._id) {
                      return data;
                    } else return item;
                  });
                  sethomepost(newhomepost);
                });
            };
  return (
    <div className={classes.root}>
      {homepost.map(({ caption, imageuri, likes, comments, postedBy, _id }) => {
        return (
          <Card key={_id} style={{marginBottom:'1rem'}}>
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={classes.avatar}>
                  S
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Link
                  style={{ textDecoration: 'none' , color:'black' }}
                  to={
                    postedBy._id !== state._id
                      ? `/profile/${postedBy._id}`
                      : '/profile'
                  }
                >
                  {postedBy.username}
                </Link>
              }
              subheader='Indian Institute of Information Technology and Management,Gwalior'
            />
            <CardMedia
              className={classes.media}
              title='posts'
              image={imageuri}
            />
            <CardContent>
              <Typography variant='body2' component='p'>
                {caption}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                {likes.includes(state._id) ? (
                  <FavoriteIcon
                    style={{ color: red[500] }}
                    onClick={() => {
                      unlikepost(_id);
                    }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => {
                      likepost(_id);
                    }}
                  />
                )}
              </IconButton>
              <Typography variant='subtitle2' color='textSecondary'>
                {likes.length} likes
              </Typography>
            </CardActions>

            <CardContent>
              {comments.map((item) => {
                return (
                  <Typography paragraph key={item._id}>
                      {
                        <Link
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                          to={
                            item.postedBy._id !== state._id
                              ? `/profile/${item.postedBy._id}`
                              : '/profile'
                          }
                        >
                          {item.postedBy.username}
                        </Link>
                      }{' '}
                    {item.comment}
                    {item.postedBy._id === state._id ? (
                      <span style={{ float: 'right', cursor: 'pointer' }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => DeleteComment(_id, item._id)}
                        />
                      </span>
                    ) : null}
                  </Typography>
                );
              })}
            </CardContent>

            <div style={{ padding: '0.8rem 0' }}>
              <span style={{ padding: '0 0.6rem ' }}>
                <FontAwesomeIcon icon={faGrin} />
              </span>
              <input
                type='text'
                placeholder='Add a comment....'
                value={comment}
                style={{
                  background: 'none',
                  outline: 'none',
                  border: 'none',
                  lineHeight: '1',
                  fontWeight: '6000',
                  fontSize: '1.0rem',
                  color: '#333',
                  padding: '0 0.4rem',
                  width: '65%',
                }}
                onChange={(e) => setcomment(e.target.value)}
              />
              <button
                style={{
                  background: 'none',
                  outline: 'none',
                  border: 'none',
                  lineHeight: '2',
                  fontWeight: '6000',
                  fontSize: '1.0rem',
                  color: 'blue',
                  float: 'right',
                  margin: '0 1rem',
                }}
                onClick={() => Comment(_id, comment)}
              >
                Post
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
export default Homepost;