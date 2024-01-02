/* eslint-disable @lwc/lwc/valid-track */
import { api, LightningElement, track } from 'lwc';

/**
 * Combobox with different configuration options that also supports multi select.
 * @alias MultiCombobox
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-multi-combobox label="Products" name="products" options={options} ... required></c-multi-combobox>
 */
export default class MultiCombobox extends LightningElement {
  /**
   * If present, the combobox is disabled and users cannot interact with it.
   * @type {boolean}
   * @default false
   */
  // @api disabled = false;
  // @track disabled = this.currentOptions.length > 0 ? false : true;
  // @api isDisabled = false;

  /**
   * Text label for the combobox.
   * @type {string}
   * @default ''
   */
  @api label = '';

  /**
   * Specifies the name of the combobox.
   * @type {string}
   */
  @api name;

  /**
   * A list of options that are available for selection. Each option has the following attributes: label and value.
   * @type {Array}
   * @example
   * options = [
   *   {
   *     "label": "Option 1",
   *     "value": "option1"
   *   },
   *   {
   *     "label": "Option 2",
   *     "value": "option2"
   *   },
   * ]
   */

    // @api currentOptions = [];

  /**
   * Text that is displayed before an option is selected, to prompt the user to select an option.
   * @type {string}
   * @default 'Select an Option'
   */
  @api placeholder = 'Select an Option';

  /**
   * If present, the combobox is read-only. A read-only combobox is also disabled.
   * @type {boolean}
   * @default false
   */
  @api readOnly = false;

  /**
   * If present, a value must be selected before a form can be submitted.
   * @type {boolean}
   * @default false
   */
  @api required = false;

  /**
   * If present, the combobox only allows the selection of a single value.
   * @type {boolean}
   * @default false
   */
  @api singleSelect = false;
  @api rafrech = false;
  @api instant = false;

  /**
   * If present, the combobox will show a pill container with the currently selected options.
   * @type {boolean}
   * @default false
   */
  @api showPills = false;

  @track currentOptions = [];
  // @track
  // currentOptions = JSON.parse(JSON.stringify(this.options));

  @track selectedItems = [];
  @track selectedOptions = [];
  isInitialized = false;
  isLoaded = false;
  isVisible = false;
  // isDisabled = false;
  @track searchTerm = '';

  // @track multiCombo = {
  //   options: [],

  // }
  @api
  get isDisabled(){return !this.currentOptions.length > 0;}


  @api
  get options(){
    return this.currentOptions;
  }
//   set options(value){
//     // this.currentOptions = [];
//     this.searchTerm = '';
//     if(typeof value === 'object' && value.length > 0){
//       this.currentOptions = JSON.parse(JSON.stringify(value));
//       this.setSelection();
//   }
// }
set options(value) {
  if (typeof value === 'object' && value.length > 0) {
    if (this.singleSelect || this.rafrech) {
      this.deselectAll();
      this.currentOptions = JSON.parse(JSON.stringify(value));
      this.setSelection();
    }else {
    this.searchTerm = '';
      // Filtrer les éléments actuels pour conserver uniquement ceux qui font toujours partie des nouvelles options
      this.currentOptions = this.currentOptions.filter((currentItem) => {
          return value.some((newItem) => newItem.value === currentItem.value);
      });

      // Ajouter les nouvelles options qui n'étaient pas déjà présentes
      value.forEach((newItem) => {
          const exists = this.currentOptions.some((currentItem) => currentItem.value === newItem.value);
          if (!exists) {
              this.currentOptions.push(JSON.parse(JSON.stringify(newItem)));
          }
      });
      this.setSelection();
              if(this.instant){
                const selection = this.getSelectedItems();
                this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));}
  }}  else if (typeof value === 'object'&& value.length <= 0){
    this.deselectAll();
    this.close();
    this.dispatchEvent(new CustomEvent('change', { detail: [] }));
    this.currentOptions = [];
  }
  else{
  console.error("Une erreur s'est produite : options invalide.");

}
}  



  connectedCallback() {
    // this.isDisabled = this.disabled || this.readOnly;
    this.hasPillsEnabled = this.showPills && !this.singleSelect;
    // if(typeof this.options ==='object' && this.options.length > 0){
    //   this.currentOptions = JSON.parse(JSON.stringify(this.options));}
    // if (this.options.length > 0) {
    // this.currentOptions = this.options;}
    // this.addEventListener('resett', () => {
    //   this.resetComponent();
    // });
  }

//  resetComponent() {
//     console.log('resetComponent');
//     this.deselectAll();
//     this.currentOptions = [];
//     this.searchTerm = '';
//     this.currentOptions = JSON.parse(JSON.stringify(this.options));
//     // this.currentOptions = this.multiCombo.options;
//     // this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions));
//   }

  get filteredOptions() {
    if (this.currentOptions) {
        return this.currentOptions.filter(option =>
            option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
    return [];
}
selectAll() {
  this.currentOptions.forEach((item) => (item.selected = true));
  this.setSelection();
  this.searchTerm = '';
  if(this.instant){
    this.dispatchEvent(new CustomEvent('change', { detail: this.getSelectedItems() }));
    this.close();
  }
}

deselectAll() {
  this.currentOptions.forEach((item) => (item.selected = false));
  this.setSelection();
  this.searchTerm = '';

  if(this.instant){this.dispatchEvent(new CustomEvent('change', { detail: [] }));}
}

handleSearchInputChange(event) {
  this.searchTerm = event.target.value;
}
  renderedCallback() {
    if (!this.isInitialized) {
      this.template.querySelector('.multi-combobox__input').addEventListener('click', (event) => {

        this.handleClick(event.target);
        event.stopPropagation();
      });
      //===
      // if(typeof this.options ==='object' && this.options.length > 0){
      //   this.currentOptions = JSON.parse(JSON.stringify(this.options));}
//===
      this.template.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      document.addEventListener('click', () => {
        this.close();
      });
      this.isInitialized = true;
      this.setSelection();
    }
  }

  handleChange(event) {
    this.change(event);
  }

  handleRemove(event) {
    this.selectedOptions.splice(event.detail.index, 1);
    this.change(event);
  }

  handleClick() {
    // initialize picklist options on first click to make them editable
    // if (this.isLoaded === false) {
    //   // this.currentOptions = JSON.parse(JSON.stringify(this.multiCombo.options));
    //   this.currentOptions = this.multiCombo.options;
    //   this.isLoaded = true;
    // }

    if (this.template.querySelector('.slds-is-open')) {
      this.close();
      const selection = this.getSelectedItems();
      if (!this.singleSelect) {
    this.dispatchEvent(new CustomEvent('change', { detail: selection }));
    // this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));
      }
      if(this.instant){
        this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));
      }
    } else {
      this.template.querySelectorAll('.multi-combobox__dropdown').forEach((node) => {
        node.classList.add('slds-is-open');
      });
    }
  }

  change(event) {
    // remove previous selection for single select picklist
    if (this.singleSelect) {
      this.currentOptions.forEach((item) => (item.selected = false));
    }

    // set selected items
    this.currentOptions
      .filter((item) => item.value === event.detail.item.value)
      .forEach((item) => (item.selected = event.detail.selected));
    this.setSelection();

    //==== [btn =>]
    if(this.instant){
    const selection = this.getSelectedItems();
    this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));
    }
    // for single select picklist close dropdown after selection is made
    if (this.singleSelect) {
      const selection = this.getSelectedItems();
      if (selection.length>0){
        this.dispatchEvent(new CustomEvent('change', { detail:  selection[0] }));
      }
      this.close();
    }
  }

  fetchSelected(){
    const selection = this.getSelectedItems();
    this.dispatchEvent(new CustomEvent('change', { detail: selection }));
    // this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));
    // this.close();
  }

  close() {
    this.template.querySelectorAll('.multi-combobox__dropdown').forEach((node) => {
      node.classList.remove('slds-is-open');
    });
    this.searchTerm = '';
    this.dispatchEvent(new CustomEvent('close'));
  }

  setSelection() {
    const selectedItems = this.getSelectedItems();
    let selection = '';
    if (selectedItems.length < 1) {
      selection = this.placeholder;
      this.selectedOptions = [];
    // } else if (selectedItems.length > 2) {
    //   selection = `${selectedItems.length} Options Selected`;

    //   this.selectedOptions = this.getSelectedItems();
    } else {
      selection = selectedItems.map((selected) => selected.label).join(', ');
      this.selectedOptions = this.getSelectedItems();
    }
    this.selectedItems = selection;
    this.isVisible = this.selectedOptions && this.selectedOptions.length > 0;
  }

  getSelectedItems() {
    return this.currentOptions.filter((item) => item.selected);
  }
}

// getSelectedItems() {
//   return this.currentOptions.filter((item) => item.selected).includes((item) => item.value(this.currentOptions));
// }
// }