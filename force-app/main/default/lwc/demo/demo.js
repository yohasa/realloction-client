import { LightningElement, track, api, wire } from 'lwc';
import getCountries from '@salesforce/apex/AppRealloc.GetCountries';
import getStores from '@salesforce/apex/AppRealloc.GetStores';
import getOwners from '@salesforce/apex/AppRealloc.GetOwners';
import getAccounts from '@salesforce/apex/AppRealloc.GetAccounts';
import getPie from '@salesforce/apex/AppRealloc.GetPie';
import realloc from '@salesforce/apex/AppRealloc.Realloc';


import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Demo extends LightningElement {
    @track res1;
    @track resBtn;
    @track options1 = []; // Définir les options pour la combobox 1
    value1;
    // @track lstCtry;
    @track res2;
    @track isCombobox2Disabled = true;
    @track options2; // Définir les options pour la combobox 2
    value2;
    
    @track res3;
    @track isCombobox3Disabled = true;
    @track options3; // Définir les options pour la combobox 3
    value3;
    @track isBtn = true;
    
    @track mydata;
    @track showTable = false;
    @track isCombobox4Disabled = true;
    @track options4; // Définir les options pour la combobox 4
    value4;
    
    @track isCombobox5Disabled = true;
    @track options5; // Définir les options pour la combobox 5
    value5;

    // @track idLis
    

    async connectedCallback() {
        this.res1 = await getCountries();
        this.options1 = await this.res1.map(item=>({label:item.Name, value:item.Id}));
        // this.options1 = await getCountries().map(item=>({label:item.Name, value:item.Id}));
    }

    // async renderedCallback(){
    //     alert(JSON.stringify(this.options1));

    //      };



        // await getCountries()
        // .then(result => {
        //     Object.keys(result).map(profile => {
        //         this.options1.push({ Id: this.result[profile].value, Name: this.result[profile].label });
        //     })
        // this.lstCtry = this.result.map(profile => profile.Id);

            // for (var i = 0; i < result.length; i++) {
            //     this.options1.push({label: result[i].Name, value: result[i].Id});
            //     alert(result[i].Name);

            // }

        // })

        // .catch(error => {

        //     alert(JSON.stringify(error));

        // });

    // };



    async handleCombobox1Change(event) {
        // alert(event.detail.value);
        // alert(JSON.stringify(event.detail));
        this.value1 = event.detail.value;
        // this.value1 = "'"+event.detail.value+"'";
        // this.lstCtry = await event.detail.value;
        // alert(this.value1);
        // alert(typeof this.value1);
        this.res2 = await getStores({lstCtry: this.value1});
        // this.options2 = await this.res2.map(item=>({label:item.Nom_du_magasin__c, value:item.Id}));
        this.options2 = await this.res2.map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        this.isCombobox2Disabled = false; // Activer le deuxième combobox

        // alert(this.lstCtry);
        // await Getoption2();
        // this.value1 = JSON.stringify(event.detail);
        // this.res2 = await getStores(this.value1);
        // this.res2 = await getStores(event.detail.value);
    }
    
    // async Getoption2() {
        // alert(this.res2);
        // Mettre à jour les options pour le combobox 2 en fonction de la valeur sélectionnée dans le combobox 1

    // }

    async handleCombobox2Change(event) {
        this.value2 = event.detail.value;
        this.res3 = await getOwners({lstStors: this.value2});
        // await getOwners()
        // .then(result => {
            //     Object.keys(result).map(profile => {
                //         this.options1.push({ Id: this.result[profile].value, Name: this.result[profile].label });
                //     })
                console.log(JSON.stringify(this.res3));
                // alert(typeof this.res3);
                this.options3 = await this.res3.map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId}));
                
                
                this.isCombobox3Disabled = false; // Activer le combobox 3
                
            }
            async handleCombobox3Change(event) {
                this.value3 = event.detail.value;
                // alert(JSON.stringify(this.value3));
                this.resBtn = await getAccounts({lstOwner: this.value3});
                this.isBtn = false; // Activer le btn
                // const columns = [
                //     { label: 'Client Name', fieldName: 'lsnmfnm' },
                //     { label: 'Segement', fieldName: 'seg' },
                //     { label: 'Mail', fieldName: 'mail', type: 'url' },
                //     // { label: 'Phone', fieldName: 'phone', type: 'phone' },
                //     // { label: 'Balance', fieldName: 'amount', type: 'currency' },
                //     // { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
                //     // { label: 'Boutique', fieldName: 'store' },
                //     { label: 'Owner', fieldName: 'owlnmfnm' }
                // ];
                
            }
            async handleClickBnt(event) {
                alert(JSON.stringify(this.resBtn));
                console.log(JSON.stringify(this.resBtn));
                this.mydata = await this.resBtn;
                // .map(item=>({lsnmfnm:item.LastName+' '+item.FirstName, seg:item.Segment__c, mail:item.PersonEmail, store:item.Nom_du_magasin__c,owlnmfnm:item.OwnerId}));
                this.showTable = true;
                // this.res4 = await getCountries();
                this.options4 = await this.res1.map(item=>({label:item.Name, value:item.Id}));
                this.isCombobox4Disabled = false; // Activer le combobox 4

    }
    async handleCombobox4Change(event) {
        this.value4 = event.detail.value;
        // alert(JSON.stringify(this.value4));

        this.res5 = await getStores({lstCtry: this.value4});
        this.options5 = await this.res5.map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        this.isCombobox5Disabled = false; // Activer le combobox 5
        
    }   
    handleSelectedIds(event) {
        const selectedIds = event.detail.selectedIds;
        // Faites quelque chose avec les ID sélectionnés dans le composant parent
        console.log('ID sélectionnés dans le composant parent:', selectedIds);
    }





























    showToast(){
        this.dispatchEvent(
            new ShowToastEvent({
                title:'Success',
                message:'Successed Realloction',
                variant:'success'
            })
        )
    }




}
//     @track res1;
//     @track resBtn;
//     @track values1 = [];
//     @track selectedvalues1 = [];
//     // Supposons que response soit la chaîne JSON renvoyée par Apex
//     //     connectedCallback()  {
//         //         temp = this.res.json();
//         //         console.log(this.temp);
//         //  }
        
        
        
//         // @track countries = [];
        
//         // connectedCallback() {
//         //     // @wire(this)
//         //     // this.res = response.getCtry();
//         // }
//         // renderedCallback(){
//         //     this.loadCountries();
            
//         // }

//         // showToast(){
//         //     this.toast{
//         //         title
//         //     }
//         // }
//     //     loadCountries() {
//     //         // Appelez votre méthode Apex via fetch
//     //       var temp = res.json();
//     //             // Convertissez les données en un format adapté à votre besoin
//     //             this.countries = temp.map(item => ({ label: item.Name, value: item.Id }));
//     //             throw new Error(`HTwewwwwwwatus: ${response.status}`);
                    
//     //         console.log(JSON.stringify(this.countries));// <=============
//     // // ... le reste de votre composant
// }

// //  let countries = JSON.parse(res);

// // Maintenant, vous pouvez utiliser la méthode map pour créer votre tableau d'objets avec label et value
// // this.values = res.map(item => ({ label: item.Name, value: item.Id }));

//     // arr = []; //

//     // //This array can be anything as per values
// // values =    [{label : 'New', value : 'New', selected : false},
// //             {label : 'In progress', value : 'In Progress', selected : false},
// //             {label : 'Completed', value : 'Completed'},
// //             {label : 'Canceled', value : 'Canceled'},
// //             {label : 'Aborted', value : 'Aborted'}];
//     // @wire(getCtry)
//     // opt({error, data}){
//     //  if(data){
//     //     console.log(data);
//         // var tem = getCtry();
//     //   = JSON.stringify(.map(item=>({label:item.Name, value:item.Id})));
//     //  this.values = data.map(item=>({label:item.Name, value:item.Id}));
//     //  console.log('ligne 23 :', this.values);
//     //  console.log('Json.Stringify : ', JSON.stringify(this.values));
//     //  let temp = JSON.stringify(this.values);
//     //  let temp2 = this.values.map(item => item.value);
//     //  this.valuees = JSON.stringify(temp2);
//     //  console.log('ligne 25 : ' , this.valuees);
//     //  let temp3 = getStrs(this.values);
//     //  this.valSt = temp3.map(item=>({label:item.Nom_du_magasin__c, value:item.Id}));

//     //  console.log('Json.Stringify : ', JSON.stringify(this.valuees));
     

//     //  } else if(error){console.error(error);}
//     //  }
//     //  @wire(getStrs, { param: '$valuees' })
//     //  ot({error, data}){
//     //   if(data){
//     //   this.valSt = data.map(item=>({label:item.Nom_du_magasin__c, value:item.Id}));
//     //   } else if(error){console.error(error);}
//     //   }

//     //To get the picklist values in container component
//     fetchSelectedValues(){
//         this.valuees = this.values.map(item => item.value);
//         let selections = this.template.querySelector('c-mutli-select-picklist');
//     //    this.arr=selections.values;
//         console.log(selections.values);
//     }
// }