import * as React from "react";
import toastr from "toastr";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, Grid, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Todo(props) {
  function toggleIsComplete(title) {
    const newTodos = [...props.todos];
    const todo = newTodos.find((todo) => todo.title === title);
    todo.isComplete = !todo.isComplete;
    props.setTodos(newTodos);
  }

  function updateTodo(title) {
    props.setIsAdd(false);
    props.setOpenDialog(true);
    const newTodos = [...props.todos];
    const todo = newTodos.find((todo) => todo.title === title);
    props.setForm(todo);
  }

  function deleteTodo(title) {
    const newTodos = props.todos.filter((todo) => todo.title !== title);
    props.setTodos(newTodos);
    toastr.success(`Task Deleted Successfully!`, ``, {
      closeButton: true,
      positionClass: "toast-bottom-right"
    });
  }
  return (
    <TableRow key={props.title}>
      <TableCell align="center" sx={{ flexWrap: "wrap" }}>
        {props.title}
      </TableCell>
      <TableCell align="center">{props.description}</TableCell>
      <TableCell align="center">
        {new Date(props.deadline).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell align="center">{props.priority}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={props.isComplete}
          onChange={() => toggleIsComplete(props.title)}
        />
      </TableCell>
      <TableCell align="center">
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          {!props.isComplete && (
            <Button
              variant="contained"
              sx={{ width: "40%" }}
              onClick={() => updateTodo(props.title)}
            >
              <EditIcon fontSize="small" /> UPDATE
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            sx={{ width: "40%" }}
            onClick={() => deleteTodo(props.title)}
          >
            <CancelIcon fontSize="small" /> DELETE
          </Button>
        </Grid>
      </TableCell>
    </TableRow>
  );
}
