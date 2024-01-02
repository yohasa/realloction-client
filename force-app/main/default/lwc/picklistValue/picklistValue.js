/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from 'lwc';

export default class App extends LightningElement {
    
    @api
    selected = false;
    // @track selected;
    
    @api
    label;
    
    @api
    value;

    // handleSelect() {
    //     // this.selected = true;
    //     if(this.selected){
    //                 this.selected = false;
    //             }else{
    //                 this.selected = true;
    //             } 
        // this.selected = !this.selected;

        // const selectEvent = new CustomEvent('select', {
        //     detail: {
        //         value: this.value,
        //         selected: this.selected
        //     }
        // });
        // this.dispatchEvent(selectEvent);
    // }

    // handleSelect(event) {
    //     //this.selected = true;
        
    //     if(this.selected){
    //         this.selected = false;
    //     }else{
    //         this.selected = true;
    //     } 
        
    // }
}

