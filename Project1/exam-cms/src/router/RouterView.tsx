import * as React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';

interface PropsInfo {
    routes: Array<object>
}
export default (props: PropsInfo)=>{
    console.log('props...', props);
    return <Switch>
        {
            props.routes.map((item: any, index)=>{
                return <Route key={index} path={item.path} render={(props)=>{
                    if (item.children){
                        /** 渲染组件，类似于<Tab/>
                         *  ...props 把路由信息展开传递下去
                         *  item.children 把子路由配置传递下去
                         */
                        return <item.component {...props} routes={item.children}/>
                    }else{
                        return <item.component {...props}/>
                    }
                }}></Route>
            })
        }
        <Redirect exact from="/" to="/login"></Redirect>
    </Switch>
}