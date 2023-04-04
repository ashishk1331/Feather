import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast(props){

	const [ visible, setVisible ] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setVisible(false)
		}, 2500)
	}, [])

	return (
		<AnimatePresence>
		{
			visible && <motion.div 
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity:1 , y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				className="bg-black dark:bg-white text-white dark:bg-gray-900 fixed inset-0 z-30 w-fill h-fit m-2 p-6 rounded-lg flex items-center gap-2 shadow-xl">
				<ExclamationCircleIcon className="w-6 h-6" />
				{props.message}
			</motion.div>
		}
		</AnimatePresence>
	)
}