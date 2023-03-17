import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { cn } from '../util/cn'
import { Circle, Dot } from '@phosphor-icons/react'
import { useState } from 'react'

function Option(props){

	const active = props.menuOption === props.value

	return (
		<button 
			className={cn("p-2 flex items-baseline gap-2", active ? "font-medium" : '')}
			onClick={() => {
				props.setMenuOption(props.value)
				props.setToggleMenu(false)
			}}
		>
			{
				active && <Circle weight="fill" className="w-2 h-2" />
			}
			{props.text}
		</button>
	)
}

export default function Header(props){

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const options = [
		{
			text: 'active',
			value: 0
		},
		{
			text: 'view all',
			value: 1
		}
	];
	const menuOption = props.menuOption, setMenuOption = props.setMenuOption;
	const [ toggleMenu, setToggleMenu ] = useState(false)

	const date = new Date()
	const today = `${date.getDate()} ${months[date.getMonth()]}`

	const percent = Math.floor((props.completedTasks.length / props.ftasks.length) * 100)

	return (
		<div className="relative flex items-center justify-between w-full my-4">
			<div className="flex flex-col items-left gap-1 w-full">
				<h1 className="text-3xl font-bold leading-9">
					Today
				</h1>
				<div className="flex items-center gap-4 w-full">
					<p>{today}</p>
					<div className="w-24 h-1 rounded-full bg-gray-200 overflow-hidden">
						<div 
							className="h-1 bg-[black]" 
							style={{
								width: percent + "%"
							}}
						/>
					</div>
					<p>{props.completedTasks.length} completed</p>
					
				</div>
			</div>
			<button 
				className="flex items-center gap-3 p-2 px-4 bg-gray-100 rounded-lg w-fit"
				onClick={() => {
					setToggleMenu(!toggleMenu)
			}}>
				<p className="w-max">
					{
						toggleMenu ?
						"select"
						:
						options[menuOption].text
					}
				</p>
				{
					toggleMenu ?
					<ChevronUpIcon />
					:
					<ChevronDownIcon />
				}
			</button>
			{
				toggleMenu && <div className = "absolute right-0 top-[100%] bg-gray-100 p-4 px-12 rounded-lg flex flex-col items-right gap-2">
					{
						options.map(i => <Option key={i.text} {...i} menuOption={menuOption} setMenuOption={setMenuOption} setToggleMenu={setToggleMenu}/>)
					}
				</div>
			}
		</div>
	)
}