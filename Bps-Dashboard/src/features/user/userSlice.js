import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { AUTH_API, FILES_BASE_URL } from '../../utils/api';

const BASE_URL = AUTH_API;

export const createUsers = createAsyncThunk(
    'createUser/user', async (data, thunkApi) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            }
            const res = await axios.post(`${BASE_URL}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return res.data.message
        }
        catch (err) {
            console.log(err.response?.data?.message)
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to create the user');
        }
    }
)

export const deleteUser = createAsyncThunk(
    'deleteUser/user', async (adminId, thunkApi) => {
        try {
            const res = await axios.delete(`${BASE_URL}/admin/user/${adminId}`)
            return adminId;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to delete the user')
        }
    }
)
export const updateUser = createAsyncThunk(
    'updateUser/user', async ({ adminId, data }, thunkApi) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/admin/user/${adminId}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data.message;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || err.message);
        }
    }

)
export const viewUserById = createAsyncThunk(
    'viewUserById/user', async (adminId, thunkApi) => {
        try {

            const res = await axios.get(`${BASE_URL}/admin/user/${adminId}`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to view user');
        }
    }
)

export const blacklistedCount = createAsyncThunk(
    'blacklistedCount/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/count/blacklisted-supervisors`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch count');
        }
    }
)
export const blacklistedList = createAsyncThunk(
    'blacklistedList/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/supervisors/blacklisted`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch count');
        }
    }
)
export const deactivatedCount = createAsyncThunk(
    'deactivatedCount/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/count/deactivated-supervisors`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch count');
        }
    }
)
export const deactivatedList = createAsyncThunk(
    'deactivatedList/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/supervisors/deactivated`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch count');
        }
    }
)

export const adminCount = createAsyncThunk(
    'adminCount/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/count/admins`)
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch admin Count');
        }
    }
)
export const adminList = createAsyncThunk(
    'adminList/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/admins`)
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to fetch data')
        }

    }

)
export const activeSupervisorCount = createAsyncThunk(
    'activeCount/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/count/supervisors`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'failed to fetch the data')
        }
    }
)
export const activeList = createAsyncThunk(
    'activeList/user', async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/supervisors`);
            return res.data.message;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'failed to fetch the data');
        }
    }
)
export const updateStatus = createAsyncThunk(
    'updateStus/user', async ({ adminId, action }, thunkApi) => {
        try {
            const res = await axios.patch(`${BASE_URL}/update-status/${adminId}/${action}`);
            return res.data.message
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || 'Failed to update Status');
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({ oldpassword, newPassword }, thunkApi) => {
        try {
            const response = await axios.post(`${BASE_URL}/changePassword`, {
                oldpassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data.message;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || 'Failed to change password');
        }
    }
);

const initialState = {
    list: [],
    blackCount: 0,
    deactivatedcount: 0,
    admincount: 0,
    activeCounts: 0,
    form: {
        firstName: "",
        middleName: "",
        lastName: "",
        startStation: "",
        emailId: "",
        password: "",
        contactNumber: "",
        address: "",
        distinct: "",
        state: "",
        city: "",
        pinCode: "",
        idProof: "",
        idProofPhoto: null,
        adminProfilePhoto: null,
    },
    status: 'idle',
    error: null,
    viewedUser: null,
    loading: false,
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:
    {
        setFormField: (state, action) => {
            const { field, value } = action.payload;
            state.form[field] = value;
        },
        resetForm: (state) => {
            state.form = initialState.form;
        },
        adduser: (state, action) => {
            state.list.push(action.payload);
        },
        setUser: (state, action) => {
            state.list = action.payload;
        },
        clearViewedUser: (state) => {
            state.viewedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUsers.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(user => user.adminId !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(viewUserById.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(viewUserById.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload;
                state.form = {
                    firstName: payload.firstName || '',
                    middleName: payload.middleName || '',
                    lastName: payload.lastName || '',
                    contactNumber: payload.contactNumber || '',
                    emailId: payload.emailId || '',
                    address: payload.address || '',
                    state: payload.state || '',
                    city: payload.city || '',
                    distinct: payload.distinct || '',
                    pincode: payload.pincode || '',
                    idProof: payload.idProof || '',
                    startStation: payload.startStation || '',
                    idPhoto: payload.idProofPhoto
                        ? `${FILES_BASE_URL}/${payload.idProofPhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
                        : null,
                    adminPhoto: payload.adminProfilePhoto
                        ? `${FILES_BASE_URL}/${payload.adminProfilePhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
                        : null
                };

            })
            .addCase(viewUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.error = null;
                const updatedUser = action.payload
                state.list = state.list.map(user =>
                    user.adminId === updatedUser.adminId ? updatedUser : user
                );

                // Update viewed customer if it's the same one
                if (state.viewedUser?.adminId === updatedUser.adminId) {
                    state.viewedUser = updatedUser;
                }

                // Update form fields
                const payload = action.payload;
                state.form = {
                    firstName: payload.firstName || '',
                    middleName: payload.middleName || '',
                    lastName: payload.lastName || '',
                    contactNumber: payload.contactNumber || '',
                    emailId: payload.emailId || '',
                    address: payload.address || '',
                    state: payload.state || '',
                    city: payload.city || '',
                    distinct: payload.distinct || '',
                    startStation: payload.startStation || '',
                    pincode: payload.pincode || '',
                    idProof: payload.idProof || '',
                    idPhoto: payload.idProofPhoto
                        ? `${FILES_BASE_URL}/${payload.idProofPhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
                        : null,
                    adminPhoto: payload.adminProfilePhoto
                        ? `${FILES_BASE_URL}/${payload.adminProfilePhoto.replace(/\\/g, '/').replace(/^\/+/g, '')}`
                        : null
                };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(blacklistedCount.fulfilled, (state, action) => {
                state.loading = false;
                state.blackCount = action.payload
            })
            .addCase(blacklistedList.fulfilled, (state, action) => {
                state.loading = true;
                state.list = action.payload
            })
            .addCase(deactivatedCount.fulfilled, (state, action) => {
                state.loading = true;
                state.deactivatedcount = action.payload
            })
            .addCase(deactivatedList.fulfilled, (state, action) => {
                state.loading = true;
                state.list = action.payload;
            })
            .addCase(adminCount.fulfilled, (state, action) => {
                state.loading = false;
                state.admincount = action.payload;
            })
            .addCase(adminList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(activeSupervisorCount.fulfilled, (state, action) => {
                state.loading = false;
                state.activeCounts = action.payload;
            })
            .addCase(activeList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                const index = state.list.findIndex(u => u._id === updatedUser._id);
                if (index !== -1) {
                    state.list[index] = updateUser;
                }
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'Password changed successfully';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            ;
    }

}
)
export const {
    setFormField,
    resetForm,
    addUser,
    setUser,
    clearViewedUser
} = userSlice.actions;

export default userSlice.reducer;