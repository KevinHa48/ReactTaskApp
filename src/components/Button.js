import PropTypes from 'prop-types'

// Note the de-structuring...
const Button = ({ color, text, onClick }) => {
    return (
        <button
        onClick = { onClick } 
        style = {{ backgroundColor: color }}
        className = 'btn'>
            { text }
        </button>
    )
}
// Set a default prop for the button
Button.defaultProps = {
    color: 'black'
}

// Enforce type-checking
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}


export default Button