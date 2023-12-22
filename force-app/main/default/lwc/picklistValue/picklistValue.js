import { LightningElement, track, api } from 'lwc';

export default class App extends LightningElement {
    
    @api
    selected;
    // selected = false;
    
    @api
    label;
    
    @api
    value;

    handleSelect() {
        this.selected = !this.selected;

        const selectEvent = new CustomEvent('select', {
            detail: {
                value: this.value,
                selected: this.selected
            }
        });
        this.dispatchEvent(selectEvent);
    }

    // handleSelect(event) {
    //     //this.selected = true;
        
    //     if(this.selected){
    //         this.selected = false;
    //     }else{
    //         this.selected = true;
    //     } 
        
    // }
}

