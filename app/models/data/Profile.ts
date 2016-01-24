import { Record } from 'immutable';

export class Salutation {
    static Mr = 'Mr';
    static Mrs = 'Mrs';
    static Neutrum = 'Neutrum';
    static Human = 'Human';
}

/**
 * Lookup class for salutatubs
 */
export const salutations = [
    {id: Salutation.Mr, name: 'Mr'},
    {id: Salutation.Mrs, name: 'Mrs'},
    {id: Salutation.Human, name: 'Human'},
    {id: Salutation.Neutrum, name: 'Neutrum'}
];

export const recordDefault: wu.model.data.IProfileClass = {
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
