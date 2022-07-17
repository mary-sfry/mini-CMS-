import * as React from 'react';
import { Grid, Typography, Button, Box, Modal,FormControl, OutlinedInput  } from '@mui/material';
import { FaPen, FaTrashAlt, FaInstagram, FaFacebookF, FaTelegramPlane, FaTwitter, FaLinkedinIn, FaGlobe } from "react-icons/fa";

const Path = ({path, log, setLog, setAddPath, setInputs, setEditable}) => {

    const [open, setOpen] = React.useState(false);
    const [accept,setAccept] = React.useState("");
    const [delId,setDelId] = React.useState(0);
    const handleOpen = () => setOpen(true);

    const handleDelete = async (id)=> {
        setOpen(true)
        setDelId(id)
      }

    const handleClose = () => {
      setOpen(false);
      setAccept("");
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const typeHandler = (type,num)=> {
        const socialMediaTypes = [
            {id:1, appIcon: <FaInstagram size="20px"/>, appName: 'اینستاگرام'},
            {id:2, appIcon: <FaFacebookF size="20px"/>, appName: 'فیسبوک'},
            {id:3, appIcon: <FaTelegramPlane size="20px"/>, appName: 'تلگرام'},
            {id:4, appIcon: <FaTwitter size="20px"/>, appName: 'توییتر'},
            {id:5, appIcon: <FaLinkedinIn size="20px"/>, appName: 'لینکدین'},
            {id:6, appIcon: <FaGlobe size="20px"/>, appName: 'وب سایت'},
        ]
        switch (type) {
            case 1:
                return num === 1 ? socialMediaTypes[0].appName: socialMediaTypes[0].appIcon;
                break;
            case 2:
                return num === 1 ? socialMediaTypes[1].appName: socialMediaTypes[1].appIcon;
                break;
            case 3:
                return num === 1 ? socialMediaTypes[2].appName: socialMediaTypes[2].appIcon;
                break;
            case 4:
                return num === 1 ? socialMediaTypes[3].appName: socialMediaTypes[3].appIcon;
                break;
            case 5:
                return num === 1 ? socialMediaTypes[4].appName: socialMediaTypes[4].appIcon;
                break;
            case 6:
                return num === 1 ? socialMediaTypes[5].appName: socialMediaTypes[5].appIcon;
                break;
        }
    }

    const deletehandle = async(id)=> {
        if(accept === "تایید"){
          setOpen(false)
          setLog(log.filter(item=>item.id !== id))
          await fetch('http://localhost:3030/socials/' + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
            }
          })
        }
      }

    const editHandler = (id) => {
      setAddPath(true);
      const editarr = log.find(item => item.id === id);
      setInputs({...editarr, id:id});
      setEditable(true);
    }
    
  return (
    <>
        <Grid container sx={{boxShadow: 1, borderRadius: 0.5, p:1,my:1, alignItems: 'center'}}>
            <Grid item xs={1}
                sx={{color: theme => theme.palette.mode === 'light' ? 'grey.900' : 'common.white'}}
            >
                {typeHandler(path.type,2)}
            </Grid>
            <Grid item xs={1}>
                <Typography variant='subtitle2'
                    sx={{color: theme => theme.palette.mode === 'light' ? 'grey.900' : 'common.white'}}
                >
                {typeHandler(path.type,1)}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='subtitle2' color='grey.500'>آی دی (ID):</Typography>
            </Grid>
            <Grid item xs={1}>
                
                <Typography variant='subtitle2'
                    sx={{color: theme => theme.palette.mode === 'light' ? 'grey.900' : 'common.white', display: 'flex', justifyContent: 'flex-end'}}
                >
                    <bdo dir="ltr">{path.social_id}</bdo>
                    
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant='subtitle2' color='grey.500'>لینک:</Typography>
            </Grid>
            <Grid item xs={2} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant='subtitle2' color='warning.main'>{path.social_link}</Typography>
            </Grid>
            <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant='text' color='warning' onClick={() => editHandler(path.id)}><FaPen /> &nbsp; ویرایش</Button>
                <Button variant='text' color='error' onClick={()=>handleDelete(path.id)}><FaTrashAlt /> &nbsp; حذف</Button>
            </Grid>
        </Grid>
        <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="" variant="h6" component="h6" sx={{color: theme => theme.palette.mode === 'light' ? 'grey.900' : 'white'}}>
                  آیا از تصمیم خود مطمئن هستید؟
                </Typography>
                <Typography id="" sx={{ mt: 2, color: theme => theme.palette.mode === 'light' ? 'grey.700' : 'grey.50'}}>
                  برای حذف مسیر ارتباطی  لطفا تایید را بنویسید
                </Typography>
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <OutlinedInput
                    value={accept}
                    onChange={(e)=>setAccept(e.target.value)}
                    id=""
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    placeholder="تایید"
                  />
              </FormControl>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button variant="text" color='warning' onClick={handleClose}>انصراف</Button>
                  <Button variant="text" color={accept === 'تایید' ? 'error' : 'primary'} onClick={()=>deletehandle(delId)}>حذف</Button>
                </Box>
              </Box>
          </Modal>
    </>
  )
}

export default Path;