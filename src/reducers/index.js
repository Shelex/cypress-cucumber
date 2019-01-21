import { combineReducers } from 'redux';
import data from './data';
import filters from './filters';

export default combineReducers({
  data,
  filters,
});
