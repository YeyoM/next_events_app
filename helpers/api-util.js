export default async function getAllEvents() {
  try {
    const response = await fetch('https://nextjs-course-yeyo-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()
    const events = []
    for (const key in data) {
      events.push({
        id: key,
        ...data[key]
      })
    }
    return events
  } catch (e) {
    console.log(e)
    return null
  }
}

export default function getFeaturedEvents() {
  try {
    const allEvents = await getAllEvents()
    return allEvents.filter(event => event.isFeatured)
  } catch (e) {
    console.log(e)
    return null
  }
}