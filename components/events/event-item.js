import Link from 'next/Link'

export default function EventItem(props) {

  const {
    title,
    image,
    date,
    location,
    id
  } = props

  const humanRedableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedAdress = location.replace(', ', '\n')

  const exploreLink = `/events/${id}`

  return (
    <li>
      <img 
        src={'/' + image} 
        alt={title} 
      />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanRedableDate}</time>
          </div>
        </div>
        <div>
          <address>{formattedAdress}</address>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  )
}