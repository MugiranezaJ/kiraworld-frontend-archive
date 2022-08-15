import './App.css';
import AppRoutes from './routes';
import { createTheme } from '@mui/material/styles'

// import logo from './logo.svg';
// import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import { ThemeProvider, createMuiTheme } from '@mui/material'


// import '@fontsource/roboto';
// import './App.css'; 
// import { HashLink as Link } from 'react-router-hash-link';


function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
            
        <AppRoutes/>
      </div>
    </ThemeProvider>
  );
}



export default App;
