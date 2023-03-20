import { XMarkIcon } from '@heroicons/react/24/outline'

function Tab(props){
	return (
		<li>
			
		</li>
	)
}

export default function SideBar(props){
	return (
		<div className="fixed top-0 left-0 w-full h-screen backdrop-blur-[2px] bg-gray-900/25 z-10">
			<div className="w-2/3 h-full bg-[white] flex items-left flex-col gap-3 p-3 pt-8">
				<button
					className="p-3 flex items-center gap-3"
					onClick={() => {
						props.setToggleSideBar(false)
					}}
				>
					<XMarkIcon />
					close
				</button>
			</div>
		</div>
	)
}