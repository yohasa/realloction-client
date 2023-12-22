import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {

    @api
    values = [];

    @track
    selectedvalues = [];

    @api
    picklistlabel = 'Status';

    showdropdown;

    handleleave() {
        
        let sddcheck= this.showdropdown;

        if(sddcheck){
            this.showdropdown = false;
            this.fetchSelectedValues();
        }
    }

    connectedCallback(){
        this.values.forEach(element => element.selected 
                            ? this.selectedvalues.push(element.value) : '');
        console.log(this.selectedvalues);
    }

    fetchSelectedValues() {
        
        this.selectedvalues = [];
        // this.template.querySelectorAll('c-picklist-value')
        // console.log(this.selectedvalues.label);
        // console.log(this.template.querySelectorAll('c-picklist-value'));
        //get all the selected values
        this.template.querySelectorAll('c-picklist-value').forEach(
            element => {
                if(element.selected){
                    console.log(element.label);
                    this.selectedvalues.push(element.value);
                }
            }
            );
            console.log(this.selectedvalues);
        console.log(JSON.stringify(this.selectedvalues));
        this.selectedvalues = [...this.selectedvalues]
        const selectedValueEvent = new CustomEvent('selected', { detail: { selectedValues: this.selectedvalues } });
        this.dispatchEvent(selectedValueEvent);
        //refresh original list
        this.refreshOrginalList();
    }

    refreshOrginalList() {
        //update the original value array to shown after close

        const picklistvalues = this.values.map(eachvalue => ({...eachvalue}));

        picklistvalues.forEach((element, index) => {
            if(this.selectedvalues.includes(element.value)){
                picklistvalues[index].selected = true;
            }else{
                picklistvalues[index].selected = false;
            }
        });

        this.values = picklistvalues;
    }

    handleShowdropdown(){
        let sdd = this.showdropdown;
        if(sdd){
            this.showdropdown = false;
            this.fetchSelectedValues();
        }else{
            this.showdropdown = true;
        }
    }

    closePill(event){
        console.log(event.target.dataset.value);
        let selection = event.target.dataset.value;
        let selectedpills = this.selectedvalues;
        console.log(selectedpills);
        let pillIndex = selectedpills.indexOf(selection);
        console.log(pillIndex);
        this.selectedvalues.splice(pillIndex, 1);
        this.refreshOrginalList();
    }

    get selectedmessage() {
        return this.selectedvalues.length + ' values are selected';
    }
      handleChange(event) {
        const selectedValue = event.detail.value;
        const selectedValueEvent = new CustomEvent('selected', { detail: { selectedValues: this.selectedvalues } });
        this.dispatchEvent(selectedValueEvent);
    }
}

