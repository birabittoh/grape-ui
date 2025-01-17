import { useState, useEffect } from 'react'
import '../App.css'
import { Attachment } from '../types'
import { formatBool } from '../common'
import { getAmount, getWebsites, isDone } from '../utils'

function Attachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState('')
  const [done, setDone] = useState('false')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/attachments?tag=${tag}&done=${done}`)
      .then(response => response.json())
      .then(data => {
        setAttachments(data)

        if (tags.length === 0) {
          // populate tags
          const allTags = new Set<string>()
          data.forEach((attachment: Attachment) => {
            allTags.add(attachment.tag)
          })
          setTags(Array.from(allTags))
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
      .finally(() => setLoading(false))
  }, [tag, tags, done])

  return (
    <>
      <h1>Attachments</h1>
      <a href='/'>Dashboard</a><br />
      <a href='/codes/'>Codes</a>
      <div className="card">
        <select value={tag} onChange={e => setTag(e.target.value)}>
          <option value="">Tag</option>
          <optgroup>
            {tags.map(tag => (
              <option value={tag} key={tag}>{tag}</option>
            ))}
          </optgroup>
        </select>
        <select value={done} onChange={e => setDone(e.target.value)}>
          <option value="">Done</option>
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
                <th>ID</th>
                <th>Amount</th>
                <th>Website</th>
                <th>Tag</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {attachments?.map(attachment => (
                <tr key={attachment.ID}>
                  <td>{attachment.ID}</td>
                  <td>{getAmount(attachment)}</td>
                  <td>{getWebsites(attachment)}</td>
                  <td>{attachment?.tag}</td>
                  <td>{formatBool(isDone(attachment))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Attachments;
