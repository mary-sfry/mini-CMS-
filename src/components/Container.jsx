import React, {useEffect, useState} from 'react';
import { Grid } from '@mui/material';
import {Box, Button, Typography} from '@mui/material';
import { ImSun } from "react-icons/im";
import { FaMoon } from "react-icons/fa";
import Path from './Path';
import AddPath from './AddPath';

const Container = ({colorMode, setColorMode}) => {
  const [colorModeIcon, setColorModeIcon] = useState(<ImSun size='20px' />);
  const [addPath, setAddPath] = useState(false);
  const [log, setLog] = useState([]);
  const [inputs,setInputs] = React.useState({});
  const [editable,setEditable] = React.useState(false);

  const colorModeHandler = ()=> {
    colorMode === 'light' ? setColorModeIcon(<ImSun size='20px' />) : setColorModeIcon(<FaMoon size='20px' />);
    colorMode === 'light' ? setColorMode('dark') : setColorMode('light');
  }

  useEffect(()=>{
    fetch("http://localhost:3030/socials")
    .then(response => response.json())
    .then(data => setLog(data))
  },[])

  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item xs={8} 
          sx={{bgcolor: theme => theme.palette.mode == 'light'? 'grey.50': 'grey.800',
               borderRadius:0.5 , py:1, px:2, boxShadow: 1, transform: 'translateY(50%)'
              }}
        >
          <Box
            sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='body1'
              sx={{color: 'grey.500'}}>
              مسیرهای ارتباطی
            </Typography>
            <Button variant="text" onClick={colorModeHandler} 
              sx={{color: theme => theme.palette.mode == 'light'? 'grey.800': 'grey.50'}}>
                {colorModeIcon}
            </Button>
          </Box>
          <Box>
            <Button variant="text"
              color='warning'
              sx={{mb: 1}}
              onClick={()=>setAddPath(true)}
            >
              + افزودن مسیر ارتباطی
            </Button>
          </Box>
          {addPath && <AddPath setAddPath={setAddPath} log={log} setLog={setLog} inputs={inputs} setInputs={setInputs} editable={editable} />}
          {
            log.map(path => <Path key={path.id} path={path} log={log} setLog={setLog} setAddPath={setAddPath} setInputs={setInputs} setEditable={setEditable} />)
          }
          
        </Grid>
      </Grid>
    </>
  )
}

export default Container