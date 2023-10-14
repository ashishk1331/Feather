import { Feather } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Splash(props) {
	const [splashScreen, setSplashScreen] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setSplashScreen(false);
		}, 2500);
	}, []);

	return (
		splashScreen && (
			<div
				className="z-30 w-screen h-screen fixed top-0 left-0 flex items-center bg-white dark:bg-zinc-900 dark:text-white z-[99]"
				exit={{ opacity: 0 }}
				key="splashscreen"
			>
				<div className="m-auto flex flex-col items-center gap-8">
					<Feather className="w-12 h-12" />
					<div className="w-[250%] h-2 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
						<motion.div
							initial={{ x: "-200%" }}
							animate={{ x: "280%" }}
							transition={{
								ease: "easeInOut",
								duration: 2,
								repeat: Infinity,
							}}
							exit={{ opacity: 0 }}
							className="w-12 h-full bg-slate-blue"
						/>
					</div>
				</div>
			</div>
		)
	);
}
