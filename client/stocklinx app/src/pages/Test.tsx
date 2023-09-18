import SubmissionForm from "../forms/SubmissionForm";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./test.scss";
import { useState } from "react";

const Test = () => {
  const [value, setValue] = useState("");

  return (
    // <SubmissionForm />

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setValue(e.target.value)} defaultValue={null} onClick={() => console.log(value)} />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
};

export default Test;
