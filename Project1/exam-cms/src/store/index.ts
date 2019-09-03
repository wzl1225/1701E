// 引入子模块
import User from './modules/user';

// 实例化模块
const user = new User();


// setInterval(()=>{
//     user.isLogin = !user.isLogin;
//     // console.log('user...', user);
// }, 1000);

export default {
    user
}