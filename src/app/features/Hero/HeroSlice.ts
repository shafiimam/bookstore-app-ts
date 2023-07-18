import { createSlice } from '@reduxjs/toolkit';

type IHeroState {
  isMounted: Boolean
}

const initialState: IHeroState = {
  isMounted: false
}


const heroSlice = createSlice({
  initialState,
  reducers:{},
  
});
