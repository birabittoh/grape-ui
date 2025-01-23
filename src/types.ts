export interface Code {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    code: string;
    value: number;
    website: string;
    done: boolean;

    attachment: Attachment | null;
}

export interface Attachment {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    tag: string;
    filename: string;
    
    codes: Code[] | null;
}

export interface Task {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    card: string;
    amount: number;
}

export interface Message {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    from: string;
    to: string;
    content: string;
}
