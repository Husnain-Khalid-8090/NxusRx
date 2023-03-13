import React from "react";
import './authLayout.scss';
import {Box, Grid, Typography} from "@mui/material";
import medicine from "../../../assets/images/medicine.png";
import Container from "@mui/material/Container";
import logo from '../../../assets/images/nxusLogo.png'
import Toolbar from "@mui/material/Toolbar";


const AuthLayout = ({children}) => {
    return (
        <>
            <Toolbar sx={{position: 'absolute', top: "30px", left: "30px"}}>
                <Typography variant="body1" gutterBottom>

                    <img src={logo} className="logo"/>

                </Typography>
            </Toolbar>
            <Grid className="nuxus-bg" container sx={{justifyContent: "center", height: "100%", alignItems: "center"}}>

                <Grid container maxWidth="xl">
                    <Grid item md={7}  sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography variant="h5" gutterBottom className="text-auth">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
                                consectetur Lorem ipsum dolor sit amet, consectetur
                            </Typography>
                            <Box sx={{
                                marginTop: "50px",
                                marginLeft: "50px",
                            }}>
                                <img src={medicine}/>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={5}
                        sx={{height: "90%", display: "flex", justifyContent: "flex-end"}}
                    >
                        <Box px={3} flex={1} className="signUpcontainer">
                            {children}
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
        </>
    );
};

export default AuthLayout;