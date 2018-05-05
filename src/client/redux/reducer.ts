import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form'
// import usersReducer, {moduleName as usersModule} from '../ducks/users'

export default combineReducers({
    router,
    form
});