import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

export default function (props) {
	return (
		<div className="hidden md:flex bg-white dark:bg-zinc-900 absolute w-full h-full inset-0 z-50 flex items-center dark:text-neutral-50">
			<div className="m-auto flex flex-col items-center gap-4">
				<ComputerDesktopIcon className="w-6 h-6" />
				<p className="text-xl">Not yet for big screens.</p>
			</div>
		</div>
	);
}
