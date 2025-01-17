export function formatBool(value: boolean): JSX.Element {
    return <input type="checkbox" checked={value} disabled />
}