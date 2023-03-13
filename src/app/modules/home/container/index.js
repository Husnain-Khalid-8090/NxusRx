import React, { useState, useEffect,useContext } from "react";
import "./home.scss";
import { getStarshipDetails } from "../services";
import Map from "../../../shared/components/Map";
import Loader from "~shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import LayoutContext from "../../../shared/components/layout/container";
import {Dashboard, OpenInNew} from "@mui/icons-material";
import Footer from "../../../shared/components/footer";
import Header from "../../../shared/components/header";


const Home = () => {
  const dispatch = useDispatch();

  const HomeContent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    // display the error if error from api. In real application reaplce this with a toast notification
      return (
        <div>
          <React.Fragment>
            <Header/>
            <CssBaseline />
            <Container maxWidth="100" sx={{paddingTop: '100px'}}>
              <Box sx={{ height: "calc(100vh - 218px);" }}>
                <Stack direction="row" justifyContent="space-between" spacing={2} mb={3}>
                  <Box>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    id="basic-button"
                    variant="contained"
                    className="containedDefault"
                    startIcon={<FilterAltOutlinedIcon />}
                    endIcon={<ExpandMoreOutlinedIcon />}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ marginLeft: '10px', }}
                  >
                    Filters
                  </Button>
                  </Box>
                  <Button
                      id="basic-button"
                      variant="contained"
                      className="containedDefault"
                      startIcon={<OpenInNew />}
                  >
                    Go to Dashboard
                  </Button>
                </Stack>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            
              </Box>
            </Container>
            <Footer/>
          </React.Fragment>
        </div>
      );
  };

  // if (!loading) return <Loader />;
  return (
    <div>
      <HomeContent />
    </div>
  );
};

export default Home;
