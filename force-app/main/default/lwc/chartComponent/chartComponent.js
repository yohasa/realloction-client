// chartComponent.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class ChartComponent extends LightningElement {
    @api recordid;

    @wire(getRecord, { recordid: '$recordid', fields: ['ObjectName__c.Field1__c', 'ObjectName__c.Field2__c'] })
    wiredRecord({ error, data }) {
        if (data) {
            // Traitez les données pour construire le graphique Doughnut
            const field1Value = data.fields.Field1__c.value;
            const field2Value = data.fields.Field2__c.value;
            
            // Construisez la configuration du graphique Doughnut
            this.chartConfig = {
                type: 'donut',
                datasets: [{
                    data: [field1Value, field2Value],
                }],
                labels: ['Label 1', 'Label 2'],
            };
        } else if (error) {
            console.error(error);
        }
    }

    chartConfig;
}
