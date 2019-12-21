import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';

class App extends Component {
    state = {
        message: '',
        messageText:'',
        chatData:[]
    }

    sendMessage = () => {
        try {
          this.clientRef.sendMessage("/app/hello", JSON.stringify(this.state.messageText));
        } catch(e) {
          console.log(e);
        }
    }

    handleChange = (event) => {
        this.setState({
            messageText: event.target.value
        });
    }

    appendToData = (newMessage) => {
        let chatData = this.state.chatData;
        chatData.push(newMessage.content);
        this.setState({chatData:chatData});
    }

    clearChat = () => {
        this.setState({
            chatData: []
        });
    }

  render() {

    const table = this.state.chatData.map((msg,index) => (
         <tr key={index + 1}><td key={index + 2}>{msg}</td></tr>
    ));
    return (
        <div className="container">
            <div className="row">
                {/*<div className="col-md-6">*/}
                {/*    <form className="form-inline">*/}
                {/*        <div className="form-group">*/}
                {/*            <label htmlFor="connect">WebSocket connection:</label>*/}
                {/*            <button id="connect" className="btn btn-default" type="submit">Connect</button>*/}
                {/*            <button id="disconnect" className="btn btn-default" type="submit"*/}
                {/*                    disabled="disabled">Disconnect*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</div>*/}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Write the Message!</label> {``}
                        <input type="text" id="name" className="form-control" value={this.state.messageText}
                               onChange={this.handleChange} placeholder="Your name here..."/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <table id="conversation" className="table table-striped">
                        <thead>
                            <tr><th>Messages</th></tr>
                        </thead>
                        <tbody id="messages">
                            {table}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-danger" onClick={this.clearChat}>Clear</button>
                </div>
            </div>
            <SockJsClient url='https://push-notification-spring-musa.herokuapp.com/gs-guide-websocket' topics={['/topic/greetings']}
                          onMessage={(msg) => { this.appendToData(msg);  }}
                          onConnect={ () => console.log('connect') }
                          onDisconnect={ () => console.log('disconnect')}
                          ref={ (client) => { this.clientRef = client }} />
        </div>
    );
  }
}

export default App;
