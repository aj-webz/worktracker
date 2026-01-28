export interface todoInput
{
    id :string;
    work :string;
    completed :boolean;
}

export interface TodoStore
{
    works :todoInput[];
    addWork :(title :string)=> void;
    completeWork: (id :string) =>void;
    deleteWork: (id :string)=>void;
    error :null |string
}