import HPMsgbox from './main.vue';
import Vue from 'vue/dist/vue.esm.js';
import { Button, Dialog } from 'element-ui';

import Action from './action';
const A = Action

Vue.use(Button);
Vue.use(Dialog);

const MsgCtor = Vue.extend(HPMsgbox);

let message_queue = [];
let instance, curr_message;

const init = () => {
    instance = new MsgCtor({
        el: document.createElement('div')
    });

    instance.callback = default_callback;
}

const default_callback = (action)=> {
    if (curr_message) {
        let callback = curr_message.callback;
        if (typeof callback === 'function') {
            callback(action);
        }
        if (curr_message.resolve) {
            if (action.resolved) {
                curr_message.resolve(action);
            }
            else {
                curr_message.reject(action);
            }
        }
    }
};

const show_next = () => {
    if (!instance) {
        init();
    }
    instance.action = '';
    if (!instance.visible) {
        if (message_queue.length > 0) {
            curr_message = message_queue.shift();

            let options = curr_message.options;

            for (let op in options) {
                instance[op] = options[op];
            }
            if (options.callback === undefined) {
                instance.callback = default_callback;
            }

            let old_callback = instance.callback;
            instance.callback = (action, instance) => {
                old_callback(action, instance);
                show_next();
            }

            document.body.appendChild(instance.$el);

            Vue.nextTick(() => {
                instance.visible = true;
            })
        }
    }
}

const MessageBox = function(options, callback) {
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    else if (options.callback && !callback) {
        callback = options.callback;
    }

    return new Promise((resolve, reject) => {
        message_queue.push({
            options: options,
            callback: callback,
            resolve: resolve,
            reject: reject
        });

        show_next();
    });
}

MessageBox.close = () => {
    instance.close();
    instance.visible = false;
    message_queue = [];
    curr_message = null;
}

export default {
    install(Vue) {
        Vue.prototype.$hp_message = {
            open: function(message, actions, title) {
                // should return a promise that gets resolved when the popup is closed
                // the promise should contain either the action or an error
                return MessageBox({
                    message: message,
                    actions: actions,
                    title: title
                });
            },
            open_default(message) {
                return MessageBox({
                    message: message,
                    actions: [
                        new A('Cancel'),
                        new A('Confirm', true, 'primary')
                    ]
                });
            }
        }
    },
}