import { LightningElement, api, track } from 'lwc';

export default class ComboboxGeneric extends LightningElement {
    @api name;
    @api label;
    @api value;
    @api options;
    @track selectAll = false;
    @track searchTerm = '';

    get filteredOptions() {
        if (this.searchTerm) {
            return this.options.filter(option => option.label.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
        return this.options;
    }

    // get placeholderValue() {
    //     return this.value ? this.value.join(', ') : '';
    // }
    get placeholderValue() {
        if (Array.isArray(this.value)) {
            return this.value.join(',');
        }
        return '';
    }
    
    handleChange(event) {
        const selectedValue = event.detail.value;
        const selectedValueEvent = new CustomEvent('selected', { detail: { selectedValue, name } });
        this.dispatchEvent(selectedValueEvent);
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    toggleSelectAll() {
        this.selectAll = !this.selectAll;
        if (this.selectAll) {
            const allValues = this.options.map(option => option.value);
            const selectAllEvent = new CustomEvent('selected', { detail: { selectedValue: allValues, name } });
            this.dispatchEvent(selectAllEvent);
        } else {
            const deselectAllEvent = new CustomEvent('selected', { detail: { selectedValue: [], name } });
            this.dispatchEvent(deselectAllEvent);
        }
    }
}
