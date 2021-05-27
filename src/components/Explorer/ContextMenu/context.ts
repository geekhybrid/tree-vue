import { Vue, Component, Prop } from 'vue-property-decorator';
import tippy from 'tippy.js';
import { ExplorerItem } from '@/contracts/types';

@Component
export default class Context extends Vue {
    @Prop({ default: () => { return {} }}) node!: ExplorerItem;

    mountTippy(directParentElement: Element): void {
        const element = this.$vnode.elm as Element;

        const instance = tippy(directParentElement, {
            allowHTML: true,
            content: element,
            placement: 'right-start',
            trigger: 'manual',
            interactive: true,
            arrow: false,
            offset: [0, 0],
        });

        directParentElement.addEventListener('contextmenu', (event: Event) => {
            event.preventDefault();

            instance.setProps({
                getReferenceClientRect: () => ({
                    width: 0,
                    height: 0,
                    top: (event as MouseEvent).clientY,
                    bottom: (event as MouseEvent).clientY,
                    left: (event as MouseEvent).clientX,
                    right: (event as MouseEvent).clientX,
                }),
            });

            instance.show();
        });
    }

    mounted(): void {
        // didn't use this.$parent.$el because it returns parent element
        // of the parent component 
        const directParentElement = document.getElementById(this.node.id) 

        if (directParentElement) {
            this.mountTippy(directParentElement)
        }
    }
}