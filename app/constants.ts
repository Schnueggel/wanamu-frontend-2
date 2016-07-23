
export enum AppStates {
    Ready, Error, Booting
}

export const LocalStorage = {
    token: 'token'
};

export class VisibleTodos {
    static All      = 'all';
    static Finished = 'finished';
    static Open     = 'open';
}

export const VisibleTodosValues = [VisibleTodos.All, VisibleTodos.Finished, VisibleTodos.Open];

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

export const salutationOptions = [
    {id: Salutations.Mr, name: Salutations.Mr},
    {id: Salutations.Mrs, name: Salutations.Mrs},
    {id: Salutations.Human, name: Salutations.Human},
    {id: Salutations.Neutrum, name: Salutations.Neutrum}
];

export const Menus = {
    /**
     * Menu items for authed user
     * @type {{text: string, url: string}[]}
     */
    authMenuItems:[
        {text: 'Home', url: '/'},
        {text: 'TodoList', url: '/todolist'},
        {text: 'Friends', url: '/friends'},
        {text: 'Logout', url: '/logout'}
    ],
    /**
     * Menu Items for non authed users
     * @type {{text: string, url: string}[]}
     */
    noAuthMenuItems:[
        {text: 'Home', url: '/'},
        {text: 'Login', url: '/login'},
        {text: 'Register', url: '/register'}
    ]
};

export const ValidationPatterns = {
    email: /[^ @]*@[^ @]+/,
    minLength: (length=1) => new RegExp(`(.+){${length},}`)
};

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
