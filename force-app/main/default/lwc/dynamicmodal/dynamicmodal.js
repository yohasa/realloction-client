import { LightningElement } from 'lwc';
import MyModal from "c/lwcmodal";
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';

export default class Dynamicmodal extends LightningElement {
    consData;

    columns = [
        { label: 'First Name', fieldName: 'FirstName', type:'text' },
        { label: 'Last Name', fieldName: 'LastName', type: 'text' },
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
    ];
    connectedCallback() {
        getContacts().then(res => {
            console.log('res => ', res);
            this.consData = res;
        })
            .catch(error => {
                console.log('error => ', error);
            });
    }

    async handleContactData() {
        const result = await MyModal.open({
            label: 'Contact Data',
            size: 'large',
            columns: [...this.columns],
            conData : [...this.consData]
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log('result ==> ',result);
    }
}
