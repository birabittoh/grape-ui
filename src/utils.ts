import { Attachment, Code } from "./types";

export function getAmount(attachment: Attachment): number {
    return attachment.codes?.reduce((acc, code) => acc + code.value, 0) ?? 0;
}

export function getWebsites(attachment: Attachment): string {
    const websites = attachment.codes?.map(code => code.website) ?? [];
    return Array.from(new Set(websites)).join(', ');
}

export function isDone(attachment: Attachment): boolean {
    return attachment.codes?.every(code => code.done) ?? false;
}

export async function claimCodes(codes: Code[], tag: string | undefined): Promise<boolean> {
    if (!tag) {
        return false;
    }

    const payload = codes.map(code => {return {...code, tag}})
    return fetch('/api/dumper/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.ok)
    .catch(() => false);
}

export async function runDailies(amount: number = 0): Promise<boolean> {
    return fetch(`/api/charger?amount=${amount}`)
    .then(response => response.ok)
    .catch(() => false);
}

export async function changeTag(id: number, tag: string): Promise<boolean> {
    return fetch(`/api/sorter/attachments/${id}`, {
        method: 'POST',
        body: new URLSearchParams({ tag })
    })
    .then(response => response.ok)
    .catch(() => false);
}
