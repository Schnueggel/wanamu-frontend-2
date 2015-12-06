import { Record } from 'immutable';

/**
 * Lookup class for salutatubs
 */
export const salutations = [
    {id: Salutation.Mr, name: 'Mr.'},
    {id: Salutation.Mrs, name: 'Mrs.'},
    {id: Salutation.Human, name: 'Human'},
    {id: Salutation.Neutrum, name: 'Neutrum'}
];

export class Salutation {
    static Mr = 'mr';
    static Mrs = 'mrs';
    static Neutrum = 'neutrum';
    static Human = 'human';
}

export const recordDefault: wu.model.data.IProfileData = {
    id : -1,
    firstname : '',
    lastname : '',
    face : null,
    salutation : 'mr'
};

/**
 *
 * @type {Record.Class|Record.Factory<wu.model.data.IProfileClass>|any}
 */
export const Profile = Record<wu.model.data.IProfileClass>(recordDefault, 'Profile');
