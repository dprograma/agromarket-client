import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//perform asynchronous api fetch for initial get request to backend server
export const home = createAsyncThunk("auth/home", 
async ({ rejectWithValue }) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/initialize-request/", {
      method: "GET",
    });

    const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
  }catch (error){
    return rejectWithValue(error.message);  }
}
);

// perform asynchronous api fetch for signin
export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);


// perform asynchronous fetch for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch for image upload
export const updateImage = createAsyncThunk(
  "auth/updateImage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/profile/", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${credentials.accesstoken}`},
        body: credentials.formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch to update user password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/profile/", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${credentials.access_token}`},
        body: credentials,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch update user Bio Data
export const updateBio = createAsyncThunk(
  "auth/updateBio",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/profile/", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${credentials.access_token}`},
        body: credentials,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);


// perform asynchronous fetch for confirm
export const confirm = createAsyncThunk(
  "auth/confirm",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/activate/${credentials.uid}/${credentials.token}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch for confirm
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (credentials, { rejectWithValue }) => {
    console.log("GET USER CREDENTIALS: ", credentials)
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/getuser/",
        {
          method: "GET",
          headers: { "Authorization": `Bearer ${credentials}` },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch for forgotpassword
export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);


// perform asynchronous api fetch for resetpassword
export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.response || "Unknown error");
      }

      return data;
    } catch (error) {
      // Display error alert
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
      return rejectWithValue(error.message);
    }
  }
);

// perform asynchronous fetch for logout
export const logout = createAsyncThunk("auth/logout", async (credentials) => {
  const response = await fetch("http://127.0.0.1:8000/api/v1/signout/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${credentials}` },
  });

  const data = await response.json();
  if (response.ok) {
    return data
  } else {
    console.error("errors encountered: ", response);
    // return Promise.reject(data)
  }
});

const initialState = {
  isAuthenticated: false,
  status: "idle",
  access_token: "",
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    // signin operation
    builder.addCase(signin.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.status = "succeeded!";
    });
    builder.addCase(signin.rejected, (state) => {
      state.status = "failed!";
    });
    builder.addCase(signin.pending, (state) => {
      state.status = "loading!";
    });
    // signup operation
    builder.addCase(signup.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.status = "succeeded!";
    });
    builder.addCase(signup.rejected, (state) => {
      state.status = "failed!";
    });
    builder.addCase(signup.pending, (state) => {
      state.status = "loading!";
    });
    // forgotpassword operation
    builder.addCase(forgotpassword.fulfilled, (state) => {
      state.status = "succeeded!";
    });
    builder.addCase(forgotpassword.rejected, (state) => {
      state.status = "failed!";
    });
    builder.addCase(forgotpassword.pending, (state) => {
      state.status = "loading!";
    });
    // logout operation
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.status = "succeeded!";
    });
    builder.addCase(logout.rejected, (state) => {
      state.status = "failed!";
    });
    builder.addCase(logout.pending, (state) => {
      state.status = "loading!";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setAccessToken, resetAuthState } = authSlice.actions

export default authSlice.reducer;
