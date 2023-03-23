import { XCircleIcon, XMarkIcon, BackspaceIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useState, useRef } from 'react'
import { getItem, setItem, removeItem } from '../util/useStorage'
import Pill from '../components/Pill'

export default function TagEditor(props){

	const [ tags, setTags ] = useState(getItem('tags') || [])
	const tagFormInp = useRef()

	function removeTag(tag){
		let newtags = new Set(tags)
		newtags.delete(tag)
		newtags = [...newtags]
		setTags(newtags)
		removeItem('tags', newtags)
	}

	return (
		<div className="w-full h-full absolute inset-0 backdrop-blur-[2px] bg-gray-900/25 dark:bg-gray-600/25">
			<div className="w-full h-fit bg-white dark:bg-gray-900 dark:text-white absolute bottom-0 p-8 pt-8 flex flex-col items-center gap-3 rounded-t-2xl">
				
				<h1 className="text-3xl font-bold leading-9 mr-auto my-2">Adjust tags</h1>
				{
					tags.length > 0 && <ul className="w-full flex items-center flex-wrap gap-2">
						<li className="w-full">
							tags
						</li>
						{
							tags.map((i, ind) => <Pill key={ind+'tag-delete'} text={i}> 
								<XMarkIcon 
									onClick={() => {
										removeTag(i)
									}}
								/>
							</Pill>)
						}
					</ul>
				}

				<p className="w-fit mr-auto mt-4">add a new tag</p>
				<form 
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
					className="flex items-center gap-2 w-full"
				>
					<a 
						className="p-3" 
						href="#"
						onClick={(e) => {
							e.preventDefault();
							tagFormInp.current.value = '';
						}}
					>
						<BackspaceIcon className="w-6 h-6 rotate-180" />
					</a>
					<input 
						type="text" 
						name="title"
						className="border-2 border-gray-200 dark:border-gray-800 bg-transparent text-lg w-full rounded-lg p-1 px-4" 
						placeholder="type here..."
						ref={tagFormInp}
					/>
					<a 
						className="p-3" 
						href="#"
						onClick={(e) => {
							e.preventDefault();
							let tag = tagFormInp.current.value.toLowerCase()
							setItem('tags', [tag])
							setTags([tag, ...tags])
							tagFormInp.current.value = ''
						}}
					>
						<CheckIcon className="w-6 h-6" />
					</a>
				</form>

				<button 
						type="submit" 
						className="w-full bg-gray-900 dark:bg-gray-200 text-white dark:text-black p-4 mt-4 rounded-lg text-lg font-medium"
						onClick={() => {
							props.setShowTagEditor(false);
						}}
					>
						Save
					</button>
			</div>
		</div>
	)
}