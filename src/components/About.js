import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Following Traversy Media's tutorial</h4>
            <p>Covers basics of JSX, hooks, basic routing, REST APIs, and React Principles.</p>
            <Link to = '/'>Go back</Link>
        </div>
    )
}

export default About