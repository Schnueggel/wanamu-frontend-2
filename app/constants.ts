
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

export enum UserNameCheck {
    Valid, Invalid, Unkown
}

export const Salutations = {
    Mr: 'Mr',
    Mrs: 'Mrs',
    Human: 'Human',
    Neutrum: 'Neutrum'
};
export const Colors = {
    color1: 1,
    color2: 2,
    color3: 3,
    color4: 4,
    color5: 5
};

export const salutionOptions = [
    {id: Salutations.Mr, name: Salutations.Mr},
    {id: Salutations.Mrs, name: Salutations.Mrs},
    {id: Salutations.Human, name: Salutations.Human},
    {id: Salutations.Neutrum, name: Salutations.Neutrum}
];

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
