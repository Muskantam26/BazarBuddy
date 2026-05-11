import React from 'react'
import { BiMailSend, BiPhone } from 'react-icons/bi'
import { MainContent } from '../../constants/constant/Maincontent'

const Header = () => {
  return (
    <div className='hidden lg:block'>
        <div className='flex justify-between p-4 text-[var(--text-color)] cursor-pointer font-medium text-md bg-[var(--white)]'>
            <div className='flex gap-2 text-[var(--text-color)]'>
              <div className='flex items-center gap-1'><BiPhone/><span>{MainContent.contactNo}</span></div>
              <div className='flex items-center gap-1'><BiMailSend/><span>{MainContent.email}</span></div>
            </div>
            <div>
                <select className='border border-gray-200 outline-none rounded px-3 py-1 cursor-pointer' name="language" id="language-select">
                    {MainContent.languages.map((lang, index) => (
                      <option key={index} value={lang.value}>{lang.name}</option>
                    ))}
                </select>
            </div>

        </div>
        <hr  className='border-[var(--border-color)]'/>
    </div>
  )
}

export default Header