import * as React from "react";

import { useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import BasicTable from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "./redux/features/counterSlice";
import { ExportToExcel } from "./components/exportToExcel";

function App() {
  const [student, setStudent] = useState({
    name: "",
    class: "",
    section: "",
  });

  const [open, setOpen] = useState(false);
  const [table, setTable] = useState(false);
  //const [allData, setAllData] = useState([]);
  const fileName = "students";

  const allStudents = useSelector((state) => state.counter.allStudents);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStudents = async () => {
    await axios
      .get("http://localhost:5000/students/getStudents")
      .then((response) => {
        if (response.status === 200) {
          setTable(true);
          //setAllData(response.data.allStudents);
          dispatch(incrementByAmount(response.data.allStudents));
        }
      });
  };
  const createData = async () => {
    await axios
      .post("http://localhost:5000/student/create", student)
      .then((response) => {
        if (response.status === 201) {
          setOpen(false);
          alert(response.statusText);
        }
      });
  };

  return (
    <div className="App">
      <div className="nav">
        <MyButton
          value={"Add Student"}
          variant="contained"
          color="success"
          onClick={handleClickOpen}
        />

        <MyButton
          value={"Show Data"}
          variant="contained"
          color="primary"
          onClick={getStudents}
        />

        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Student"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Enter student details Please
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="standard"
                onChange={(e) => {
                  student.name = e.target.value;
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="class"
                label="Class"
                type="text"
                variant="standard"
                onChange={(e) => {
                  student.class = e.target.value;
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="section"
                label="Section"
                type="text"
                variant="standard"
                onChange={(e) => {
                  student.section = e.target.value;
                }}
              />
            </DialogContent>
            <DialogActions>
              <MyButton
                value={"Submit"}
                variant="contained"
                color="primary"
                onClick={createData}
              />
              <MyButton
                value={"Close"}
                variant="contained"
                color="secondary"
                onClick={handleClose}
              />
            </DialogActions>
          </Dialog>
        </React.Fragment>

        <div className="nav-bar">
          {table && <BasicTable data={allStudents} />}
          <br></br>
          {table && <ExportToExcel apiData={allStudents} fileName={fileName} />}
        </div>
      </div>
    </div>
  );
}

export default App;
