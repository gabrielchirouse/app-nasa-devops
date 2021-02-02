import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import moment from 'moment'
import {client} from "../../api/client";

const initialState = {
    results : [],
    slider: [],
    favoris: [],
    query : '',
    status: 'idle',
}

export const querySlider = createAsyncThunk('documents/querySlider',
    async () => {
        const date = Date()
        const response = await client.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&earth_date=2020-01-01')
        //const response = await client.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&earth_date='+moment(date).format('YYYY-MM-DD'))
        return response.photos
    })

export const queryIndex = createAsyncThunk('documents/queryIndex',
    async query => {
        const response = await client.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?&sol=1000&api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&page='+query)
        return response.photos
    })

const nasaSlice = createSlice({
    name: 'nasa',
    initialState,
    reducers:{
        nasaFavoris(state, action){
            state.favoris = action.payload.favoris
        }
    },
    extraReducers: {
        [queryIndex.rejected]: (state, action) => {
            state.status = 'error'
        },
        [queryIndex.pending]: (state, action) => {
            state.status = 'loading'
        },
        [queryIndex.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.results = action.payload
        },
        [querySlider.fulfilled]: (state, action) => {
            state.slider = action.payload
        }
    }
})

export const { nasaFavoris } = nasaSlice.actions
export const selectNasaFavoris = state => state.nasa.favoris
export const selectNasaSlider = state => state.nasa.slider
export const selectNasaInfos = state => state.nasa.results
export const stateQuery = state => state.nasa.status
export default nasaSlice.reducer
