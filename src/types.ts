export interface Code {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;

    code: string;
    value: number;
    website: string;
    done: boolean;

    attachment: Attachment | null;
}

export interface Attachment {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;

    tag: string;
    filename: string;
    
    codes: Code[] | null;
}
