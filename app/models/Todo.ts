
export class Todo implements wu.model.data.ITodo {
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
};
