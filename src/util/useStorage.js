if(getItem('tasks') === null){
	setItem('tasks', [])
}

export function getItem(key){
	return JSON.parse(localStorage.getItem(key))
}

export function setItem(key, value){
	let prev = getItem(key)
	if(prev === null){
		prev = []
	}
	localStorage.setItem(key, JSON.stringify([...value , ...prev]))
}

export function removeItem(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}