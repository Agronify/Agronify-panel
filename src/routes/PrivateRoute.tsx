import { Navigate } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../hooks";

import { Copyright } from "@mui/icons-material";

import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Drawer,
  Divider,
  List,
  Grid,
  Paper,
  Container,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface PrivateRouteProps {
  children: JSX.Element;
  title: string;
}
const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const authData = useAppSelector((state) => state.auth);
  if (authData.user === null) {
    return <Navigate to="/login" />;
  }
  if (authData.user) {
    console.log("authData.user", authData.user);
    return <DashboardBase {...props} />;
  }
  return <Navigate to="/login" />;
};
export default PrivateRoute;
interface DashboardBaseProps {
  children: JSX.Element;
  title: string;
}
function DashboardBase(props: DashboardBaseProps) {
  const drawerWidth: number = 240;

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography
            component={"h1"}
            variant={"h6"}
            color={"#33B86A"}
            align={"center"}
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Agronify
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  color: "#33B86A",
                  width: "30px",
                  height: "30px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component="a" href="/knowledge">
            <ListItemIcon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.612915"
                  width="50"
                  height="50"
                  rx="10"
                  fill="#33B86A"
                />
                <path
                  d="M43.4279 38.8223C42.0878 37.7967 39.2601 36.7004 35.3434 36.7004C31.4268 36.7004 28.5991 37.7967 27.259 38.8223C26.2964 39.5588 24.9589 39.5588 23.9964 38.8223C22.6562 37.7967 19.8285 36.7004 15.9119 36.7004C11.9952 36.7004 9.16752 37.7967 7.82739 38.8223V33.3577H43.4279V38.8223H43.4279Z"
                  fill="#EBC9A0"
                />
                <path
                  d="M35.3218 10.627C31.2878 10.627 27.7311 11.6876 25.6277 13.3012C23.5243 11.6876 19.9677 10.627 15.9337 10.627C12.2775 10.627 9.01347 11.4982 6.86806 12.8627C6.47746 13.1112 6.23962 13.5385 6.23962 14.0014V36.7005C8.34305 35.087 11.8997 34.0263 15.9337 34.0263C19.9677 34.0263 23.5243 35.087 25.6277 36.7005C27.7311 35.087 31.2878 34.0263 35.3218 34.0263C39.3558 34.0263 42.9124 35.0869 45.0158 36.7005V14.0014C45.0158 13.5385 44.778 13.1112 44.3874 12.8627C42.242 11.4982 38.9779 10.627 35.3218 10.627Z"
                  fill="#FAEBC8"
                />
                <path
                  d="M15.9337 10.627C12.2775 10.627 9.01347 11.4982 6.86806 12.8627C6.47746 13.1111 6.23962 13.5384 6.23962 14.0014V36.7005C8.34305 35.087 11.8997 34.0263 15.9337 34.0263C19.9677 34.0263 23.5243 35.087 25.6277 36.7005V13.3012C23.5243 11.6876 19.9677 10.627 15.9337 10.627Z"
                  fill="#F5DCB4"
                />
                <path
                  d="M44.7237 12.3338C42.3919 10.8506 38.965 10 35.3218 10C31.5174 10 27.9404 10.9385 25.6277 12.5269C23.3151 10.9385 19.7381 10 15.9337 10C12.2905 10 8.86352 10.8506 6.53172 12.3338C5.95637 12.6997 5.61292 13.3231 5.61292 14.0012V36.7004C5.61292 36.939 5.74848 37.1569 5.96239 37.2624C6.17638 37.368 6.4318 37.3429 6.62116 37.1977C8.69832 35.6042 12.1797 34.6529 15.9337 34.6529C19.6876 34.6529 23.169 35.6042 25.2462 37.1977C25.4713 37.3702 25.7841 37.3702 26.0092 37.1977C28.0863 35.6042 31.5677 34.6529 35.3217 34.6529C39.0756 34.6529 42.557 35.6042 44.6342 37.1977C44.7458 37.2833 44.8803 37.3272 45.0158 37.3272C45.1102 37.3272 45.2051 37.3058 45.293 37.2625C45.507 37.157 45.6425 36.939 45.6425 36.7004V14.0012C45.6425 13.3231 45.2991 12.6997 44.7237 12.3338ZM44.389 35.5295C42.0836 34.1828 38.7975 33.3994 35.3218 33.3994C31.8456 33.3994 28.5599 34.1833 26.2545 35.5303V18.6495C26.2545 18.3034 25.9739 18.0227 25.6277 18.0227C25.2816 18.0227 25.0009 18.3033 25.0009 18.6495V35.5303C22.6956 34.1834 19.4098 33.3994 15.9337 33.3994C12.4579 33.3994 9.1718 34.1828 6.86642 35.5295V14.0013C6.86642 13.7541 6.99276 13.5262 7.20448 13.3916C9.34067 12.0328 12.5224 11.2537 15.9337 11.2537C19.5439 11.2537 22.9014 12.1339 25.0009 13.6187V15.3068C25.0009 15.6529 25.2815 15.9336 25.6277 15.9336C25.9738 15.9336 26.2545 15.653 26.2545 15.3068V13.6187C28.354 12.1339 31.7115 11.2537 35.3218 11.2537C38.733 11.2537 41.9148 12.0329 44.051 13.3916C44.2626 13.5262 44.389 13.7541 44.389 14.0013V35.5295Z"
                  fill="#D3BA92"
                />
                <path
                  d="M43.7696 38.3251C42.9738 37.7146 41.8113 37.1643 40.4966 36.7757C38.9206 36.3099 37.1795 36.0737 35.3218 36.0737C33.464 36.0737 31.7229 36.3099 30.1469 36.7757C28.8322 37.1643 27.6698 37.7146 26.874 38.325C26.1404 38.8877 25.1154 38.8877 24.3816 38.3251C23.5858 37.7146 22.4234 37.1643 21.1087 36.7757C19.5327 36.3099 17.7915 36.0737 15.9338 36.0737C14.0761 36.0737 12.335 36.3099 10.759 36.7757C9.44427 37.1643 8.28185 37.7146 7.48603 38.3251C7.21137 38.5358 7.15954 38.9292 7.37024 39.2039C7.58094 39.4785 7.97444 39.5304 8.24901 39.3196C9.50463 38.3565 12.1829 37.3273 15.9338 37.3273C19.6848 37.3273 22.3631 38.3565 23.6187 39.3198C24.2103 39.7733 24.919 40.0002 25.6277 40.0002C26.3365 40.0002 27.0454 39.7733 27.6369 39.3197C28.8925 38.3566 31.5707 37.3274 35.3217 37.3274C39.0727 37.3274 41.751 38.3566 43.0065 39.3197C43.2811 39.5304 43.6747 39.4785 43.8853 39.2039C44.0961 38.9292 44.0442 38.5358 43.7696 38.3251Z"
                  fill="#D3BA92"
                />
              </svg>
            </ListItemIcon>
            <ListItemText primary="Knowledge Data" />
          </ListItemButton>
          <ListItemButton component="a" href="/crop">
            <ListItemIcon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.53772"
                  width="50"
                  height="50"
                  rx="10"
                  fill="#33B86A"
                />
                <path
                  d="M33.0991 27.4024C32.1002 28.0096 30.9529 28.329 29.7839 28.3252C28.8046 28.3174 27.8364 28.1171 26.9343 27.7357C26.2391 28.7171 25.8671 29.8908 25.8699 31.0935V34.165C25.8702 34.2792 25.8469 34.3922 25.8017 34.4971C25.7564 34.602 25.69 34.6964 25.6067 34.7745C25.5234 34.8527 25.4249 34.9128 25.3173 34.9513C25.2098 34.9898 25.0955 35.0057 24.9815 34.9982C24.7673 34.9795 24.5681 34.8806 24.4239 34.7213C24.2796 34.5619 24.2009 34.3539 24.2035 34.1389V32.8433L20.1812 28.821C19.5833 29.044 18.9509 29.1607 18.3127 29.1657C17.4342 29.1679 16.5721 28.9275 15.8214 28.471C13.552 27.0921 12.3303 23.9186 12.5667 19.9785C12.5786 19.7747 12.6649 19.5823 12.8093 19.4379C12.9537 19.2936 13.1461 19.2072 13.3499 19.1953C17.2899 18.9631 20.4634 20.1806 21.8382 22.45C22.3784 23.3396 22.6142 24.3808 22.51 25.4163C22.5035 25.4965 22.474 25.5731 22.4248 25.6369C22.3757 25.7007 22.3092 25.7489 22.2333 25.7756C22.1574 25.8024 22.0754 25.8066 21.9971 25.7877C21.9189 25.7689 21.8478 25.7278 21.7924 25.6693L19.7927 23.5759C19.6352 23.4263 19.4254 23.344 19.2081 23.3468C18.9909 23.3496 18.7833 23.4372 18.6296 23.5908C18.476 23.7444 18.3884 23.952 18.3857 24.1693C18.3829 24.3866 18.4651 24.5963 18.6147 24.7539L24.2264 30.5082C24.2327 30.427 24.24 30.3457 24.2483 30.2655C24.4305 28.7207 25.1122 27.2776 26.1897 26.1557L31.4587 20.5878C31.615 20.4316 31.7029 20.2197 31.703 19.9987C31.7031 19.7777 31.6154 19.5657 31.4592 19.4093C31.303 19.253 31.0911 19.1651 30.8701 19.165C30.6491 19.1649 30.4371 19.2526 30.2807 19.4088L25.1773 24.8059C25.1262 24.86 25.0616 24.8995 24.9901 24.9202C24.9186 24.9408 24.8429 24.942 24.7708 24.9235C24.6987 24.905 24.6329 24.8675 24.5802 24.815C24.5275 24.7624 24.4899 24.6967 24.4712 24.6247C23.9775 22.8042 24.1952 20.9919 25.1377 19.4359C26.9979 16.3655 31.3264 14.722 36.7173 15.0386C36.9211 15.0505 37.1135 15.1369 37.2579 15.2813C37.4022 15.4256 37.4886 15.618 37.5005 15.8219C37.8129 21.2138 36.1694 25.5423 33.0991 27.4024Z"
                  fill="url(#paint0_linear_225_1617)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_225_1617"
                    x1="14.3014"
                    y1="32.9828"
                    x2="30.834"
                    y2="15.2428"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.0048071" stopColor="#B3EC82" />
                    <stop offset="1" stopColor="#9CCC65" />
                  </linearGradient>
                </defs>
              </svg>
            </ListItemIcon>
            <ListItemText primary="Crop Data" />
          </ListItemButton>
          <ListItemButton component="a" href="/model">
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="ML Models" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
