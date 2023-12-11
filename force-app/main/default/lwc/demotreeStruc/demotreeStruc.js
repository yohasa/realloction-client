import { LightningElement, track } from 'lwc';
import getAccountContactDetails from '@salesforce/apex/TreeDemo.getAccountDetails';
export default class DemotreeStruc extends LightningElement {

    @track gridColumns = [

        {label : 'Account Name', fieldName : 'Name'},
        {label : 'First Name', fieldName : 'FirstName'},
        {label : 'Last Name', fieldName : 'LastName'}
    ]

    @track gridData;

    connectedCallback(){

        getAccountContactDetails()
        .then(result =>{
            const temp = JSON.parse(JSON.stringify(result));

            for(var i=0 ; i<temp.length ; i++){
                var relatedContacts = temp[i]['Contacts'];
                if(relatedContacts){
                    temp[i]._children = relatedContacts ;
                    delete temp[i].Contacts; 
                }
            }
            this.gridData = temp;
            console.log('temp final data ...'+JSON.stringify(this.gridData));
        })
        .catch(error =>{
            console.error(error);
        })
    }
    handlerowselection(event){
        const selecteddata = event.detail.selectedRows;
        console.log('selected data...'+JSON.stringify(selecteddata));

        for(var i=0 ; i<selecteddata.length ; i++){
            console.log('First Name...'+selecteddata[i].FirstName);
            console.log('Last Name...'+selecteddata[i].LastName);
        }
    }
}