import React,{useEffect} from "react";
import '../verifyEmail/verifyEmail.scss';
import AuthLayout from "../../shared/components/authLayout";
import {useDispatch,useSelector}from 'react-redux'
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import confirmEmail from "../../assets/images/confirmemail.svg";
import '../../../scss/components/_modal.scss';
import { getEmailVerificationDetails } from "../../services/auth";
import {useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const style = {
    width: 800,
};


const ConfirmEmail = ({match}) => {
          const  params = useParams()
    const uniqId=params?.id;
    const uniqString=params?.uniqueString

    console.log(params,'sss')
    const dispatch=useDispatch()
    const history=useNavigate()
 const response=useSelector(state=>state.auth.emailVerification.response)
 const error=useSelector(state=>state.auth.emailVerification.error)
 console.log(error,"EmailError")
 console.log(response,"email response")
    useEffect(()=>{
dispatch(getEmailVerificationDetails(uniqId,uniqString))
    },[dispatch])
    return (
        <AuthLayout>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {error?.error?.length>0?<Box className={'modalUi'} sx={style}>
                    <img src={confirmEmail} width={'300px'}/>
                    <Typography variant="h4" gutterBottom>
                        Sorry
                    </Typography>
                    <Typography id="modal-modal-description">
                       {error?.error}
                    </Typography>
                
        <Button variant="text" onClick={() => history("/login")}>
          Login
        </Button>
                </Box>:<Box className={'modalUi'} sx={style}>
                    <img src={confirmEmail} width={'300px'}/>
                    <Typography variant="h4" gutterBottom>
                        Congratulations!
                    </Typography>
                    <Typography id="modal-modal-description">
                        Your email has been verified successfully. We will notify you once your request is approved by admin
                    </Typography>
                    
        <Button variant="text" onClick={() => history("/login",{replace:true})}>
          Login
        </Button>
                </Box>}
                
            </Modal>
        </AuthLayout>
    );
};
export default ConfirmEmail;