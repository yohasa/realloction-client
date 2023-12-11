import { LightningElement } from 'lwc';

export default class LwcAccordionSection extends LightningElement {
    accordionToggleSectionW3web(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }
    
    toggleSectionJquery() {
        this.isDVisible = !this.isDVisible;
    }
    
    get isMessageVisible() {
        return this.activeSectionMessage.length > 0;
    }
}