import HeaderTitle from '@/components/HeaderTitle'
import React from 'react'

const Settings = () => {
  return (
    <div>
      <HeaderTitle title="Settings"/>
      <div className="mt-5">
        <a 
          href="https://forms.office.com/e/fKEW4rxy1z?origin=lprLink" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-5 py-2 text-lg text-white bg-green-600 rounded hover:bg-green-700"
        >
          Give us your feedback
        </a>
      </div>
    </div>
  )
}

export default Settings