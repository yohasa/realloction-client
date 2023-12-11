import { LightningElement, track, api, wire } from 'lwc';
import getCtry from '@salesforce/apex/CmbxCountry.getCountries';
import getStrs from '@salesforce/apex/CmbxStore.getStores';

export default class App extends LightningElement {
    @track valuees;
    @track values = [];
    @track valSt = [];
    @track res;
    // Supposons que response soit la chaîne JSON renvoyée par Apex
    //     connectedCallback()  {
        //         temp = this.res.json();
        //         console.log(this.temp);
        //  }
        
        
        
        // @track countries = [];
        
        // connectedCallback() {
        //     // @wire(this)
        //     // this.res = response.getCtry();
        // }
        // renderedCallback(){
        //     this.loadCountries();
            
        // }

        // showToast(){
        //     this.toast{
        //         title
        //     }
        // }
    //     loadCountries() {
    //         // Appelez votre méthode Apex via fetch
    //       var temp = res.json();
    //             // Convertissez les données en un format adapté à votre besoin
    //             this.countries = temp.map(item => ({ label: item.Name, value: item.Id }));
    //             throw new Error(`HTwewwwwwwatus: ${response.status}`);
                    
    //         console.log(JSON.stringify(this.countries));// <=============
    // // ... le reste de votre composant
}

//  let countries = JSON.parse(res);

// Maintenant, vous pouvez utiliser la méthode map pour créer votre tableau d'objets avec label et value
// this.values = res.map(item => ({ label: item.Name, value: item.Id }));

    // arr = []; //

    // //This array can be anything as per values
// values =    [{label : 'New', value : 'New', selected : false},
//             {label : 'In progress', value : 'In Progress', selected : false},
//             {label : 'Completed', value : 'Completed'},
//             {label : 'Canceled', value : 'Canceled'},
//             {label : 'Aborted', value : 'Aborted'}];
    // @wire(getCtry)
    // opt({error, data}){
    //  if(data){
    //     console.log(data);
        // var tem = getCtry();
    //   = JSON.stringify(.map(item=>({label:item.Name, value:item.Id})));
    //  this.values = data.map(item=>({label:item.Name, value:item.Id}));
    //  console.log('ligne 23 :', this.values);
    //  console.log('Json.Stringify : ', JSON.stringify(this.values));
    //  let temp = JSON.stringify(this.values);
    //  let temp2 = this.values.map(item => item.value);
    //  this.valuees = JSON.stringify(temp2);
    //  console.log('ligne 25 : ' , this.valuees);
    //  let temp3 = getStrs(this.values);
    //  this.valSt = temp3.map(item=>({label:item.Nom_du_magasin__c, value:item.Id}));

    //  console.log('Json.Stringify : ', JSON.stringify(this.valuees));
     

    //  } else if(error){console.error(error);}
    //  }
    //  @wire(getStrs, { param: '$valuees' })
    //  ot({error, data}){
    //   if(data){
    //   this.valSt = data.map(item=>({label:item.Nom_du_magasin__c, value:item.Id}));
    //   } else if(error){console.error(error);}
    //   }

    //To get the picklist values in container component
    fetchSelectedValues(){
        this.valuees = this.values.map(item => item.value);
        let selections = this.template.querySelector('c-mutli-select-picklist');
    //    this.arr=selections.values;
        console.log(selections.values);
    }
}