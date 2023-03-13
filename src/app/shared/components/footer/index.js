import React from 'react';
import './footer.scss';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from "@mui/material/Typography";

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
      <Box className={'footer'}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
        >
            <Typography variant="caption">
                Mapped Mats © 2022 All Rights Reserved
            </Typography>
        </BottomNavigation>
      </Box>
  );
};

export default Footer;