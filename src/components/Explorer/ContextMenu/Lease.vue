<template>
    <ul>
        <li 
            v-for="action in actions" 
            :key="action.label" 
            @click="action.command"
        >
            {{ action.label }}
        </li>
    </ul>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import Context from './context'

@Component
export default class Lease extends Context {
    private actions = [
        { label: 'Download', command: this.downloadCommand },
        { label: 'Upload', command: this.uploadCommand },
    ]

    private downloadCommand() {
        // run commands here
    }

    private uploadCommand() {
        // run commands here
    }
}
</script>

<style lang="scss" scoped>
$radius: 4px;

ul {
    li {
        padding: 10px;
        cursor: pointer;
    }

    li:first-of-type {
        border-top-left-radius: $radius;
        border-top-right-radius: $radius;
    }

    li:last-of-type {
        border-bottom-left-radius: $radius;
        border-bottom-right-radius: $radius;
    }
}
</style>