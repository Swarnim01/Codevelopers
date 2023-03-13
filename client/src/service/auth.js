import firebase from '../firebase';
import 'firebase/auth';
const SocialAuth = async (provider) => {
    try {
    const result = await firebase
      .auth()
      .signInWithPopup(provider);
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    return result;
  } catch (error) {
    var errorMessage = error.message;
    return errorMessage;
  }
}

export default SocialAuth;