import * as Actions from '../actions/index';
import { Set } from 'immutable';

const initialState: wu.IFriendsState = {
    friends: [],
    error: null,
    deleteError: null,
    isLoading: false,
    isAdding: false,
    isFriendPopupVisible: false,
    friendsDeleting: Set() as Immutable.Set<string>
};

export function friends(state = initialState, action: any) {
    const {friends, error} = action;

    switch (action.type) {
        case Actions.ACTION_FRIEND_ADD_REQUEST:
            return Object.assign({}, state, {isAdding: true});
        case Actions.ACTION_FRIEND_ADDED:
            return Object.assign({}, state, {isAdding: false});
        case Actions.ACTION_FRIEND_ADD_ERROR:
            return Object.assign({}, state, {isAdding: false, error});
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
        case Actions.ACTION_HIDE_POPUP:
        case Actions.ACTION_SHOW_POPUP:
            return Object.assign({}, state, {isFriendPopupVisible: action.type === Actions.ACTION_SHOW_POPUP});
        default:
            return state;
    }
}
