import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import moment from 'moment'
import {client} from "../../api/client";


// ---- variable initiale du slice
const initialState = {
    results : [],
    slider: [],
    favoris: [],
    query : {
        camera: 'FHAZ',
        rover: 'curiosity',
        page: 1
    },
    historique:[],
    status: 'idle',
};
// ----

// ---- slider en fonction de la date d'aujourd'hui
export const querySlider = createAsyncThunk('documents/querySlider',
async () => {
    const date = Date();
    const response = await client.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&earth_date=2020-01-01');
    //const response = await client.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&earth_date='+moment(date).format('YYYY-MM-DD'));
    return response.photos;
});
// ----

// ---- récupération de la recherche
export const queryIndex = createAsyncThunk('documents/queryIndex',
async query => {
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'+query.rover+'/photos?&sol=1000&api_key=qrFZwKfJVze4cr7BlBaPyp85UwTan2HJRflJP0EK&page='+query.page+'&camera='+query.camera;
    const response = await client.get(url);
    return {response:response.photos, query:query};
});
// ----

// ---- Slice nasa
const nasaSlice = createSlice({
    name: 'nasa',
    initialState,
    reducers:{
        nasaFavoris(state, action){
            state.favoris = action.payload.favoris;
        },
        nasaHistorique(state, action){
            state.historique.push(action.payload.historique);
        }
    },
    extraReducers: {
        [queryIndex.rejected]: (state, action) => {
            state.status = 'error';
        },
        [queryIndex.pending]: (state, action) => {
            state.status = 'loading';
        },
        [queryIndex.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.results = action.payload.response;
            state.query = action.payload.query;
        },
        [querySlider.fulfilled]: (state, action) => {
            state.slider = action.payload;
        }
    }
})
// ----

// ---- export de toute les variables
export const { nasaFavoris, nasaHistorique } = nasaSlice.actions;
export const selectNasaFavoris = state => state.nasa.favoris;
export const selectNasaHistorique = state => state.nasa.historique;
export const selectNasaSlider = state => state.nasa.slider;
export const selectNasaResults = state => state.nasa.results;
export const selectNasaQuery = state => state.nasa.query;
export const stateQuery = state => state.nasa.status;
export default nasaSlice.reducer;
// ----
