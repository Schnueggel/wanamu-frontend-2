const initalState = {
    error: null
};

export function login(state = initalState, action: any) {
    const { type, error } = action;

    if (type === 'loginError') {
        return Object.assign({}, state, {error});
    }

    return state;
}
