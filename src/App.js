import './App.css';
import AppRoutes from './routes';

// import logo from './logo.svg';
import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ThemeProvider, createMuiTheme } from '@mui/material'
import { createTheme } from '@mui/material/styles'

// import '@fontsource/roboto';
// import './App.css'; 
import { HashLink as Link } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme();

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        
            <div className={classes.navigation}>
              <div className={classes.siteName} >KiraWorld</div>
              <div className={classes.buttonContainer}>
                <Router>
                  {/* <Link to="/#home" className={classes.linkText}><Button className={classes.navButton}>Home</Button></Link>
                  <Link to="/#about" className={classes.linkText}><Button className={classes.navButton}>About</Button></Link> */}
                  <Link to="/#dashboard" className={classes.linkText}><Button className={classes.navButton}>Dashboard</Button></Link>
                  <Link to="/#send_money" className={classes.linkText}><Button className={classes.navButton}>Send Money</Button></Link>
                  <Link to="/login" className={classes.linkText}><Button className={classes.navButton}>Login</Button></Link>
                </Router>
              </div>
            </div>
        <AppRoutes/>
      </div>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  navigation:{
    background: '#071e26',
    position:'fixed',
    width:'100%', 
    padding:'10px 20px', 
    paddingTop:'20px', 
    color:'#fff', 
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
    boxSizing:'border-box',
    zIndex:'100',
    '@media(max-width:900px)':{
      display:'none'
    },
    '@media(max-width: 720px)':{
      width:'95%'
    }
  },
  siteName:{
    display:'flex',
    width:'100px', 
    fontSize:'24px', 
    fontWeight:'bold',
  },
  buttonContainer:{
    color:'#fff', 
    display:'flex',
    '@media(max-width: 720px)':{
      display:'none'
    }
  },
  navButton:{
    margin:'0 120px 0 12px',
    color:'#fff',
    fontWeight:'bold',
    fontSize:'24px' 
    // fontWeight:'bold',
  },
  name:{
    fontWeight:'bold',
    fontSize:'36px',
    // '@media(max-width: 720px)':{
    //   fontSize:'25px';
    //   fontWeight:'bold'
    // };
    // '@media(max-width: 500px)':{
    //   fontSize:'20px';
    //   fontWeight:'bold'
    // }
  },
  appBar:{
    display:'none',
    position:'sticky',
    backgroundColor:'#071e26',
    '@media(max-width:900px)' : {
      display:'block'
    }
  },
    linkText:{
      textDecoration:'none'
    }
}))

export default App;
