import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        name: '',
        email: '',
        password: '',
        token: '',
        image:''
    },
    reducers: {
        setUser(state, action) {
            const { _id, name, email, password, token,image } = action.payload
            state._id = _id
            state.name = name
            state.email = email
            state.password = password
            state.token = token
            state.image = image
        },
        clearUser(state) {
            state._id = ''
            state.name = ''
            state.email = ''
            state.password = ''
            state.msg = ''
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer