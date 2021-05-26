import PropTypes from 'prop-types'
import Button from './Button.js'

const Header = ({ title, onAdd, showAdd }) => { 
    return (
        <header className = 'header'>
            <h1>{ title }</h1>
            <Button color = {showAdd ? 'red' : 'green'} 
            text = {showAdd ? 'Close' : 'Add'}
            onClick = {onAdd}/>

        </header>
    )
}

// Use propTypes to implement type-checking!
Header.propTypes = {
    title: PropTypes.string
    // title: PropTypes.string.isRequired for mandatory fields

}

// You can embed CSS in to JS:
// const headingStyle = {
//     Take note that React is camelCase instead of dashes.
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header