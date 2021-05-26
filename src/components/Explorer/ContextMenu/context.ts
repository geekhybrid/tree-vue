import { Vue } from 'vue-property-decorator';

export default class Context extends Vue {

    // FRANCIS don't kill me
    // this should be deleted and npm install popper
    // using the terminal required i signin and i would have lost access
    // to the workspace
    private addPopper() {
        const appRootEl = document.getElementById('app');

        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.js')

        appRootEl?.insertAdjacentElement('afterend', scriptElement)
    }
}