import * as Actions from '../actions/index';
import { Set } from 'immutable';

const initialState = {
    friends: [],
    error: null,
    deleteError: null,
    isLoading: false,
    friendsDeleting: Set() as Immutable.Set<string>
};

export function friends(state = initialState, action: any) {
    const {friends, error} = action;

    switch (action.type) {
        case Actions.ACTION_FRIENDLIST_LOADED:
            return Object.assign({}, state, {friends, isLoading: false});
        case Actions.ACTION_FRIENDLIST_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case Actions.ACTION_FRIENDLIST_REQUEST:
            return Object.assign({}, state, {isLoading: true});
        case Actions.ACTION_FRIEND_DELETE_REQUEST:
            return Object.assign({}, state, {friendsDeleting: state.friendsDeleting.add(action.friend._id), deleteError: null});
        case Actions.ACTION_FRIEND_DELETED:
            return Object.assign({}, state, {friendsDeleting: state.friendsDeleting.delete(action.friend._id)});
        case Actions.ACTION_FRIEND_DELETE_ERROR:
            return Object.assign({}, state, {friendsDeleting: state.friendsDeleting.delete(action.friend._id), deleteError: error});
        default:
            return state;
    }
}
