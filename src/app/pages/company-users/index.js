import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent, Select } from "@mui/material";
import Filter from "../../assets/images/cil_filter.svg"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import {
  getAdminCompanyUsers,
  updateAdminCompanyUserStatus,
} from '../../services/admin-dashboard';
import { Approval, Check, Close } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
const options = ["Verified", "Not Verified", "Rejected"];

export const Users = () => {
  const dispatch = useDispatch();
  const loginResponse=useSelector(state=>state?.auth?.userLogin?.response);
  const companyId=loginResponse?.data?.company_id;
  const response = useSelector(
    (state) => state?.dashboard?.adminCompanyUsers?.response
  );
  const loading = useSelector(
    (state) => state?.dashboard?.adminUpdateCompanyUsersStatus?.loading
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(2);
  const [userId, setUserId] = useState("");
  const [state, setState] = useState({
    users: [],
    pagination: {},
  });
  console.log(state,"sasadsad")

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
   
    dispatch(getAdminCompanyUsers(companyId,"", "", ""));
  }, []);

  useEffect(() => {
    setState({
      ...state,
      users: response?.result,
      pagination: response?.pagination,
    });
  }, [response]);

  const handlePageChange = (newPage) => {
    debugger;
    setPage(newPage);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 2));
    setPage(0);
  };
  const menuClicked = (e, value) => {
    setStatus(value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = (e) => {
    // console.log(e.target.innerText.toUpperCase())
    setStatus(e.target.innerText.toUpperCase());
    setAnchorEl(null);
    setOpen(false);
  };

  const handleStatus = (row, status) => {
    let data = { user_id: row.id, status };
    setUserId(row.id);
    dispatch(
      updateAdminCompanyUserStatus(data, function (res) {
        if (res) {
          dispatch(getAdminCompanyUsers(companyId,"", "", ""));
        }
      })
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "country", headerName: "Country", width: 150 },  
    { field: "role", headerName: "Role", width: 150 },
    {field:'active',headerName:'Status',width:130, renderCell: (params) => {
      return <Box>

       

              <>
                 
             
                  {params?.row?.active != true &&
                  <p>NOT_ACTIVE</p>
          }
                     {params?.row?.active != false &&
                 <p>ACTIVE</p>
                     }
              </>
          








      </Box>; }},
    {field:'Action',headerName:'Action',width:130, renderCell: (params) => {
      return <Box>

          {loading && params?.row?.id == userId  ?
              // <ClipLoader size={25} color="white" loading />
              <CircularProgress></CircularProgress>
              :

              <>
                  {params?.row?.active != true &&
                  <IconButton onClick={()=>handleStatus(params.row,true)}><Check/></IconButton>
          }
                     {params?.row?.active != false &&
                  <IconButton onClick={()=>handleStatus(params.row,false)}><Close/>

              </IconButton>
}
              </>



          }




      </Box>; },}
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   width: 130,
    //   renderCell: (params) => {
    //     return (
    //       <Box>
    //         {loading && params.row.id == companyId ? (
    //           // <ClipLoader size={25} color="white" loading />
    //           "...please wait"
    //         ) : (
    //           <>
    //             <IconButton
    //               onClick={() => handleStatus(params.row, true)}
    //             >
    //               <Check />
    //             </IconButton>
    //             <IconButton
    //               onClick={() => handleStatus(params.row, false)}
    //             >
    //               <Close />
    //             </IconButton>
    //           </>
    //         )}
    //       </Box>
    //     );
    //   },
    // },
  ];

  const { users } = state;

  return (
    <Card>
      <ToastContainer autoClose={2000} />
      <CardContent>
        <Toolbar disableGutters>
          <Typography variant="h5" sx={{ flex: "1 1 100%" }}>
            Company Users List
          </Typography>
          <Button
            variant="contained"
            className="containedDefault"
            startIcon={<img src={Filter} />}
            endIcon={<ExpandMoreOutlinedIcon />}
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ marginRight: "30px" }}
          >
            Filters
          </Button>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => console.log(e.target.value, "asdasdas")}
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

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onChange={menuClicked}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={status} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>

        <Box sx={{ height: "450px", width: "100%" }}>
          <DataGrid
            rows={users ? users : []}
            columns={columns}
            hideFooter={true}
            hideFooterRowCount={true}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            filterMode="client"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Users;
