import { ChevronDownIcon, ChevronUpIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon, MoonIcon } from '@heroicons/react/24/solid'
import { Circle, Dot, Moon } from '@phosphor-icons/react'
import { cn } from '../util/cn'
import { useState } from 'react'
import { getItem } from '../util/useStorage.js'
import Pill from '../components/Pill'

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
	const [ tags, setTags ] = useState(getItem('tags'))

	const date = new Date()
	const today = `${date.getDate()} ${months[date.getMonth()].substring(0,3)}`

	let percent = 0
	if(props.tasks.length > 0){
		percent = Math.floor((props.completedTasks.length / props.tasks.length) * 100)
	}

	return (
		<div className="relative flex flex-col items-center gap-3 w-full my-4">
			<div className="flex items-left gap-4 w-full">
				{/*<button 
					className="p-2 pt-0"
					onClick={() => {
						props.setToggleSideBar(true)
					}}
				>
					<Bars3Icon className="w-6 h-6" />
				</button>*/}
				<h1 className="text-3xl font-bold leading-9 mr-auto">
					{
						(percent >= 100) ? 
						<p className="flex items-center gap-1">
							<CheckBadgeIcon className="w-6 h-6 " />
							100%
						</p>
						:
						'Today'
					}
				</h1>
				<button 
					className={cn("flex items-center gap-3 p-2 px-4 bg-white border-2 rounded-lg w-fit", toggleMenu ? "border-black" : "")}
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
			</div>

			<div className="flex items-center gap-4 w-full mx-auto">
				<p>{today}</p>
				<div className="w-24 h-1 rounded-full bg-gray-200 overflow-hidden">
					<div 
						className="h-1 bg-[black]" 
						style={{
							width: percent + "%"
						}}
					/>
				</div>
				<p>{props.tasks.length > 0 ? props.completedTasks.length : 0} done</p>
			</div>
			{/*{
				menuOption === 1 && <ul className="w-full flex items-center gap-3">
					{
						tags.map((i, ind) => <Pill text={i} />)
					}
				</ul>
			}*/}
			{
				toggleMenu && <div className = "absolute right-0 top-[50%] mt-3 bg-[white] p-4 px-8 rounded-lg flex flex-col items-right gap-2 shadow-xl">
					{
						options.map(i => <Option key={i.text} {...i} menuOption={menuOption} setMenuOption={setMenuOption} setToggleMenu={setToggleMenu}/>)
					}
				</div>
			}
		</div>
	)
}