import { LightningElement, track, api, wire } from 'lwc';
// import { Id } from 'lightning/utilities';
import getCountries from '@salesforce/apex/AppRealloc.GetCountries';
import getStores from '@salesforce/apex/AppRealloc.GetStores';
import getOwners from '@salesforce/apex/AppRealloc.GetOwners';
import getAccounts from '@salesforce/apex/AppRealloc.GetAccounts';
// import getPie from '@salesforce/apex/AppRealloc.GetPie';
import getReallocation2 from '@salesforce/apex/AppRealloc.Realloction2';
// import getReallocation from '@salesforce/apex/AppRealloc.GetReallocation';
// import getReallocation from '@salesforce/apex/ReallocationClientsController.execute';
// import getReallocation from '@salesforce/apex/AppRealloc.execute';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId';
import ACC_ID_FIELD from '@salesforce/schema/Account.Id';
import STR_ID_FIELD from '@salesforce/schema/Store__c.Id';



import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [ // Remplacer par vos colonnes
    { type: 'checkbox', fieldName: 'selectRow', initialWidthType: 5}, // Colonne de sélection
    { label: 'Id', fieldName: 'Id', type: 'Id', initialWidthType: 30},
    { label: 'LastName', fieldName: 'LastName', type: 'text', sortable: true, initialWidthType: 50},
    { label: 'FirstName', fieldName: 'FirstName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Mail', fieldName: 'PersonEmail', type: 'email', initialWidthType: 100 },
    { label: 'Segment', fieldName: 'Segment__c', type: 'text', sortable: true, initialWidthType: 40 },
    { label: 'Nom du magasin', fieldName: 'Main_Boutique__r.Nom_du_magasin__c', sortable: true, type: 'text', initialWidthType: 150 },
    { label: 'Nom Vendeur', fieldName: 'Owner.LastName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Prenom Vendeur', fieldName: 'Owner.FirstName', type: 'text', sortable: true, initialWidthType: 50 }
];




export default class AppReallocationProd extends LightningElement {

   
    // realloc = false;
    @track res1;
    @track valeurs;
    @track labs;
    value1;
    @track res2;
    value2;
    @track res3;
    value3;
    // @track lstCtry;
    @track res4;
    value4;
    value5;
    
    @track options1; // Définir les options pour la combobox 1
    @track isCombobox2Disabled = true;
    @track options2; // Définir les options pour la combobox 2
    @track isCombobox3Disabled = true;
    @track options3; // Définir les options pour la combobox 3
    @track isBtn = true;
    @track resBtn;
    
    // @track data;
    @track consData;
    @track datag = [];
    @track columnsg = columns;
    @track loadMoreOffset = 0;
    
    // @track isBtnSel = true;
    // @track isBtnAll = true;
    // @track resetSelection;
    
    @track mydata;
    @track filteredData;
    @track showTable = false;
    // @track allData;
    @track columns;
   
    filterableFields = ['LastName', 'Segment__c','FirstName', 'Owner.FirstName'];
    @track isCombobox4Disabled = false;
    // @track isCombobox4Disabled = true;
    @track options4; // Définir les options pour la combobox 4
    
    @track isCombobox5Disabled = true;
    @track options5; // Définir les options pour la combobox 5
    @track selectedvalues; // Définir les options pour la combobox 5
    
    @track options6; // Définir les options pour la combobox 5
    
    @track selectedRows=[];
    @track lstIdAccounts=[];
    @track newowner;
    @track newstors;
    @track sellername;
    @track namestore;
    // @track strOwner;
    // @track isBtnRealoc = true;
    @track showDialog = false;
    @track mymessage;
    // @track idLis
    // @track ids; // Définir les options pour la combobox 5
    

    async connectedCallback() {
        this.options1 = (await getCountries())
        .map(item=>({label:item.Name, value:item.Id}));
    }
    async handleCombobox1Change(event) {
        this.options2 = (await getStores({lstCtry: event.detail.value}))
        .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        this.isCombobox2Disabled = false; // Activer le deuxième combobox
    }
    async handleCombobox2Change(event) {
        this.options3 = (await getOwners({lstStors: event.detail.value}))
        .map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId}));
        this.isCombobox3Disabled = false; // Activer le combobox 3
    }
    
    async handleCombobox3Change(event) {
        this.resBtn = await getAccounts({lstOwner: event.detail.value});
        this.isBtn = false; // Activer le btn
    }
    async handleClickBnt(event) {
        console.log(JSON.stringify(this.resBtn));
        // this.consData = await Object.keys(this.resBtn[0]);
        // this.columnsg = await this.configureColumns(this.resBtn[0]);
        // this.datag = await this.loadData();
        this.filteredData  =  (await this.generateData(this.columnsg, this.resBtn));
        this.datag =  this.filteredData;
        this.showTable = true;
        // this.options4 = await this.res1.map(item=>({label:item.Name, value:item.Id}));
        this.options4 = this.options1;
        this.isCombobox4Disabled = false; // Activer le combobox 4
        // this.isBtnSel = false; // Activer le button reset selection
        this.isBtnAll = false; // Activer le button All selection
        
    }
//    async loadData(){ 
//         (await this.generateData(this.columnsg, this.resBtn))({ offset: this.loadMoreOffset })
//         .then(newData => {
//             this.data = this.data.concat(newData);
//             this.loadMoreOffset += 50;
//         })
//         .catch(error => {
//             console.error(error)
//         });
//     }
//     async handleScroll(event) {
//         const div = event.target;
//         if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
//             await this.loadData();
//         }
//     }
    
    generateData(columns, data) {
        return data.map(item => {
            const row = {};
            columns.forEach(column => {
                const fieldPath = column.fieldName.split('.');
                let value = item;
                
                // Traverse the nested structure to get the value
                for (const path of fieldPath) {
                    if (value && value.hasOwnProperty(path)) {
                        value = value[path];
                    } else {
                        value = null;
                        break;
                    }
                }
                row[column.fieldName] = value;
            });
            return row;
        });
    }
    handleResults(event){
        this.filteredData = event.detail.filteredData
    }
    handleRowSelection(event) {
        // Récupérez les lignes sélectionnées
        this.selectedRows = event.detail.selectedRows;
        // console.log(Object.keys(this.selectedRows[0]));
        // console.log(typeof this.selectedRows);
        // Récupérez les ID des lignes sélectionnées
        this.lstIdAccounts = this.selectedRows.map(row => row.Id);
        // Utilisez la liste d'ID comme nécessaire
        console.log(JSON.stringify(this.lstIdAccounts));
    }
    handleSelectAll(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedRows = [...selectedRows];
    }       
    
    
    // async  allSelection(event) {
    //     console.log(event.detail.LastName);
    // }
    
    async handleCombobox4Change(event) {
        // console.log(this.lstIdAccounts);
        // this.options5 = (await getStores({lstCtry: event.detail.value}))
        this.res4 = event.detail.value;
        this.options5 = (await getStores({lstCtry: this.res4}))
        .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        this.isCombobox5Disabled = false; // Activer le combobox 5
        console.log("New Owner: " + this.newowner);
    }  
    
    async handleCombobox5Change(event){
        console.log("L205: " );
        console.log(JSON.stringify(this.selectedvalues));
        console.log("L207: " );
        // console.log(JSON.stringify(this.selectedvalues));

        console.log("New event: " + event.detail.value);
        console.log("New event: " + this.selectedvalues);
        const owners = await getOwners({lstStors: event.detail.value});
        // const owners = await getOwners({lstStors: event.detail.selectedvalues});
        this.options6 = owners.map(item => ({
            id: item.OwnerId,
            storeName: item.Nom_du_magasin__c,
            storeId: item.Main_Boutique__c,
            seller: item.FirstName+ ' (' + item.accountCount + ')',
            sellerName: item.FirstName + ' ' + item.LastName + ' (' + item.accountCount + ')'
        }));
    }
    handleOwnerSelection(event){
            this.newowner = event.target.value;
            let strId = STR_ID_FIELD.fieldApiName;
            this.newstors = strId.substring(2, 15) +  event.target.dataset.storeId;
            // this.newstors = event.target.dataset.storeId;
            // this.newstors = event.target.dataset.storeId;
            // let ownerId = OWNER_ID_FIELD.fieldApiName;
            this.sellername = event.target.dataset.sellerName;
            this.namestore = event.target.dataset.storeName;
            
            console.log("New Owner: " + this.newowner);
            console.log("New Store: " + this.newstors);
            console.log("Seller Name: " + this.sellername);
            console.log("Name Store: " + this.namestore);
        }
        
        // this.newowner = event.target.value;
        // console.log(JSON.stringify(event.target.value));
        // this.newstors = event.target.value.storeId;
        // console.log(JSON.stringify(event.target.storeId));
        // this.strOwner = JSON.stringify(event.target.value);
        // console.log("03");
        // console.log(this.newowner);
        // console.log(typeof this.newowner);
    // }
    // console.log(typeof owner2);
    // console.log("02");
    // console.log(JSON.stringify(event.target));
    get isBtnRealoc() {
        // Utilisez cette fonction pour déterminer la classe conditionnelle du bouton
        // return this.lstIdAccounts.length > 0 && this.newowner !== '' ?  false : true;
        return this.lstIdAccounts.length > 0 && this.newowner !== undefined ?  false : true;
    }
    handleClickBntRealoc(event){
        this.mymessage = "Êtes-vous sûr de vouloir effectuer cette action ? \n Realloction de "+this.lstIdAccounts.length+" Clients pour le Vendeur: "+this.sellername +", de la "+this.namestore+" ?";
        this.showDialog = true;
        console.log('newowner: ', this.newowner);
        console.log('newstors: ', this.newstors);
        console.log('lstIdAccounts: ', this.lstIdAccounts);

    }
    handleCancel() {
        this.showDialog = false;
        // Logique à exécuter en cas d'annulation
    }

    // Appeler la classe Apex
   //  reallocClient({ lstIdAccounts: this.lstIdAccounts, newOwnerId: this.newowner })
   // reallocateClients({ lstIdAccounts: this.lstIdAccounts, newOwnerId: this.newowner, newStorsId: this.newstors })
   async handleConfirm() {
       await getReallocation2({ 
            lstIdAccounts: this.lstIdAccounts, 
            newOwnerId: this.newowner, 
            newStorsId: this.newstors 
        })
        .then(result => {
            // Traitement des résultats si nécessaire
            this.showDialog = false;
            this.showToast();
            this.refrech();
            
        })
        .catch(error => {
            // Gestion des erreurs
            console.error(error);
            this.showDialog = false;
        });
    }
    showToast(){
            this.dispatchEvent(
    new ShowToastEvent({
            title:'Success',
        message: this.lstIdAccounts.length +' Successed Realloction',
        variant:'success'
    })
)
}
async refrech(){
    this.options5 = (await getStores({lstCtry: this.res4}))
            .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
}

    // await this.reall();
    // reallocateClients({ lstIdAccounts: this.selectedIds, newOwnerId: this.newowner, newStorsId: this.newstors })
    //  .then(result => {
    //      // Traitement des résultats si nécessaire
    //      console.log(result);
    //  })
    //  .catch(error => {
    //      // Gestion des erreurs
    //  });
    
    
    // async reall() {
    //     await this.reallocClient({ lstIdAccounts: this.selectedIds, newOwnerId: this.newowner});
        
    // }

    // const newOwnerId = this.newowner;
    // const newStorsId = Id.valueOf(this.newstors); // Convertir la chaîne en un objet ID
    // await this.realloc({ lstIdAccounts: this.selectedIds, newOwnerId: this.newowner, newStorsId: this.newstors });
    // await this.realloc({lstIdAccounts: this.selectedIds, newOwnerId: this.newowner, newStorsId: this.newstors});
    // this.showDialog = false;
    // await this.showToast()


    // async handleMouseOver(event) {
    //     console.log(event.detail.selectedIds);
    //     this.res1 = await getPie({ ownerIds: event.target.value});
    //     this.valeurs = await this.res1.map(item => item.val);
    //     // this.totalvaleurs = await this.valeurs.reduce((a, b) => a + b, 0).toString();
    //     this.totalvaleurs = await this.valeurs.reduce((a, b) => a + b, 0);
    //     this.labs = await this.res1.map(item => item.Segment__c +' ('+ item.val + ' / ' + this.totalvaleurs + ')');
    //     // function myFunction() {
    //         if(this.labs!=null) {
    //             const popupComponent = this.template.querySelector("myPopup");
    //             popupComponent.classList.toggle("show");
    //             //   }
    //             // const popupComponent = await this.template.querySelector('[data-popup]');
    //             if (popupComponent) {
    //                 popupComponent.style.display = 'block';
    //             } else {
    //                 this.showToast('Erreur', 'Composant popup non trouvé.', 'error');
    //             }
    //         }
            
    //     }
        
    //     async handleMouseLeave(event) {
    //         const popupComponent = await this.template.querySelector('[data-popup]');
    //         if (popupComponent) {
    //             popupComponent.style.display = 'none';
    //         }
    //     }
        
        
    }
        
        
        
        
        
        
        
        
        
        
        
        
        // this.res1 = await getCountries();
        // this.options1 = await this.res1.map(item=>({label:item.Name, value:item.Id}));
        // this.value1 = event.detail.value;
        // this.res2 = await getStores({lstCtry: this.value1});
        // this.options2 = await this.res2.map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        // this.options2 = (await getStores({lstCtry: this.value1})).map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        // this.value2 = event.detail.value;
        // this.res3 = await getOwners({lstStors: this.value2});
        //         console.log(JSON.stringify(this.res3));
        //         this.options3 = await this.res3.map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId}));
        // fetchSelectedValues(){
        // }
                // let selections = await this.template.querySelector('c-mutli-select-picklist');
                // console.log(selections.values);
                // this.value3 = selections.values;
                // alert(JSON.stringify(this.value3));
                // this.value3 = event.detail.value;
                // this.resBtn = await getAccounts({lstOwner: this.value3});
        // configureColumns(data, prefix = '') {
            //     const columns = [];
            //     // this. columns = [];
                //     for (const key in data) {
                //         if (typeof data[key] === 'object' && data[key] !== null) {
                //             // If the value is an object, recursively call configureColumns with the nested data
                //             columns.push(...this.configureColumns(data[key], `${prefix}${key}.`));
                //         } else {
                //             // If the value is not an object, create a column for the current key
                //             columns.push({ label: `${prefix}${key}`, fieldName: `${prefix}${key}`, type: 'text' });
                //         }
                //     }
                //     return columns;
                // }
        // resetSelection(event) {
            //     // console.log(event.detail);
                    
                //     this.selectedRows = [];
                // }
                // alert(JSON.stringify(this.selectedRows));
            //    await console.log(this.selectedRows.target.map((row)=> row.id));
                // Assuming datag is the array containing all the rows
                // this.selectedRows = [...this.datag];
                // configureColumns() {
                //     const flattenObject = (obj, parentKey = '') => {
                //         return Object.entries(obj).reduce((acc, [key, value]) => {
                //             const newKey = parentKey ? `${parentKey}.${key}` : key;
                //             if (typeof value === 'object' && value !== null) {
                //                 acc = { ...acc, ...flattenObject(value, newKey) };
                //             } else {
                //                 acc[newKey] = value;
                //             }
                //             return acc;
                //         }, {});
                //     };
                
                //     // Flatten the first object in the array to handle nested properties
                //     const flattenedData = flattenObject(this.consData[0]);
                
                //     // Create columns based on flattened keys
                //     const keys = Object.keys(flattenedData);
                //     this.columnsg = keys.map(key => {
                //         return { label: key, fieldName: key, type: 'text' };
                //     });
        // }
                // this.value4 = event.detail.value;
                // this.res5 = await getStores({lstCtry: this.value4});
                // this.options5 = await this.res5.map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
                // async handleCombobox5Change(event){
                //     this.options6 = (await getOwners({lstStors: event.detail.value}))
                //     .map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId}));
                // }
        // handleSelectedIds(event) {
            //     const selectedIds = event.detail.selectedIds;
            //     console.log('ID sélectionnés dans le composant parent:', selectedIds);
            // }
            

    