import './App.css'

const navBar = [
    { href: '/attachments/', text: 'Attachments' },
    { href: '/codes/', text: 'Codes' },
    { href: '/messages/', text: 'Messages' },
    { href: '/', text: 'Tasks' },
];

const App = ({ title }: { title: string }) => (
    <>
        {navBar.map(({ href, text }) => (
            <a key={href} href={title === text ? "#" : href} className='nav-link'>{text}</a>
        ))}
        
        <h1>{title}</h1>
    </>
);

export default App;
