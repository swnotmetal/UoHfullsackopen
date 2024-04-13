import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)
  const style = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    textAlign: 'center',
    display: notification ? 'block': 'none'
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
