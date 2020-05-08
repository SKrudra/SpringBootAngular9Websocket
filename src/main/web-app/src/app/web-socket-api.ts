import { AppComponent } from './app.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
    webSocketEndpoint = 'http://localhost:8080/ws';
    topic = '/topic/greetings';
    stompClient: any;

    constructor(private app: AppComponent) { }

    connect() {
        let ws = new SockJS(this.webSocketEndpoint);
        this.stompClient = Stomp.over(ws);
        const that = this;
        that.stompClient.connect({}, function (frame) {
            that.stompClient.subscribe(that.topic, function (sdkEvent) {
                that.onMessageReceived(sdkEvent);
            })
        })
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    send(name) {
        this.stompClient.send('/app/hello', {}, JSON.stringify({name: name}));
    }

    onMessageReceived(message) {
        console.log('received: ', message);
        this.app.handleMessage(message.body);
    }
}