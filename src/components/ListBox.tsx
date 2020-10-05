import { Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import classNames from 'classnames'

export type ListBoxOption = {
  value: string
  text: string
}

export default function ListBox({
  label,
  options,
  selectedOption,
  setSelectedOption,
}: {
  label: string
  options: ListBoxOption[]
  selectedOption: ListBoxOption
  setSelectedOption: (option: ListBoxOption) => void
}) {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <div className='space-y-1'>
        <Listbox.Label className='block text-sm font-medium leading-5 text-gray-700'>
          {label}
        </Listbox.Label>
        <div className='relative'>
          <Listbox.Button as={Fragment}>
            <span className='inline-block w-full rounded-md shadow-sm'>
              <button
                type='button'
                aria-haspopup='listbox'
                aria-expanded='true'
                aria-labelledby='listbox-label'
                className='relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-orange focus:border-orange-300 sm:text-sm sm:leading-5'
              >
                <span className='block truncate'>
                  {
                    options.filter(
                      (option: ListBoxOption) =>
                        option.value === selectedOption.value
                    )[0].text
                  }
                </span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path
                      d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </button>
            </span>
          </Listbox.Button>
          <div className='absolute w-full mt-1 bg-white rounded-md shadow-lg'>
            <Listbox.Options className='py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5'>
              {options.map((option: ListBoxOption) => (
                <Listbox.Option as={Fragment} value={option} key={option.value}>
                  {({ active, selected }) => (
                    <li
                      className={classNames(
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                        `${
                          active ? 'text-white bg-orange-600' : 'text-gray-900'
                        }`
                      )}
                    >
                      <span
                        className={classNames(
                          'block truncate',
                          selected ? 'font-semibold' : 'font-normal'
                        )}
                      >
                        {option.text}
                      </span>
                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-orange-600'
                          )}
                        >
                          <svg
                            className='w-5 h-5'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </span>
                      )}{' '}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </div>
      </div>
    </Listbox>
  )
}
