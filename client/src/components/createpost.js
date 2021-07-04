import React,{useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {storage} from '../firebase';
import firebase from '../firebase';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth:'600px',
    margin:'2rem auto',
  },
});

const Createpost = () => {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [image , setimage] = useState(null);
  const [caption,setcaption] = useState('');
  const [imageuri,setimageuri] = useState('');
  const [showimage , setshowimage] = useState(undefined);
  let history = useHistory();
  useEffect(()=>{
    if(imageuri)
    {fetch('/createpost', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caption,
        imageuri,
      }),
    })
      .then((response) => response.json())
      .then(({ error }) => {
        if (error) addToast(error, { appearance: 'error' });
        else{ addToast('Posted Successfully', { appearance: 'success' });
        history.push('/home')}
      });
  }
  },[imageuri])
  const handleimageuri = (e) =>{
    if(e.target.files[0])
    setimage(e.target.files[0])
    setshowimage(URL.createObjectURL(e.target.files[0]));
    console.log('image :' ,e.target.files[0]);
    
  }

  const handleUpload = () => {

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
            default:
              console.log('error');
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((downloadURL) => {
            console.log('download:',downloadURL);
            setimageuri(downloadURL);
            console.log(imageuri , caption);
          })
          }
          );
        }
  return (
    <Card className={classes.root}>
      <CardContent>
        <input
          type='text'
          placeholder='Caption....'
          style={{
            marginBottom: '1rem',
            width: '100%',
            background: 'none',
            outline: 'none',
            border: 'none',
            lineHeight: '1',
            fontWeight: '6000',
            fontSize: '1.0rem',
            color: '#333',
            padding: '0.4rem 0.4rem',
            borderBottom: '1px solid gray',
          }}
          onChange={(e)=>{setcaption(e.target.value)}}
        />
        <img src={showimage} alt='preview' height='200rem ' width='300rem' />
        <div>
          <input type='file' onChange={(e)=> {handleimageuri(e)} }/>
        </div>
      </CardContent>
      <CardActions style={{ display:'flex',justifyContent:'center'}}>
        <Button size='small' onClick={() =>{handleUpload()}}>Post</Button>
      </CardActions>
    </Card>
  );
}
const createpost = () => {
  return (
    <ToastProvider autoDismiss='true' autoDismissTimeout={3000}>
      <Createpost />
    </ToastProvider>
  );
};
export default createpost;