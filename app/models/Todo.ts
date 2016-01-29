
export class Todo {
    _id: string;
    todoListId: string;
    title: string;
    description: string;
    order: number;
    finished: boolean = false;
    deletedAt: string;
    updatedAt: string;
    createdAt: string;
    color: string = 'color1';
};