import { LightningElement, api } from 'lwc';
// import generateData from './generateData';
//   @api data;

// const columns = [
//     { label: 'Label', fieldName: 'name' },
//     { label: 'Website', fieldName: 'website', type: 'url' },
//     { label: 'Phone', fieldName: 'phone', type: 'phone' },
//     { label: 'Balance', fieldName: 'amount', type: 'currency' },
//     { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
// ];


export default class DataTable extends LightningElement {
    @api columns;
    @api mydata;

    connectedCallback() {
        // const data = generateData({ amountOfRecords: 100 });
        // this.data = data;
    }

}