import { classNames } from '../../utils'

export default function OldToggle({
  on,
  setOn,
}: {
  on: boolean
  setOn: (on: boolean) => void
}) {
  return (
    <span
      role='checkbox'
      tabIndex={0}
      aria-checked={on}
      className={classNames(
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
        on ? 'bg-indigo-600' : 'bg-gray-200'
      )}
      onClick={() => setOn(!on)}
    >
      <span
        aria-hidden='true'
        className={classNames(
          'inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200',
          on ? 'translate-x-5' : 'translate-x-0'
        )}
      ></span>
    </span>
  )
}
