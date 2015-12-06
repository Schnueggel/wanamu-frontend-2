import { Record } from 'immutable';

export const recordDefault: wu.model.data.ISettingData = {
    id : -1,
    color1:  'rgba(255, 223, 2, 0.8)',
    color2: 'rgba(0, 128, 0, 0.8)',
    color3: 'rgba(255, 0, 0, 0.8)',
    color4: 'rgba(0, 90, 255, 0.8)',
    color5: 'rgba(0, 0, 0, 0.8)'
};

export const Setting = Record<wu.model.data.ISettingClass>(recordDefault, 'Setting');
