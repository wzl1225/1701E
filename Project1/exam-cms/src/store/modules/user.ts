import {observable, action} from 'mobx'
import {login} from '../../service/index'
import {HttpInfo, HttpType, LoginForm} from '../../types/index'


class User{
    @observable isLogin: boolean = false;

    @action async login(form: any): Promise<any>{
        let result: any = await login(form);
        console.log('result...', result);
        return result.code;

        // if (form.user_name === 'chenmanjie' && form.user_pwd === 'Chenmanjie123!'){
        //     this.isLogin = true;
        //     return {code: 1}
        // }else{
        //     this.isLogin = false;
        //     return {code: 0}
        // }
    }
}

export default User;