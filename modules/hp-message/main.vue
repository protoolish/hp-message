<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        width="30%"
    >
        <span class="dialog-message">{{ message }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button 
                v-for="(action, i) in actions"
                :key="i"
                @click="handle_action(action)"
                :type="action.type"
            >{{ action.name }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Action from "./action";

export default {
    name: 'hp-message',
    props: {
        title: {
            type: String,
            default: null
        },
        actions: Array,
        message: String
    },
    methods: {
        close() {
            if (!this.visible) return;
            this.visible = false;
            setTimeout(() => {
                if (this.action) this.callback(this.action, this);
            });
        },
        handle_action(action) {
            this.action = action;
            this.close();
        }
    },
    data() {
        return {
            uid: 1,
            callback: null,
            action: null,
            visible: false
        }
    }
}
</script>

<style>
.dialog-message {
    font-family: Arial, Helvetica, sans-serif;
}
</style>