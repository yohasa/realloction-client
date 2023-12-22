// multi-select-combobox.js
import { LightningElement, api, track } from 'lwc';

export default class MultiSelectCombobox extends LightningElement {
    @api label;
    @api value;
    @api options;
    @api disabled;

    @track selectedValues = this.value || [];
    @track isDropdownOpen = false;
    @track searchTerm = '';

    get selectedValuesString() {
        return this.selectedValues.length > 0 ? this.selectedValues.map(option => option.label).join(', ') : '';
    }
    get placeholderText() {
        return this.selectedValuesString || 'Search or Select';
    }

    get filteredOptions() {
        if (this.options) {
            return this.options.filter(option =>
                option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        return [];
    }
    // getSelectedClass(value) {
    //     return this.isSelected(value) ? 'selected' : 'unselected';
    // }

    // get isSelected() {
    //     return (value) => this.selectedValues.some(val => val.value === value);
    // }
    handleInputChange(event) {
        this.searchTerm = '';
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleSearchInputChange(event) {
        this.searchTerm = event.target.value;
    }


    handleOptionSelect(event) {
        const { value, selected } = event.detail;
        const selectedOption = this.options.find(option => option.value === value);

        if (selected) {
            this.selectedValues = [...this.selectedValues, selectedOption];
        } else {
            this.selectedValues = this.selectedValues.filter(val => val.value !== value);
        }

        const selectedValuesEvent = new CustomEvent('selected', {
            detail: { selectedValues: this.selectedValues }
        });
        this.dispatchEvent(selectedValuesEvent);
    }
    
    isSelected(option) {
        return this.selectedValues.some(val => val.value === option.value);
    }
    
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        }

    // getSelectedClass(value) {
    //     return this.isSelected({ value }) ? 'selected' : 'unselected';
    // }
    // handleInputChange(event) {
    //     this.searchTerm = event.target.value;
    //     this.isDropdownOpen = true;
    // }

    // handleOptionClick(event) {
    //     const selectedValue = event.currentTarget.dataset.value;
    //     const selectedOption = this.options.find(option => option.value === selectedValue);

    //     if (!this.selectedValues.includes(selectedOption)) {
    //         this.selectedValues = [...this.selectedValues, selectedOption];
    //     }

    //     this.searchTerm = '';
    //     this.isDropdownOpen = false;
    //     // Émettre l'événement personnalisé avec les valeurs sélectionnées
    //     const selectedValuesEvent = new CustomEvent('selected', {
    //         detail: { selectedValues: this.selectedValues }
    //     });
    //     this.dispatchEvent(selectedValuesEvent);
    // }

    // toggleDropdown() {
    //     this.isDropdownOpen = !this.isDropdownOpen;
    // }
}
