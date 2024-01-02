import { LightningElement, api, track } from 'lwc';

export default class MultiSelectCombobox extends LightningElement {
    @api label;
    @api value;
    @api options;
    @api disabled;

    @track selectedValues = []; // Initialiser en tant que tableau vide
    @track isDropdownOpen = false;
    @track searchTerm = '';

    connectedCallback() {
        // Définir les valeurs par défaut lors de la connexion du composant
        // if (this.value) {
        //     this.selectedValues = this.options.filter(option => this.value.includes(option.value));
        // }
    }

    get selectedValuesString() {
        return this.selectedValues.length > 0 ? this.selectedValues.map(option => option.label).join(', ') : '';
    }

    get placeholderText() {
        return this.selectedValuesString || 'Rechercher ou Sélectionner';
    }

    get filteredOptions() {
        if (this.options) {
            return this.options.filter(option =>
                option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        return [];
    }

    get isSelected() {
        return (value) => this.selectedValues.some(val => val.value === value);
    }

    handleInputChange(event) {
        this.searchTerm = '';
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleSearchInputChange(event) {
        this.searchTerm = event.target.value;
    }

    handleClickt(event) {
             const selectedValue = event.target.detail;
        console.log('selectedvalue : ', JSON.stringify(selectedValue));

        const { value, selected } = event.detail;
        const selectedOption = this.options.find(option => option.value === value);
         console.log('selectedOption : ', JSON.stringify(selectedOption));

        if (selected) {
            this.selectedValues = [...this.selectedValues, selectedOption];
        } else {
            this.selectedValues = this.selectedValues.filter(val => val.value !== value);
        }
        console.log('selectedvalues : ', JSON.stringify(this.selectedValues));

    //    this.searchTerm = '';
    //    this.isDropdownOpen = false;

  
        const selectedValuesEvent = new CustomEvent('selected', {
            detail: { selectedValues: this.selectedValues.map(option => option.value) }
            
        });
        this.dispatchEvent(selectedValuesEvent);
        // console.log('selectedValuesEvent : ', JSON.stringify(selectedValuesEvent));
       }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleOptionClick(event) {

        // const selectedValue22 = event.currentTarget.detail;
        // console.log('selectedvalue22 : ', JSON.stringify(selectedValue22));
        // alert(selectedValue);

        const selectedValue = event.currentTarget.value;
        console.log('selectedvalue : ', JSON.stringify(selectedValue));
        // alert(selectedValue22);
        // const selectedValue11 = event.currentTarget.dataset;
        // console.log('selectedvalue11 : ', JSON.stringify(selectedValue11));
        // alert(selectedValue11);
        // const selectedValue = event.currentTarget.dataset;
        // const selectedValue = event.currentTarget.dataset;
        const selectedOption = this.options.find(option => option.value === selectedValue);
        console.log('selectedOption : ', JSON.stringify(selectedOption));


        if (!this.selectedValues.some(val => val.value === selectedOption.value)) {
            this.selectedValues = [...this.selectedValues, selectedOption];
         } else {
        this.selectedValues = this.selectedValues.filter(val => val.value !== value);
         }

        this.searchTerm = '';
        this.isDropdownOpen = false;

        const selectedValuesEvent = new CustomEvent('selected', {
            detail: { selectedValues: this.selectedValues.map(option => option.value) }
        });
        this.dispatchEvent(selectedValuesEvent);
        // this.handleOptionSelect(event, selectedOption);//
    }
}
