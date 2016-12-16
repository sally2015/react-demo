import React from 'react';

function List ({ onCreate }) {
	return (
		<p>
			<button onClick={() => { onCreate({id:'ss', content:'测试'})}}>增加代办事项</button>
		</p>
	)
}

export default List;