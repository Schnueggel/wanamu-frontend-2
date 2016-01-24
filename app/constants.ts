
export enum AppStates {
    Ready, Error, Booting
}

export const LocalStorage = {
    token: 'token'
};

export class VisibleTodos {
    static All      = 'All';
    static Finished = 'Finished';
    static Open     = 'Open';
}

export function defaultRequestOptions(token: string = null, method: string = 'POST') : RequestInit {
    const options = {
        method,
        headers    : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        } as any,
        credentials: 'include',
        mode       : 'cors'
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    return options;
}
