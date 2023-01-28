import React from 'react'
import Reminders from '../components/Reminders'
import MediaList from '../components/MediaList'
import ReminderForm from '../components/ReminderForm'
import Photos from '../components/Photos'

function HomePage() {
  return (
    <div className='bg-secondary'>
        <MediaList/>
        <ReminderForm/>
        <hr class="w-50 mx-auto my-5"/>
        <Reminders/>
        <hr class="w-50 mx-auto mb-5"/>
        <Photos/>
    </div>
  )
}

export default HomePage