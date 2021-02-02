import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ViewListIcon from "@material-ui/icons/ViewList";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { DataGrid } from "@material-ui/data-grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import history from "./history";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
const axios = require("axios");

const light = {
  palette: {
    type: "light",
  },
};

const dark = {
  palette: {
    type: "dark",
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.eelu.edu.eg/">
        National Egyptian E-Learning University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "hidden",
      flexDirection: "column",
      height: "75vh",
    },
    fixedHeight: {
      height: 240,
    },
    datagrid: {},
    dflex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [decisions, setDecisions] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [currentDecision, setCurrentDecision] = useState({});
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [issuedByError, setIssuedByError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState("Add");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);

  const appliedTheme = createMuiTheme(lightTheme ? light : dark);

  const filterModel = {
    items: [{ columnField: "title", operatorValue: "contains", value: "" }],
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    { field: "title", headerName: "Title", width: 130 },
    { field: "issuedby", headerName: "Issued By", width: 130 },
    { field: "summary", headerName: "Summary", width: 130 },
    { field: "date", headerName: "Date", type: "date", width: 130 },
    {
      field: "viewButton",
      headerName: "View",
      width: 130,
      disableClickEventBubbling: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        //console.log(params.row.viewButton);
        var index = params.row.id;

        const onClick = async () => {
          console.log("Viewing decision #" + index);
          var decision = decisions[index - 1];
          await axios
            .get("/api/retrieve_decisions/image/" + decision.image, {
              responseType: "arraybuffer",
            })
            .then(
              (response) =>
                (decision.imageBase64 =
                  "data:;base64," +
                  Buffer.from(response.data, "binary").toString("base64"))
            );
          setCurrentDecision(decision);
          setViewDialog(true);
        };

        return (
          <Button variant="contained" onClick={() => onClick()}>
            View
          </Button>
        );
      },
    },
    {
      field: "updateButton",
      headerName: "Update",
      width: 130,
      disableClickEventBubbling: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        //console.log(params.row.viewButton);

        const onClick = async () => {
          setTitle(params.row.title);
          setSummary(params.row.summary);
          setTags(params.row.tags);
          setIssuedBy(params.row.issuedby);
          setDate(params.row.date);
          setAddOrUpdate("Update");
          setTitleError(false);
          setSummaryError(false);
          setTagsError(false);
          setIssuedByError(false);
          setUpdateDialog(true);
        };

        return (
          <Button variant="contained" color="primary" onClick={() => onClick()}>
            Update
          </Button>
        );
      },
    },
    {
      field: "deleteButton",
      headerName: "Delete",
      width: 130,
      disableClickEventBubbling: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        //console.log(params.row.viewButton);
        var index = params.row.id;

        const onClick = async () => {
          console.log("Viewing decision #" + index);
          var decision = decisions[index - 1];
          var alldecisions = decisions;
          axios
            .post("/api/upload_decisions/delete", {
              _id: decision._id,
              oldimage: decision.image,
            })
            .then(function (response) {
              console.log(response);
              console.log(alldecisions.length);
              alldecisions.splice(index - 1, 1);
              console.log(alldecisions.length);
              setDecisions(alldecisions);
              //history.push("/dashboard");
            })
            .catch(function (error) {
              console.log(error);
              if (error) {
                setErrorMessage("An error occured. Please try again.");
                setAuthError(true);
              }
            });
        };

        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onClick()}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const getAllDecisions = async () => {
    axios.create({ baseURL: window.location.origin });
    await axios
      .get("/api/retrieve_decisions/all")
      .then(function (response) {
        var decisions = response.data.decisions;
        decisions.forEach((value, index) => {
          decisions[index].id = index + 1;
          decisions[index].date = new Date(
            decisions[index].date
          ).toLocaleDateString();

          decisions[index].updateButton = (
            <Button variant="contained" color="primary">
              Update
            </Button>
          );
        });
        console.log(decisions);
        setDecisions(decisions);
      })
      .catch(function (error) {
        console.log(error);
        setAuthError(true);
        setErrorMessage("An error occured. Please try again.");
      });
  };

  const constructor = async () => {
    if (constructorHasRun) return;
    await getAllDecisions();
    setConstructorHasRun(true);
  };

  constructor();

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setLightTheme(!lightTheme)}
            >
              <Brightness6Icon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  getAllDecisions();
                }}
              >
                <ListItemIcon>
                  <RefreshIcon />
                </ListItemIcon>
                <ListItemText primary="Refresh" />
              </ListItem>
              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setTitle("");
                  setSummary("");
                  setTags([]);
                  setIssuedBy("");
                  setDate(new Date());
                  setAddOrUpdate("Add");
                  setTitleError(false);
                  setSummaryError(false);
                  setTagsError(false);
                  setIssuedByError(false);
                  setUpdateDialog(true);
                }}
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Add Decision" />
              </ListItem>
            </div>
          </List>
          <Divider />
          <List>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  history.push("/login");
                }}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <DataGrid
                rows={decisions}
                columns={columns}
                pageSize={5}
                checkboxSelection
                className={classes.datagrid}
                showToolbar
                filterModel={filterModel}
              />
            </Paper>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
          <Dialog
            open={authError}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setAuthError(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAuthError(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullScreen
            open={viewDialog}
            onClose={() => setViewDialog(false)}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setViewDialog(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  View Decision
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              <img alt="decision" src={currentDecision.imageBase64} />
              <ListItem button>
                <ListItemText
                  primary="Title"
                  secondary={currentDecision.title}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Issued By"
                  secondary={currentDecision.issuedby}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Summary"
                  secondary={currentDecision.summary}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Date" secondary={currentDecision.date} />
              </ListItem>
              <Divider />
            </List>
          </Dialog>

          <Dialog
            open={updateDialog}
            onClose={() => setUpdateDialog(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{addOrUpdate}</DialogTitle>
            <DialogContent>
              <TextField
                error={titleError}
                value={title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                helperText={titleError ? "Required" : ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setTitleError(true);
                  } else {
                    setTitleError(false);
                    setTitle(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (title === "") {
                    setTitleError(true);
                  }
                }}
                autoFocus
              />

              <TextField
                error={issuedByError}
                value={issuedBy}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="issuedby"
                label="Issued By"
                name="issuedby"
                autoComplete="issuedby"
                helperText={issuedByError ? "Required" : ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setIssuedByError(true);
                  } else {
                    setIssuedByError(false);
                    setIssuedBy(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (issuedBy === "") {
                    setIssuedByError(true);
                  }
                }}
              />

              <TextField
                error={summaryError}
                value={summary}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                id="summary"
                label="Summary"
                name="summary"
                autoComplete="summary"
                helperText={summaryError ? "Required" : ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSummaryError(true);
                  } else {
                    setSummaryError(false);
                    setSummary(e.target.value);
                  }
                }}
                onBlur={() => {
                  if (summary === "") {
                    setSummaryError(true);
                  }
                }}
              />

              <TextField
                error={tagsError}
                value={tags.join()}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="tags"
                label="Tags"
                name="tags"
                autoComplete="tags"
                helperText={tagsError ? "Required" : ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setTagsError(true);
                  } else {
                    setTagsError(false);
                    setTags(e.target.value.split(/(?:,| )+/));
                  }
                }}
                onBlur={() => {
                  if (tags === []) {
                    setTags(true);
                  }
                }}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  id="date"
                  label="Date"
                  value={date}
                  onChange={(date) => setDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>

              <Grid
                container
                direction={"column"}
                spacing={1}
                className={classes.dflex}
              >
                <Grid item xs={9}>
                  <TextField
                    error={imageError}
                    value={imageName}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    disabled
                    id="image"
                    label="Image"
                    name="image"
                    helperText={imageError ? "Required" : ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setImageError(true);
                      } else {
                        setImageError(false);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                      setImageName(event.target.files[0].name);
                    }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      fullWidth
                    >
                      Browse
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setUpdateDialog(false)}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  var formData = new FormData();
                  formData.append("file", image);
                  formData.append("title", title);
                  formData.append("summary", summary);
                  formData.append("tags", tags);
                  formData.append("issuedby", issuedBy);
                  formData.append("date", date);
                  axios.create({ baseURL: window.location.origin });
                  axios
                    .post("/api/upload_decisions/new", formData)
                    .then(function (response) {
                      console.log(response);
                      setUpdateDialog(false);
                    })
                    .catch(function (error) {
                      console.log(error);
                      if (error) {
                        setErrorMessage("An error occured. Please try again.");
                        setAuthError(true);
                      }
                    });
                }}
                color="primary"
                variant="contained"
              >
                {addOrUpdate}
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </ThemeProvider>
  );
}
