﻿declare module amplify {

    export function subscribe(topic: string, callback: Function): void;
    export function subscribe(topic: string, conext: Object, callback: Function): void;
    export function subscribe(topic: string, callback: Function, priority: number): void;
    export function subscribe(topic: string, context: Object, callback: Function, priority: number): void;

    export function unsubscribe(topic: string, callback: Function): void;

    export function publish(topic: string, ...args: any[]): void;

    export function store(key: string, value: Object, args?: any): void;
    export function store(key: string): Object;
    export function store(): Object;

    export module request {
    
        export function (resourceId: string, data: any, callback: Function): void;
        export function (resourceId: string, callback: Function): void;
        export function (settings: any);
        export function define(resourceId: string, requestType: string, settings: any): void;
        export function define(resourceId: string, resource:Function): void;
    
    }

}