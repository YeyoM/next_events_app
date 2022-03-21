import classes from './newsletter-registration.module.css';
import { useState } from 'react'

export default function NewsletterRegistration() {

  const [ email, setEmail ] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const reqBody = {
      email: email
    }

    // validation here...

    fetch('/api/newsletter-registration', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
    })

    // a success or error message here
    setEmail('')


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
