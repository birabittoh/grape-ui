import { useState, useEffect } from 'react'
import '../App.css'
import { Code } from '../types'
import { formatBool } from '../common'
import { claimCodes } from '../utils'

function Codes() {
  const [codes, setCodes] = useState<Code[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState('')
  const [done, setDone] = useState('false')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/sorter/codes?tag=${tag}&done=${done}`)
      .then(response => response.json())
      .then(data => {
        setCodes(data);

        // populate tags
        const allTags = new Set<string>()
        data.forEach((code: Code) => {
          if (code.attachment) {
            allTags.add(code.attachment.tag)
          }
        })
        setTags(Array.from(allTags))
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false))
  }, [tag, done])

  return (
    <>
      <h1>Codes</h1>
      <a href='/'>Dashboard</a><br />
      <a href='/attachments/'>Attachments</a>
      <div className="card">
        <select value={tag} onChange={e => setTag(e.target.value)}>
          <option value="">Tag</option>
          <optgroup>
            {tags.map(tag => (
              <option value={tag}>{tag}</option>
            ))}
          </optgroup>
        </select>
        <select value={done} onChange={e => setDone(e.target.value)}>
          <option value=""></option>
          <optgroup>
            <option value="true">Done</option>
            <option value="false">Not done</option>
          </optgroup>
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Value</th>
                <th>Website</th>
                <th>Tag</th>
                <th>Done</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map(code => (
                <tr key={code.ID}>
                  <td>{code.value}</td>
                  <td>{code.website}</td>
                  <td>{code.attachment?.tag}</td>
                  <td>{formatBool(code.done)}</td>
                  <td>
                    {!code.done && (
                      <a href='#' onClick={async (e) => { e.preventDefault(); await claimCodes([code], code.attachment?.tag) }}>Claim</a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Codes;
