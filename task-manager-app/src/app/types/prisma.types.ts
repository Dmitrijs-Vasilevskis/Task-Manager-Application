export interface RecordInterface {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    userId: string;
    tags: string[];
}

export interface TagInterface {
    id: string;
    title: string;
    value: string;
}