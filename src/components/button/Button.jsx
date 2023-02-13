import './Button.css'

const Button = ({ title, onClick, color, type, style }) => {
  const styles = {
    border: `.1px solid ${color}`,
    color: `${color}`
  }

  return (
    <button className='Button' type={type} style={style || styles} onClick={onClick}>{title}</button>
  )
}

export default Button
