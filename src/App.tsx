import { refresh } from './utils';

const navBar = [
    { href: '/attachments/', text: 'Attachments' },
    { href: '/codes/', text: 'Codes' },
    { href: '/messages/', text: 'Messages' },
    { href: '/', text: 'Tasks' },
];

const App = ({ title }: { title: string }) => (
    <>
        <div className='nav'>
            {navBar.map(({ href, text }) => (
                <a key={href} href={title === text ? "#" : href} className='nav-link'>{text}</a>
            ))}
            <button className="nav-link" onClick={async () => refresh()}>Refresh</button>
        </div>
        
        <h1>{title}</h1>
    </>
);

export default App;
