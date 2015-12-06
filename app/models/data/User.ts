import { Setting } from 'models/data/Setting';
import { Profile } from 'models/data/Profile';
import { Record } from 'immutable';

export const recordDefault: wu.model.data.IUserClass = {
    id: -1,
    email: '',
    password: '',
    Setting: new Setting(),
    Profile : new Profile(),
    DefaultTodoListId : -1
};

export const User = Record<wu.model.data.IUserClass>(recordDefault, 'User');