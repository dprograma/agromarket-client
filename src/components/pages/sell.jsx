import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PostAd = () => {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mb-5">
        <h3>Post Ad</h3>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <form
            action=""
            className="post-ad align-self-center border p-3 rounded-0"
          >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="Livestock">Livestock</MenuItem>
                  <MenuItem value="Poultry">Poultry</MenuItem>
                  <MenuItem value="Timber">Timber</MenuItem>
                  <MenuItem value="Vegetables">Vegetables</MenuItem>
                  <MenuItem value="Fruits">Fruits</MenuItem>
                  <MenuItem value="Tubers">Tubers</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAd;
