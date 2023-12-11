import { LightningElement, wire } from 'lwc';
import getCtry from '@salesforce/apex/CmbxCountry.getCountries';
export default class cmbxCountry extends LightningElement {

   outvalue = '';
   keValCtry = [];

   @wire(getCtry)
   opt({error, data}){
    if(data){
    this.keValCtry = data.map(item=>({label:item.Name, value:item.Id}));
    }
    else if(error){console.error(error);}
    }

//    get options() {
//         return this.keValCtry;
//     }

    // connectedCallback(){
    //     getCtry()
    //     .then(result =>{
            // let arr = [];
            // for(var i=0; i<result.length ; i++){
            //     arr.push({label : result[i].Name, value : result[i].Id});
            // }
        //      this.keValCtry = arr;
        // })
        
    // }

    handleonchange(event){

        this.outvalue = event.detail.value;
    }
}