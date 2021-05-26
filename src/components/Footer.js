import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer>
            <p>A simple to-do UI made using React</p>
            <Link to = '/about'>About</Link>
        </footer>
    )
}

export default Footer