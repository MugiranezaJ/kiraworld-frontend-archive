import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'


export const CustomAppBar = () => {
    const token = localStorage.getItem('mechat_access_token');
    const classes = useStyles();
    return (
        <div className={classes.navigation}>
              <div className={classes.siteName} >KiraWorld</div>
              <div className={classes.buttonContainer}>
                  {/* <Link to="/#home" className={classes.linkText}><Button className={classes.navButton}>Home</Button></Link>
                  <Link to="/#about" className={classes.linkText}><Button className={classes.navButton}>About</Button></Link> */}
                  {token ? <Link to="/#dashboard" className={classes.linkText}><Button className={classes.navButton}>Dashboard</Button></Link> : ''}
                  <Link to="/send_money" className={classes.linkText}><Button className={classes.navButton}>Send Money</Button></Link>
                  <Link to="/login" className={classes.linkText}><Button className={classes.navButton}>Login</Button></Link>
              </div>
            </div>
    )
}

const useStyles = makeStyles((theme) => ({
    navigation:{
      background: '#071e26',
      position:'fixed',
      width:'100%', 
      padding:'10px 100px', 
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
      margin:'0 12px 0 12px',
      color:'#fff',
      fontWeight:'bold',
    },
    name:{
      fontWeight:'bold',
      fontSize:'36px',
      '@media(max-width: 720px)':{
        fontSize:'25px',
        fontWeight:'bold'
      },
      '@media(max-width: 500px)':{
        fontSize:'20px',
        fontWeight:'bold'
      }
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