import * as React from 'react';
import { Grid, Typography, Button, Box, TextField, InputLabel, Select, MenuItem, FormControl} from '@mui/material';
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaTwitter, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { Formik } from 'formik';
import * as Yup from 'yup';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    social_id: Yup.string()
      .required('Required'),
    social_link: Yup.string()
      .required('Required'),
    type: Yup.string()
      .required('Required'),
  });

    

const AddPath = ({setAddPath, log, setLog, inputs, setInputs, editable}) => {

    const submitHandler = async (e) => {
        e.preventDefault()
        setAddPath(false)
        setLog(log.concat([inputs]))
        let response = await fetch("http://localhost:3030/socials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        setInputs({})
    }

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    const ignoreHandler = () => {
        setAddPath(false);
        setInputs({});
    }

    const editHandler = async(e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:3030/socials/" + inputs.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const edited = log.map(item => {
            if(item.id === inputs.id){
                return inputs
            }
            return item
        });
        setLog(edited);
        setInputs({})
        setAddPath(false)
    }
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





    return (
    <>
    <Formik
      initialValues={{
        social_id: '',
        social_link: '',
        type: '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
    //   onSubmit={values => {
    //     // same shape as initial values
    //     console.log(values);
    //   }}
    >

        {({ errors, touched }) => (
            <form id='form' onSubmit={editable ? editHandler : submitHandler}>
            <Grid container sx={{boxShadow:1, borderRadius: 0.5, p:1}}>
                <Grid item xs={12} sx={{p:1, color: theme => theme.palette.mode === 'light' ? 'grey.900' : 'common.white'}}>
                    <Typography>ویرایش مسیر ارتباطی</Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>*نوع</InputLabel>
                        <Select
                        name='type'
                        value={inputs.type || ""}
                        renderValue={(value) => {
                            return <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <span>{typeHandler(value,2)}&nbsp;&nbsp;</span>
                                    <span>{typeHandler(value,1)}</span>
                                  </Box>;
                        }}
                        onChange={changeHandler}
                        label="*نوع"
                        sx={{height: '54px', mx: 1}}
                        >
                        <MenuItem value={1}>اینستاگرام</MenuItem>
                        <MenuItem value={2}>فیسبوک</MenuItem>
                        <MenuItem value={3}>تلگرام</MenuItem>
                        <MenuItem value={4}>توییتر</MenuItem>
                        <MenuItem value={5}>لینکدین</MenuItem>
                        <MenuItem value={6}>وب سایت</MenuItem>
                        </Select>
                    </FormControl>
                    {touched.type && errors.type && <div>{errors.type}</div>}
                </Grid>
                <Grid item xs={4}>
                    <TextField name='social_link' value={inputs.social_link || ""} onChange={changeHandler} variant="outlined" label="*لینک" sx={{display: 'flex', mx: 1}} />
                    {touched.social_link && errors.social_link && <div>{errors.social_link}</div>}
                </Grid>
                <Grid item xs={4}>
                    <TextField name='social_id' value={inputs.social_id || ""} onChange={changeHandler} variant="outlined" label="*آی دی (ID):"  sx={{display: 'flex', mx: 1}} />
                    {touched.social_id && errors.social_id && <div>{errors.social_id}</div>}
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{m:1,display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant='outlined' onClick={ignoreHandler} sx={{mr:1}}>انصراف</Button>
                        
                        <Button variant='contained' type='submit' color='warning'>{editable === true ? "ویرایش" : "افزودن"} مسیر ارتباطی</Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
      )}


    </Formik>
    </>
  )
}

export default AddPath;