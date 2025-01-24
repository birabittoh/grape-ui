import { useState, useEffect } from 'react'
import { Task } from '../types'
import { runDailies } from '../utils'
import App from '../App'

function Tasks() {
  const [dailies, setDailies] = useState<number>(0)
  const [today, setToday] = useState('true')
  const [card, setCard] = useState('')
  const [cards, setCards] = useState<string[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/sorter/tasks?today=${today}&card=${card}`)
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setDailies(data.length)

        if (cards.length === 0) {
          // populate cards
          const allCards = new Set<string>()
          data?.forEach((task: Task) => {
            allCards.add(task.card)
          })
          setCards(Array.from(allCards))
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        alert('Error fetching data: ' + error)
      })
      .finally(() => setLoading(false))
  }, [card, today, cards.length])

  return (
    <>
      <App title='Tasks' />
      <h2>
        You did {dailies} tasks today!
      </h2>
      <button onClick={async () => {
        if (await runDailies(0)) { // TODO: pass a configurable amount
          (document.querySelector('button') as HTMLButtonElement).disabled = true;
        }
      }}>Do them</button>
      <div className="card">
        <select value={card} onChange={e => setCard(e.target.value)}>
          <option value="">Tag</option>
          <optgroup>
            {cards.map(card => (
              <option value={card}>{card}</option>
            ))}
          </optgroup>
        </select>
        <select value={today} onChange={e => setToday(e.target.value)}>
          <option value=""></option>
          <optgroup>
            <option value="true">Today</option>
            <option value="false">All</option>
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
                  <th>Card</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.created_at}</td>
                    <td>{task.card}</td>
                    <td>{task.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks;
