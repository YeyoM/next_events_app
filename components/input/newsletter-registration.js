import classes from './newsletter-registration.module.css';
import { useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'

export default function NewsletterRegistration() {

  const notificationCtx = useContext(NotificationContext)

  const [ email, setEmail ] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  function registrationHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: 'Signing Up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    })

    const reqBody = {
      email: email
    }

    fetch('/api/newsletter-registration', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok) { 
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      })
    }).then(data => {
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter.',
        status: 'success'
      })
      setEmail('')
      console.log(data)
    }).catch((e) => {
      notificationCtx.showNotification({
        title: 'Oops, something went wrong!',
        message: e.message || 'Try again later',
        status: 'error'
      })
      console.log(e)
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            value={email}
            onChange={handleEmailChange}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
