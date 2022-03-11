export async function getAllEvents() {
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

export async function getFeaturedEvents() {
  try {
    const allEvents = await getAllEvents()
    return allEvents.filter(event => event.isFeatured)
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getEventById(id) {
  try {
    const allEvents = await getAllEvents()
    return allEvents.find(event => event.id === id)
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getFilteredEvents(dateFilter) {
  try {
    const { year, month } = dateFilter
    const allEvents = await getAllEvents()
    let filteredEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    })
    return filteredEvents
  } catch (e) {
    console.log(e)
    return null
  }
}