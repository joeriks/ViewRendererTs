module jXSockets {

    interface Isettings {
        apikey: string;
    }

    class WebSocket {
        constructor (url: string, subprotocol: string, settings: Isettings);
        bind(event: string, fn: (model: any) =>any, options?: any, callback?: Function): void;
        unbind(event: string, callback: Function): void;
        trigger(event: string, json: Object, callback?: Function): void;
        send(payload: Object): void;
    }
}