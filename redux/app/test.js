import { createStore, combineReducers } from 'redux'

import Handlebars from 'handlebars';

const source = `<div><p>文章总数: {{posts.length}}</p>
                {{#if posts}}
                    <ul>
                        {{#each posts}}
                            <li>{{this.id}} -- {{this.title}}</li>
                        {{/each}}
                    </ul>
                {{/if}}
                <p>用户信息： 是否登录：{{user.isLogin}}</p>
                {{#if use.isLogin}}
                    用户邮箱：{{user.userData.email}} 用户名：{{user.userData.name}}
                {{/if}}
                </div>`;

const template = Handlebars.compile(source);
function displayPage(data) {
    const html = template(data);
    document.body.innerHTML += html;
    console.log(data)
}

// const initalState = {
//     posts: [],
//       users: {
//         isLogin: false,
//         userData: {

//         }
//     }
// }

const initalPostsState = [];

const initalUsersState = {
    isLogin: false,
    userData: {

    }
}

const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const USER_LOGIN = 'USER_LOGIN';

function createPost (data) {
    return {
        type: CREATE_POST,
        data
    }
}

function deletePost (id) {
    return {
        type: DELETE_POST,
        id
    }
}

function userLogin (data) {
    return {
        type: USER_LOGIN,
        data
    }
}

function posts (state = initalPostsState, action) {
    switch (action.type) {
        case CREATE_POST:
            return [...state, action.data];
        case DELETE_POST:
            return state.filter( (post) => {
                return post.id !== action.id;
            });
        default:
        return state;
    }
}

function user(state = initalUsersState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {
                isLogin: true,
                userData: action.data
            })
        default:
        return state;
    }
}


const rootReducer = combineReducers({
    posts,
    user
})

const store = createStore(rootReducer);

document.body.innerHTML += '<h2>初始化状态</h2>';

store.subscribe( () => {
    displayPage(store.getState())
})
document.body.innerHTML += '<h2>创建两篇文章</h2>';
store.dispatch(createPost({id: 1, title: 'new title'}))

store.dispatch(createPost({id: 2, title: 'the second title'}))
document.body.innerHTML += '<h2>删除一篇文章</h2>';
store.dispatch(deletePost(1));
document.body.innerHTML += '<h2>用户登录</h2>';
store.dispatch(userLogin({name:111, email:'oby@163.com'}));
