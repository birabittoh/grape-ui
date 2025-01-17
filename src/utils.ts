import { Attachment } from "./types";

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