import * as React from "react";
import toastr from "toastr";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import EditIcon from "@mui/icons-material/Edit";

const initialFormState = {
  title: "",
  description: "",
  deadline: new Date(),
  priority: "low",
  isComplete: false
};

export default function TodoDialog({
  form,
  setForm,
  openDialog,
  setOpenDialog,
  todos,
  setTodos,
  isAdd
}) {
  const [textTitle, setTextTitle] = useState("");
  const [validTitle, setValidTitle] = useState(true);
  const [textDescription, setTextDescription] = useState("");
  const [validDescription, setValidDescription] = useState(true);

  function cancel() {
    setForm(initialFormState);
    setValidTitle(true);
    setValidDescription(true);
    setTextTitle("");
    setTextDescription("");
    setOpenDialog(false);
  }

  function add() {
    if (isValidForm()) {
      setTodos([...todos, form]);
      toastr.success(`Task Added Successfully!`, ``, {
        positionClass: "toast-bottom-right",
        closeButton: true
      });
      cancel();
    }
  }

  function update() {
    if (isValidDescription()) {
      const newTodos = JSON.parse(JSON.stringify(todos));
      const index = newTodos.findIndex((todo) => todo.title === form.title);
      newTodos[index] = form;
      setTodos([...newTodos]);
      toastr.success(`Task Updated Successfully!`, ``, {
        positionClass: "toast-bottom-right",
        closeButton: true
      });
      cancel();
    }
  }

  function isValidForm() {
    const validTitle = isValidTitle();
    const validDescription = isValidDescription();

    return validTitle && validDescription;
  }

  function isValidTitle() {
    if (form.title === "") {
      setValidTitle(false);
      setTextTitle("Title is Required!");
      toastr.error(`Title is Empty!`, ``, {
        closeButton: true,
        positionClass: "toast-bottom-right"
      });
      return false;
    }

    if (todos.filter((todo) => todo.title === form.title).length > 0) {
      setValidTitle(false);
      setTextTitle("Title Already Exists!");
      toastr.error(`Title Already Exists!`, ``, {
        closeButton: true,
        positionClass: "toast-bottom-right"
      });
      return false;
    }

    setValidTitle(true);
    setTextTitle("");
    return true;
  }

  function isValidDescription() {
    if (form.description === "") {
      setValidDescription(false);
      setTextDescription("Description Is Required!");
      toastr.error(`Description Is Required!`, ``, {
        closeButton: true,
        positionClass: "toast-bottom-right"
      });
      return false;
    }
    setValidDescription(true);
    setTextDescription("");
    return true;
  }

  return (
    <Dialog open={openDialog}>
      <DialogTitle sx={{ bgcolor: "primary.dark", color: "white" }}>
        {isAdd ? <AddCircleIcon /> : <EditIcon fontSize="small" />}{" "}
        {isAdd ? "Add" : "Edit"} Task
      </DialogTitle>
      {/*content*/}
      <DialogContent>
        {isAdd && (
          <TextField
            fullWidth={true}
            sx={{ marginY: 3 }}
            error={!validTitle}
            id="title"
            label="Title"
            helperText={textTitle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        )}
        <TextField
          fullWidth={true}
          sx={{ marginY: 3 }}
          error={!validDescription}
          id="description"
          label="Description"
          helperText={textDescription}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Box sx={{ marginY: 3 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Deadline"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e })}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <FormControl sx={{ marginY: 3 }}>
          <FormLabel id="priority-radio-group">Priority</FormLabel>
          <RadioGroup
            row
            aria-labelledby="priority"
            name="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="med" control={<Radio />} label="Med" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={isAdd ? add : update} variant="contained">
          {isAdd ? (
            <AddCircleIcon fontSize="small" />
          ) : (
            <EditIcon fontSize="small" />
          )}
          {isAdd ? "ADD" : "EDIT"}
        </Button>
        <Button onClick={cancel} variant="contained" color="error">
          <DoDisturbIcon fontSize="small" />
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
