import * as React from 'react';
import {Layout} from 'antd';
import {observer, inject} from 'mobx-react';
const { Header, Content, Sider} = Layout;

@inject('question')
@observer
class LoginPage extends React.Component{
    constructor(props: any){
        super(props);
        const {getQuestion} = props.question;
        getQuestion();
    }



    public render(){
        return <Layout>
            <Header></Header>
            <Layout>
                <Sider></Sider>
                <Content></Content>
            </Layout>
        </Layout>
    }
}

export default LoginPage;