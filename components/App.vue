<template>
<div>
    <div
        v-for="i in array(3)"
        :key="i"
    >
        <el-button @click="open(`modal ${i}`)">open modal {{ i }}</el-button>
    </div>
</div>
</template>

<script>
import Action from "../modules/hp-message/action";
const A = Action;

export default {
    name: "App",
    methods: {
        open(name) {
            this.$hp_message.open_default("Are you sure?").then(res => {
                console.log(res.name);
            }).catch(res => {
                console.log(res.name);
            });
        },
        array(len) {
            let res = Array(len);
            for (let i = 0; i < len; i++) {
                res[i] = i+1;
            }

            return res;
        }
    }
}
</script>

<style>
.hp-modal {
    font-family: Arial, Helvetica, sans-serif;
}
</style>