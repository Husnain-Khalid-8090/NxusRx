import React, { useEffect } from "react";
import "./nexus.scss";
import Header from "../../shared/components/header";
import Sidebar from "../../shared/components/sidebar";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { useDispatch, useSelector } from "react-redux";
import { getPharmacyLandingProducts } from "../../services/products";
const drawerWidth = "100%";
import img from "../../assets/images/medicin.png";
import img2 from "../../assets/images/medicine.png";

const NexusLanding = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPharmacyLandingProducts());
  }, [dispatch]);
  const response = useSelector(
    (state) => state?.product?.landingPageProducts?.response
  );
  const products = response?.data?.products;
  console.log(products, "products>>>>>>>");
  let items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: img,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: img2,
    },
  ];
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "100px",
          paddingBottom: "30px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Drawer
              variant="permanent"
              className="landing-sidebar"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                height: "100%",
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Box sx={{ overflow: "auto" }}>
                <List>
                  {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={"text"} />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
                </List>
                <Divider />
              </Box>
            </Drawer>
          </Grid>
          <Grid item md={9}>
            <Box component="main" sx={{ flexGrow: 1, paddingLeft: "15px" }}>
              <Box>
                <Carousel height={506}>
                  {items.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid alignItems="flex-start" spacing={3} container mt={3}>
          <Grid
            container
            md={4}
            item
            direction="columns"
            sx={{ height: "100%" }}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                background: "7366FF",
                color: "#fff",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  asd
                </Typography>
                <Box
                  sx={{
                    "& img": { width: "200px" },
                  }}
                >
                  <img src={img} />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            container
            md={8}
            spacing={3}
            item
            direction="columns"
            sx={{ flexGrow: 1 }}
          >
            {products?.map((product) => {
              return (
                <Grid item md={6}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      background: "7366FF",
                      color: "#fff",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {product?.brand}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {product?.product_name}
                      </Typography>

                      <Box
                        sx={{
                          "& img": { width: "100px" },
                        }}
                      >
                        <img src={product?.imageCover?.full_image} />
                      </Box>
                      <Typography variant="h5" component="div">
                        {`$${product?.price}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add to Cart</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );

  function Item(props) {
    return (
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Box sx={{ flex: "1" }}>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
          <Button className="CheckButton">Check it out!</Button>
        </Box>
        <Box sx={{ flex: "1" }}>
          <img width="200px" src={props.item.img} />
        </Box>
      </Paper>
    );
  }
};

export default NexusLanding;
