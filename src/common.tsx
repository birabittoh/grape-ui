import { Attachment } from "./types"
import { changeTag } from "./utils"

export function formatBool(value: boolean): JSX.Element {
    return <input type="checkbox" checked={value} disabled />
}

export function formatAttachmentTag(attachment: Attachment, tags: string[]): JSX.Element {
    return <select value={attachment.tag} onChange={async e => await changeTag(attachment.id, e.target.value) ? alert('Success!') : alert('Error...')}>
            {tags.map(tag => (
                <option value={tag}>{tag}</option>
            ))}
    </select>
}

export function formatDate(date: string): JSX.Element {
    return <>{new Date(date).toLocaleString()}</>
}
