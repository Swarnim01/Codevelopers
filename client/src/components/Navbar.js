import React,{useContext , useState} from 'react';
import '../css/Navbar.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar , Toolbar , IconButton , Typography , InputBase , Badge , MenuItem , Menu , List , ListItemText , ListItem , ListItemAvatar , Avatar , Divider} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';
import toast from 'react-hot-toast';
import swarnim from '../image/swarnim.jpeg';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: '4rem',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#414141',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor:'pointer',
    zIndex:'5'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    height:'10rem'
  },
  inline: {
    display: 'inline',
  },
  searchresult:{
    position:'absolute',
    zIndex:'10',
  }
}));

export default function PrimarySearchAppBar({setisSignin}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [ searchusers ,setsearchusers] = useState(null);
  const [ searchterm , setsearchterm] = useState('')

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = (e) =>{
    e.preventDefault();
    fetch('/logout', {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setisSignin(false);
        history.push('/');
        toast.success('Successfully logged Out')
        dispatch({ type: 'CLEAR'});
      });
  }

    const clearInput = () => {
      setsearchusers(null);
      setsearchterm('');
      console.log('close')
    };

  const fetchuser = (e) => {
    let query = e.target.value;
    setsearchterm(query);
    fetch('/search-user', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if(query === '')
        setsearchusers(null);
        else if(result.length === 0)
        setsearchusers([]);
        else
        setsearchusers(result);

      });
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/profile' style={{ cursor: 'pointer', textDecoration: 'none' }}>
        <MenuItem onClick={handleMenuClose}> Profile</MenuItem>
      </Link>

      <Link
        to='/createpost'
        style={{ cursor: 'pointer', textDecoration: 'none' }}
      >
        {' '}
        <MenuItem onClick={handleMenuClose}>Create Post </MenuItem>
      </Link>

      <MenuItem onClick={handleMenuClose}>
        <span style={{ cursor: 'pointer' }} onClick={(e) => handleLogout(e)}>
          Logout
        </span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar>
        <Toolbar style={{ backgroundColor: '#101010' }}>
          <Typography className={classes.title} variant='h6' noWrap>
            <Link
              to='/home'
              style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              Codevelopers
            </Link>
          </Typography>
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                {searchusers ? (
                  <CloseIcon
                    id='clearBtn'
                    onClick={clearInput}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <SearchIcon />
                )}
              </div>
              <InputBase
                placeholder='Search…'
                value={searchterm}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => fetchuser(e)}
              />
            </div>
            <div
              className={classes.searchresult}
              style={{
                overflow: 'hidden',
                overflowY: 'auto',
                minWidth: '20rem',
                marginTop: '0.2rem',
              }}
            >
              {searchusers ? (
                searchusers.length === 0 ? (
                  <p style = {{ background:'white', color:'black'}}>Oops ! No user found</p>
                ) : (
                  <List className={classes.list}>
                    {searchusers.map((item) => {
                      return (
                        <div>
                          <ListItem alignItems='flex-start'>
                            <ListItemAvatar>
                              <Avatar alt={item.username} src={swarnim} />
                            </ListItemAvatar>
                            <Link
                              style={{ textDecoration: 'none', color: 'black' }}
                              to={
                                item._id !== state._id
                                  ? `/profile/${item._id}`
                                  : '/profile'
                              }
                            >
                              <Typography color='textPrimary'>
                                {item.username}
                              </Typography>
                            </Link>
                          </ListItem>
                          <Divider variant='inset' component='li' />
                        </div>
                      );
                    })}
                  </List>
                )
              ) : null}
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
