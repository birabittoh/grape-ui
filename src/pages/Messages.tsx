import { useState, useEffect } from 'react'
import { Message } from '../types'
import { formatDate } from '../common'
import App from '../App'

function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/sorter/messages?to=${to}`)
      .then(response => response.json())
      .then(data => {
        setMessages(data);

        // populate tags
        const allTags = new Set<string>()
        data?.forEach((message: Message) => {
            allTags.add(message.to)
        })
        setTags(Array.from(allTags))
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        alert('Error fetching data: ' + error)
      })
      .finally(() => setLoading(false))
  }, [to])

  return (
    <>
      <App title='Messages' />
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option value="">To</option>
          <optgroup>
            {tags.map(tag => (
              <option value={tag}>{tag}</option>
            ))}
          </optgroup>
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='responsive-table'>
            <table>
              <thead>
                <tr>
                  <th>Created</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(message => (
                  <tr key={message.id}>
                    <td>{formatDate(message.created_at)}</td>
                    <td>{message.from}</td>
                    <td>{message.to}</td>
                    <td>{message.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  )
}

export default Messages;
