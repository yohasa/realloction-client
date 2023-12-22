import { LightningElement } from 'lwc';
import MyModal from "c/lwcmodal";
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';
import getAccounts3 from '@salesforce/apex/AppRealloc.GetAccounts3';


export default class Dynamicmodal extends LightningElement {
    consData;
    columns = [];
    // columns = [
    //     { label: 'First Name', fieldName: 'FirstName', type:'text' },
    //     { label: 'Last Name', fieldName: 'LastName', type: 'text' },
    //     { label: 'Name', fieldName: 'Name', type: 'text' },
    //     { label: 'Email', fieldName: 'Email', type: 'email' },
    // ];
     connectedCallback() {
        getAccounts3().then(res => {
            console.log('res => ', res);
            this.consData = res;
            this.configureColumns();
        })
            .catch(error => {
                console.log('error => ', error);
            });
    }
    async configureColumns() {
        // Logic to determine columns based on the response
        // For example, you can dynamically generate columns based on keys in the response object
        const keys = await Object.keys(this.consData[0]);
        this.columns = keys.map(key => {
            return { label: key, fieldName: key, type: 'text' };
        });
    }
    async handleContactData() {
        if (!this.columns.length) {
            // Data not yet loaded, maybe show a loading message or handle appropriately
            return;
        }
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
