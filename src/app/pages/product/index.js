import React, {useState, useEffect, useCallback} from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent, Select} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import {DataGrid} from '@mui/x-data-grid';
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import debounce from "lodash.debounce";
import "./product.scss";
import Stack from '@mui/material/Stack';
import product, {
  getPharmacyProductList

} from "../../services/products";
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '../../shared/components/Pagination';
import useDialogModal from "../../hooks/useDialogModal";
import Verify from "../../assets/images/teenyicons_tick-circle-outline.svg";
import Reject from "../../assets/images/system-uicons_cross-circle.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const {user} =useSelector(state => state?.auth);
  const response = useSelector(state => state?.product?.products?.response);
  const loading = useSelector(state => state?.product?.products?.loading);
  const [customLoading, setCustomLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [productId, setProductId] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [state, setState] = useState({
    products: response,
    count: 0
  });

  useEffect(() => {

    dispatch(getPharmacyProductList(user?._id,'', '', page, limit, function (res) {
      if (res) {
        setCustomLoading(false);
      }
    }));

  }, []);

  useEffect(() => {
    const count = response?.count;
    const perPage = 10;
    const buttonsCount = Math.ceil(count / perPage);
    setState({...state, products: response?.products, count: buttonsCount});

  }, [response]);


  const handlePageChange = useCallback((e, value) => {
    dispatch(getPharmacyProductList(user?._id,search ? search : '', '', value, limit, function (res) {
    }));
    setPage(value);
    setCustomLoading(false);
  }, []);

  const debouncedGetSearch = useCallback(debounce((query) => {

    setPage(1);
    dispatch(getPharmacyProductList(user?._id,query, '', page, limit, function (res) {
    }));
  }, 1000), []);

  const searchText = (e) => {
    setSearch(e.target.value);
    debouncedGetSearch(e.target.value, '', page, limit);
  };

  let columns = [
    {
      field: "PRODUCT STATUS",
      headerName: "PRODUCT STATUS",
      flex: 1,
      renderCell: (params) => {
        return (
            <Box>
              <>

                <Typography variant="body1" component="body1">
                  {params?.row?.status[params?.row?.status.length - 1]?.CLASS}
                </Typography>

              </>
            </Box>
        );
      },
    },

    {field: 'product_name', headerName: 'Product Name', flex: 1},
    {field: 'DRUG_CODE', headerName: 'DRUG CODE', flex: 1},
    {field: 'DRUG_IDENTIFICATION_NUMBER', headerName: 'DRUG IDENTIFICATION NUMBER', flex: 1},
    {field: 'PRODUCT_CATEGORIZATION', headerName: 'PRODUCT CATEGORIZATION', flex: 1},
    {field: 'BRAND_NAME', headerName: 'BRAND NAME', flex: 1},

    {field: 'DESCRIPTOR', headerName: 'DESCRIPTOR', flex: 1},
    {field: 'CLASS', headerName: 'CLASS', flex: 1},
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
            <Box>
              <>

                <IconButton variant="text"
                            onClick={() => {
                              setProductId(params?.row?._id);

                            }}
                >
                  {(params?.row?.status == 'pending') || (params?.row?.status == 'rejected') ?
                      <img src={Verify}/>
                      :
                      <img src={Reject}/>
                  }


                </IconButton>


              </>
            </Box>
        );
      },
    },
  ];


  return (
      <Card className="card-grid">

        <CardContent>

          <Toolbar disableGutters>

            <Typography variant="h5" sx={{flex: "1 1 100%"}}>
              Products
            </Typography>
            <Button variant="contained" className="containedPrimary"
                    onClick={() => navigate('/dash/addProduct',{replace:true})}>

              Add Product
            </Button>
            <TextField
                size="small"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={searchText}
                InputProps={{
                  endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon/>
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
          </Toolbar>

          <Box sx={{height: "calc(100% - 68px)", width: "100%"}}>

            {loading ?
                <Box sx={{display: 'flex'}}>
                  <CircularProgress/>
                </Box>

                :
                <DataGrid
                    rows={state?.products && state?.products?.length > 0 ? state?.products : []}
                    columns={columns}
                    hideFooter={true}
                    hideFooterRowCount={true}
                />
            }

          </Box>
          {!customLoading &&
              <Stack spacing={2}>
                {state.count > 0 &&
                    <Pagination totalCount={state?.count} page={page}
                                onPageChange={handlePageChange}/>
                }
              </Stack>
          }
        </CardContent>

      </Card>
  );
};

export default Products;