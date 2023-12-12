import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MyButton from "./MyButton";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

export default function BasicTable(props) {
  const allStudents = useSelector((state) => state.counter.allStudents);
  const [updateData, setUpdateData] = useState({});
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    class: "",
    section: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateStudent = async (studentId) => {
    let studentData = allStudents.filter((data) => {
      return data._id === studentId;
    });
    if (studentData[0]) {
      setUpdateData(studentData[0]);
      handleClickOpen();
    }

    // await axios
    //   .delete(`http://localhost:5000/student/update/${studentId}`)
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  const deleteData = async (studentId) => {
    await axios
      .get(`http://localhost:5000/student/delete/?studentId=${studentId}`)
      .then((response) => {
        if (response.statusText === "OK") {
          alert("Deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  const updateStudentData = async () => {
    console.log(updateData);
    console.log(studentData);
    studentData.id = updateData._id;
    await axios
      .post("http://localhost:5000/student/update", studentData)
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          alert("Updated");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Class</TableCell>
              <TableCell align="right">Section</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.class}</TableCell>
                <TableCell align="right">{row.section}</TableCell>
                <TableCell align="right">
                  <MyButton
                    value={"Update"}
                    variant="contained"
                    color="secondary"
                    onClick={() => updateStudent(row._id)}
                  />
                </TableCell>
                <TableCell align="right">
                  <MyButton
                    value={"Delete"}
                    variant="contained"
                    color="error"
                    onClick={() => deleteData(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {updateData && (
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
                Update student details Please
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                defaultValue={updateData.name}
                variant="standard"
                onChange={(e) => {
                  studentData.name = e.target.value;
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="class"
                label="Class"
                type="text"
                defaultValue={updateData.class}
                variant="standard"
                onChange={(e) => {
                  studentData.class = e.target.value;
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="section"
                label="Section"
                type="text"
                defaultValue={updateData.section}
                variant="standard"
                onChange={(e) => {
                  studentData.section = e.target.value;
                }}
              />
            </DialogContent>
            <DialogActions>
              <MyButton
                value={"Submit"}
                variant="contained"
                color="primary"
                onClick={updateStudentData}
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
      )}
    </>
  );
}
