import React from 'react';
import styled from 'styled-components';
// import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../style/global';
import Desk from './Desk/Desk';

const App:React.FC = () => {
  return (
    // <ThemeProvider theme={globalStyle}>
      <StyledApp className="App">
        <GlobalStyles />
        <Desk />
      </StyledApp>
    // </ThemeProvider>
  
  );
}

export default App;

const StyledApp = styled.div(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

