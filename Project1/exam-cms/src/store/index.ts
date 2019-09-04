// 引入子模块
import User from './modules/user';
import Question from './modules/question';

// 实例化模块
const user = new User();
const question = new Question();

// setInterval(()=>{
//     user.isLogin = !user.isLogin;
//     // console.log('user...', user);
// }, 1000);

export default {
    user,
    question
}