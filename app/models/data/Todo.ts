import { BaseModel }  from './BaseModel';
import * as _ from 'lodash';
import { Dirty, Json } from 'models/decorators/decorators';
import * as moment from 'moment';
import * as Rx from 'rx';

export class Todo extends BaseModel implements wu.model.data.ITodo {

    private _id : number;
    private _TodoListId: number;
    private _title : string = '';
    private _alarm : string = null;
    private _alarmDate : Date = null;
    private _description : string = '';
    private _repeat : boolean = false;
    private _order : number = 1;
    private _color : string = null;
    private _finished : boolean = false;
    private _deletedAt : string = null;
    private _updatedOnClient : string;
    private _createdOnClient : string;
    private _repeatWeekly : string[] = [];
    private _repeatMonthly : string[] = [];
    private _repeatYearly :  string[] = [];

    constructor( data?: wu.model.data.ITodoData ) {
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        } else {
            this.createdOnClient = moment().format(BaseModel.defaultTimeFormat);
        }
    }

    /**
     * @param data
     */
    public fromJSON (data: wu.model.data.ITodoData) {
        var data = data || <wu.model.data.ITodoData>{};
        this._id = data.id;
        this._TodoListId = data.TodoListId;
        this._title = data.title || '';
        this._alarm = data.alarm || null;
        this._description = data.description || '';
        this._repeat = data.repeat || this._repeat;
        this._repeatWeekly =  data.repeatWeekly || [];
        this._repeatMonthly = data.repeatMonthly || [];
        this._repeatYearly =  data.repeatYearly || [];
        this._color = data.color;
        this._finished = data.finished === true;
        this._order = _.isNumber(data.order) ? data.order : this._order;
        this._deletedAt = data.deletedAt;

        if (this._alarm) {
            this._alarmDate = moment(this._alarm, BaseModel.defaultTimeFormat).toDate();
        }
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value : number) {
        console.warn('Field id is readonly');
    }

    @Dirty
    @Json
    public get TodoListId():number {
        return this._TodoListId;
    }

    public set TodoListId(value:number) {
        this._TodoListId = value;
    }

    @Dirty
    @Json
    public get title():string {
        return this._title;
    }
    public set title(value:string) {
        this._title = value;
    }

    @Dirty
    @Json
    public get alarm():string {
        return this._alarm;
    }

    public set alarm( value: string ) {
        if (value && value.length > 0 ){
            this._alarmDate = moment(value).toDate();
        }
        this._alarm = value;
    }

    @Dirty
    @Json
    public get description():string {
        return this._description;
    }


    public set description(value:string) {
        this._description = value;
    }

    @Dirty
    @Json
    public get repeat(): boolean {
        return this._repeat;
    }

    public set repeat(value: boolean) {
        this._repeat = value;
    }

    @Dirty
    @Json
    public get order():number {
        return this._order;
    }

    public set order(value:number) {
        this._order = value;
    }
    @Dirty
    @Json
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }
    @Dirty
    @Json
    public get deletedAt(): string {
        return this._deletedAt;
    }
    public set deletedAt(value: string) {
        this._deletedAt = value;
    }

    @Dirty
    @Json
    public get repeatWeekly(): string[] {
        return this._repeatWeekly;
    }

    public set repeatWeekly(value: string[]) {
        this._repeatWeekly = value;
    }
    @Dirty
    @Json
    public get repeatMonthly():string[] {
        return this._repeatMonthly;
    }

    public set repeatMonthly(value: string[]) {
        this._repeatMonthly = value;
    }
    @Dirty
    @Json
    public get repeatYearly():string[] {
        return this._repeatYearly;
    }

    public set repeatYearly(value: string[]) {
        this._repeatYearly = value;
    }

    @Json
    public get updatedOnClient():string {
        return this._updatedOnClient;
    }

    public set updatedOnClient(value: string) {
        this._updatedOnClient = value;
    }

    @Json
    public get createdOnClient(): string {
        return this._createdOnClient;
    }

    public set createdOnClient(value: string) {
        this._createdOnClient = value;
    }

    @Dirty
    @Json
    public get finished():boolean {
        return this._finished;
    }

    public set finished(value:boolean) {
        this._finished = value;
    }

    public get alarmDate():Date {
        return this._alarmDate;
    }

    public set alarmDate(value: Date) {
        if (value instanceof Date){
            this._alarm = moment(value).format(BaseModel.defaultTimeFormat);
        }
        this._alarmDate = value;
    }
}
