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
import {Vue, Component, Prop} from 'vue-property-decorator';
import Context from './context'

import Node from '../node';

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