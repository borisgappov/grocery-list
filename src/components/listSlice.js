import { createSlice } from '@reduxjs/toolkit';
import { getRandomGroceryList, sort } from '../shared/utils';

const savedState = localStorage['reduxState'] && JSON.parse(localStorage['reduxState']);

const initialState = savedState && savedState.list
  ? savedState.list
  : {
    items: getRandomGroceryList(25),
    filter: 0,
    history: {}
  };

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    append: (state, action) => {
      state.items = sort([...state.items, action.payload]);
    },
    set: (state, action) => {
      state.items = sort(action.payload);
    },
    remove: (state, action) => {
      state.items = [...state.items.filter(e => e.id !== action.payload.id)];
    },
    setStatus: (state, action) => {
      const { item, ranOut } = action.payload;
      let selected = state.items.find(e => e.id === item.id);
      if (selected) {
        selected.ranOut = ranOut;
        state.items = sort(state.items);
        saveHistory(state, selected, ranOut);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    update: (state, action) => {
      const item = action.payload;
      let selected = state.items.find(e => e.id === item.id);
      if (selected) {
        if(item.ranOut != selected.ranOut) saveHistory(state, selected, item.ranOut);
        Object.assign(selected, item);
        state.items = sort(state.items);
      }
    },
  },
});

const saveHistory = (state, item, ranOut) => {
  let history = state.history[item.id];
  if(!history) history = [];
  history.push({ date: new Date().toDateString(), value: ranOut});
  state.history[item.id] = history;
}

export const { append, remove, set, setStatus, setFilter, update } = listSlice.actions;

export const selectItems = (state) => state.list.items;

export const selectFilter = (state) => state.list.filter;

export const selectHistory = (state) => state.list.history;

export default listSlice.reducer;
