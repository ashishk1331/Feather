import { nanoid } from 'nanoid'


/**
 * function incoming parameters ->
 * 1. tasks
 * 2. tittle
 * 3. tags
 */
export function taskify(props){
	let id = null;

	if(props.tasks.length < 1){
		id = nanoid()
	} else {
		let idPool = new Set(props.tasks.map(i => i.id))

		while(id === null && !idPool.has(id)){
			id = nanoid()
		}
	}


	let now = new Date().toJSON();

	return {
		createdAt: now,
		days: props.days,
		id: id,
		type: 'task',
		title: props.title,
		tags: props.tags,
		updatedAt: now
	}
}