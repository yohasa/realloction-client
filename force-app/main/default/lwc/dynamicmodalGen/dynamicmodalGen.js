import { LightningElement } from 'lwc';
import MyModal from "c/lwcmodal";
import getContacts from '@salesforce/apex/LWCExampleController.getContacts';

export default class dynamicmodalGen extends LightningElement {
    consData;
    columns = [];

    connectedCallback() {
        getContacts().then(res => {
            console.log('res => ', res);
            this.consData = res;
            this.configureColumns();
        })
        .catch(error => {
            console.log('error => ', error);
        });
    }

    configureColumns() {
        // Logic to determine columns based on the response
        // For example, you can dynamically generate columns based on keys in the response object
        const keys = Object.keys(this.consData[0]);
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

        console.log('result ==> ',result);
    }
}
