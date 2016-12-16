import React from 'react';

function List ({ todos, deleteTodo}) {
	var ListItems = todos.map( (item) => {
		return <li key={item.id} >
			<button onClick={() => deleteTodo(item.id)}>删除按钮</button>
			{item.content}
		</li>
	})
	return (
		<ul>
			{ListItems}
		</ul>
	)
}

export default List;