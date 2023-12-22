import { LightningElement, api } from 'lwc';

export default class DualListboxGeneric extends LightningElement {
    @api name;
    @api label;
    @api value;
    @api options;
    @api minSelections;
    @api maxSelections;

    handleChange(event) {
        const selectedValues = event.detail.value;
        const selectedValueEvent = new CustomEvent('selected', { detail: { selectedValues, name } });
        this.dispatchEvent(selectedValueEvent);
    }
}
