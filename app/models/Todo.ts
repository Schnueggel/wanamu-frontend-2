
export class Todo implements wu.model.view.ITodoView {
    editDescription: boolean = false;
    editColor: boolean = false;
    editTitle: boolean = false;
    _id: string;
    todolistId: string;
    title: string;
    description: string;
    order: number;
    finished: boolean = false;
    deletedAt: string;
    updatedAt: string;
    createdAt: string;
    color: string = 'color1';
    
    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
