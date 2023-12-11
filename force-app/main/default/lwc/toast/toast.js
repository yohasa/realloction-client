import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class Toastdemo extends LightningElement {

    showError(){
        const evt = new ShowToastEvent({
            title : 'Error!',
            message : 'Toast Notification Demo !',
            variant : 'error'
        });
        this.dispatchEvent(evt);
    }
    showSuccess(){
        const evt = new ShowToastEvent({
            title : 'success!',
            message : 'Toast Notification Demo !',
            variant : 'success'
        });
        this.dispatchEvent(evt);
    }
    showWarning(){
        const evt = new ShowToastEvent({
            title : 'Warning!',
            message : 'Toast Notification Demo !',
            variant : 'warning'
        });
        this.dispatchEvent(evt);
    }
    showInfo(){
        const evt = new ShowToastEvent({
            title : 'Info!',
            message : 'Toast Notification Demo !',
            variant : 'info'
        });
        this.dispatchEvent(evt);
    }

}