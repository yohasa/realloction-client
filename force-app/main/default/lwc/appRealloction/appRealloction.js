import { LightningElement, track, api, wire } from 'lwc';
import getCountries from '@salesforce/apex/AppRealloc.GetCountries';
import getCountryStores from '@salesforce/apex/AppRealloc.GetCountryStores';
import getStores from '@salesforce/apex/AppRealloc.GetStores';
import getOwners from '@salesforce/apex/AppRealloc.GetOwners';
import getOwnersCard from '@salesforce/apex/AppRealloc.GetOwnersCard';
// import getAccounts from '@salesforce/apex/AppRealloc.GetAccounts';
import getAccounts2 from '@salesforce/apex/AppRealloc.GetAccounts2';
// import getPie from '@salesforce/apex/AppRealloc.GetPie';
import getReallocation2 from '@salesforce/apex/AppRealloc.Realloction2';
// import STR_ID_FIELD from '@salesforce/schema/Store__c.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';

const columns = [ 
    { label: 'Id', fieldName: 'Id', type: 'Id', initialWidthType: 30},
    { label: 'LastName', fieldName: 'LastName', type: 'text', sortable: true, initialWidthType: 50},
    { label: 'FirstName', fieldName: 'FirstName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Mail', fieldName: 'PersonEmail', type: 'email', initialWidthType: 100 },
    { label: 'Segment', fieldName: 'Segment__c', type: 'text', sortable: true, initialWidthType: 40 },
    { label: 'Nom du magasin', fieldName: 'Nom_du_magasin__c', sortable: true, type: 'text', initialWidthType: 150 },
    { label: 'Nom Vendeur', fieldName: 'OwLaName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Prenom Vendeur', fieldName: 'OwFiName', type: 'text', sortable: true, initialWidthType: 50 }
];

export default class AppRealloction extends NavigationMixin (LightningElement) {
    @wire(getCountries) countries;
    get countryData() {
        if (this.countries.data) {
            return  this.countries.data.map(country => ({
                value: country.Id,
                label: country.Name,
            }));
        }
        return [];
    }
    // id: country.Id,
    // value: country.Name,

    @track res1 = null;
    @track valeurs;
    @track dis1;
    @track labs;
    @track inver = true;
    // @track selectedValues = [];
    // get selectedValuesString() {
    //     return this.selectedValues.join(', ');
    // }

    handleSelectedValues(event) {
        console.log('handleSelected :');
        console.log('handleSelected :', event.detail);
        console.log('handleSelected === :');

    console.log('handleSelected :', event.detail.selectedValues);
    // console.log('handleSelected :', event.data.selectedValues);
    // console.log('handleSelected :', event.data.selectedValues);
        //     this.selectedValues = event.detail.selectedValues;
    }
    @track res2;
    @track
    value2="";
    @track res3;
    value3;
    @track res4;
    value4;
    value5;
    
    @track options1= []; // Définir les options pour la combobox 1
    @track isCombobox2Disabled = true;
    @track options2 = []; // Définir les options pour la combobox 2
    @track isCombobox3Disabled = true;
    @track options3 = []; // Définir les options pour la combobox 3
    @track isBtn = true;
    @track isBtnGetAcc = true;
    @track resBtn;
    
    @track consData;
    @track datag = [];
    @track columnsg = columns;
    error;
    // totalNumberOfRows = 200;
    // offSetCount = 0;
    // loadMoreStatus;
    // targetDatatable;
    // @track loadMoreOffset = 0;
    
    
    @track mydata;
    @track filteredData;
    @track showTable = false;
    @track columns;
    rowLimit = 25;
    @track rowOffset = 0;
   
    filterableFields = ['LastName', 'Segment__c','FirstName', 'Owner.FirstName'];
    @track isCombobox4Disabled = false;
    @track options4; // Définir les options pour la combobox 4
    
    @track isCombobox5Disabled = true;
    @track options5; // Définir les options pour la combobox 5
    // @track selectedvalues; // Définir les options pour la combobox 5
    
    @track options6; // Définir les options pour la combobox 5
    @track isTooltipVisible = false;
    chart;
    chartInitialized = false;


    @track selectedRows=[];
    @track lstIdAccounts=[];
    @track recordId;
    @track newowner;
    @track newstors;
    @track sellername;
    @track namestore;
    @track showDialog = false;
    @track isCards = true;
    @track mymessage;
    // @track isCheckedMap = {};
    @track modalClass = 'modal';
    @track counstol;
    @track labelButton = 'Clients'
    // openModal() {
    //   this.modalClass = 'modal show';
    // }
    // closeModal() {
    //   this.modalClass = 'modal';
    // }
    // constlistSegName = ["Super Elite (13)","Elite (10)","VVIC (11)","VIC (13)","VGC (13)","GC (13)","Prospect (15)","Inactive (13)"];
    // constArrValSeg = [13,10,11,13,13,13,15,13];
    // @track currentOptions = [];
    // @track selectedItems = [];
    // @track selectedOptions = [];
    // resetMultiCombobox() {
    //     // Réinitialiser les options
    //     this.options1 = [];
    //     this.options2 = [];
    //     this.options3 = [];
    
    //     // Remonter le composant en changeant la clé
    //     this.keyForMultiCombobox += 1;
    // }
    async connectedCallback() {
        this.options1 = (await getCountries())
        .map(item=>({label:item.Name, value:item.Id}));
        // this.options1 = (await this.countryData());
        // this.counstol = (await this.getCountryStores());
    }
    // get revr(){
    //     return true
    //     // const comboboxId = event.target.auraId;
    //     // console.log(comboboxId);
    //     // const comboboxToReset = this.template.querySelector(`[aura:id='combobox2']`);
    //     // Réinitialisez le combobox spécifique
    //     // comboboxToReset.resetFlag = !comboboxToReset.resetFlag;
    // }
    reset1(){
        this.revr = !this.revr;
        console.log("this.revr : " + JSON.stringify(this.revr));


        const comboboxEvent = new CustomEvent('resett');
        // `[aura:id='${comboboxId}']`
        this.template.querySelector(`[aura:id='combobox2']`).dispatchEvent(comboboxEvent);
        // let test =  this.template.querySelector('c-multi-combobox')[1]
        // console.log("this.test : " + JSON.stringify(this.test));
      
        // const comboboxId = event.target.auraId;
        // console.log("comboboxId : " + JSON.stringify(comboboxId));
        // console.log(comboboxId);


        // const comboboxToReset = this.template.querySelector(`[aura:id='combobox2']`);
        // console.log('comboboxToReset : ' + JSON.stringify(comboboxToReset));
        // // console.log(comboboxToReset);

        // // const comboboxToReset = this.template.querySelector(`[aura:id='${comboboxId}']`);
        // // Réinitialisez le combobox spécifique
        // comboboxToReset.resetFlag = !comboboxToReset.resetFlag;
        // console.log('comboboxToReset.resetFlag : ' + JSON.stringify(comboboxToReset.resetFlag));
    }
    async handleCombobox1Change(event) {
        // this.res1 = (event.target.value).split(";");
        // this.res1 = (event.target.value);
        // refreshApex(this.options2=[]);
        
        this.res1 = (event.detail);
        console.log(JSON.stringify(event.detail));
        // let result = this.res1.map(function(item) {
            //     return item.value;
            // });
            let result = this.res1.map(item => item.value);
            // console.log("result : ");
            // console.log(result);
            console.log("resultSTRING : ");
            console.log(JSON.stringify(result));
            // const comboboxToReset = await this.template.querySelector(`[label='Stors']`);
            
            this.isCombobox2Disabled = false; // Active le deuxième combobox
            // Réinitialisez le combobox spécifique
            // comboboxToReset.resetFlag = await !comboboxToReset.resetFlag;
              this.options2 = (await getStores({lstCtry: result}))
//   this.options2 = (await getStores({lstCtry: (event.detail).map(item => item.value)}))
        .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        // console.log(JSON.stringify((event.detail).map(item => item.id)));
        // this.lstIdAccounts = this.selectedRows.map(row => row.Id);
        console.log("this.storeOptions");
        console.log(JSON.stringify(this.options2));
        // await console.log(JSON.stringify(this.counstol));
        // console.log(JSON.stringify(event.currentOptions));
        // console.log(JSON.stringify(this.currentOptions));
        // console.log(JSON.stringify(this.selectedItems));
        // console.log(JSON.stringify(this.selectedOptions));
        // console.log(event.detail.selectedOptions);
        // console.log(typeof event.target.selectedOptions);
        // this.options2 = (await getStores({lstCtry: this.res1}))
        // .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        // refreshApex(this.options2);
        // refreshApex(this.value2);
        // this.isCombobox2Disabled = !this.options2 || this.options2.length === 0;
    }
   
    async handleCombobox2Change(event) {
        this.res2 = (event.detail).map(item => item.value);
        console.log(JSON.stringify(this.res2));

        this.isCombobox3Disabled = false; // Active le combobox 3


        // console.log(JSON.stringify(event.detail));
        // console.log(JSON.stringify(event.detail.value.split(";")));
        // let result = this.res2.map(function(item) {
        //     return item.value;
        // });

        // this.dis1 = true;
        // this.dis1 = false;
        // this.options3 = (await getOwners({lstStors: event.detail.value.split(";")}))
        this.options3 = (await getOwners({lstStors: this.res2}))
        .map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId, accountCount:item.accountCount,
    store:{label:item.Nom_du_magasin__c, value:item.Main_Boutique__c},country:{label:item.Name, value:item.Code_ISO3__c}
    // store:{label:item.Name, value:item.Code_ISO3__c},country:{label:item.Name, value:item.Code_ISO3__c}
    }));
        // // this.value3 = '';
        this.isBtn = false; // Activer le btn
    }
    
    async handleCombobox3Change(event) {
        // this.resBtn = event.detail.value.split(";");

        this.res3 = (event.detail);
        console.log(JSON.stringify(event.detail));
        
        let total = event.detail.reduce((acc, item) => acc + item.accountCount, 0);
        console.log("Total accountCount : ", total);
        this.labelButton = total + " Clients"
         
         let optionFilterCountry = (event.detail).map(item=>({label:item.country.label, value:item.country.value}));
         console.log("optionFilterCountry : ");
         console.log(JSON.stringify(optionFilterCountry));

         let optionFilterCountryUnique = Array.from(new Set(event.detail.map(item => JSON.stringify(item.country))))
         .map(json => JSON.parse(json))
         .map(item => ({ label: item.label, value: item.value }));
         console.log("optionFilterCountryUnique : ");
         console.log(JSON.stringify(optionFilterCountryUnique));


         let optionFilterStors = (event.detail).map(item=>({label:item.store.label, value:item.store.value}));
         console.log("optionFilterStors : ");
         console.log(JSON.stringify(optionFilterStors));
        
         let optionFilterStorsUnique = Array.from(new Set(event.detail.map(item => JSON.stringify(item.store))))
         .map(json => JSON.parse(json))
         .map(item => ({ label: item.label, value: item.value }));
        console.log("optionFilterStorsUnique : ");
        console.log(JSON.stringify(optionFilterStorsUnique));

        let result = this.res3.map(function(item) {
            return item.value;
        });


        this.resBtn = await getAccounts2({lstOwner: result});
        // this.resBtn = await getAccounts2({lstOwner: event.detail.value.split(";")});
        this.isBtnGetAcc = false; // Activer le btn
        // this.filteredData  =  (await this.generateData(this.resBtn));
        // this.filteredData  =  (await this.generateData(this.resBtn));
        this.filteredData = this.resBtn.map(item => ({
            Id: item.Id,
            LastName: item.LastName,
            FirstName: item.FirstName,
            PersonEmail: item.PersonEmail,
            Segment__c: item.Segment__c,
            Nom_du_magasin__c: item.Main_Boutique__r.Nom_du_magasin__c,
            OwLaName: item.Owner.LastName,
            OwFiName: item.Owner.FirstName,
            // chartConfig: this.GetChartConfig(item.OwnerId)
        }));
        // this.datag =  this.filteredData;
        // this.showTable = true;
    }
    async handleClickBnt(event) {
        console.log(JSON.stringify(this.resBtn));
        console.log(JSON.stringify(this.options2));
        console.log(JSON.stringify(this.options3));
        this.datag =  [...this.filteredData];
        this.showTable = true;
        // await this.getRecords();
        // this.options4 = this.options1;
        this.resetMultiCombobox();
        // this.loadMoreOffset = 0;

        // console.log(JSON.stringify(this.resBtn));
        // this.filteredData = await this.generateData(this.resBtn, 50); // Charger les 50 premières données
        // this.showTable = true;
        // this.options4 = this.options1;


        // this.isCombobox4Disabled = false; // Activer le combobox 4
        // this.isBtnAll = false; // Activer le button All selection
        
    }

//     getAccounts(){
//         getAccounts({lstOwner: this.resBtn, offSetCount : this.offSetCount})
//         .then(result => {
//             // Returned result if from sobject and can't be extended so objectifying the result to make it extensible
//             result = JSON.parse(JSON.stringify(result));
//             result.forEach(record => {
//                 record.linkAccount = '/' + record.Id;
//             });
//             this.filteredData = [...this.filteredData, ...result];
//             this.error = undefined;
//             this.loadMoreStatus = '';
//         this.datag =  this.filteredData;
//             if (this.targetDatatable && this.filteredData.length >= this.totalNumberOfRows) {
//                 //stop Infinite Loading when threshold is reached
//                 this.targetDatatable.enableInfiniteLoading = false;
//                 //Display "No more data to load" when threshold is reached
//                 this.loadMoreStatus = 'No more data to load';
//             }
//             //Disable a spinner to signal that data has been loaded
//             if (this.targetDatatable) this.targetDatatable.isLoading = false;
//         })
//         .catch(error => {
//             this.error = error;
//             this.data = undefined;
//             console.log('error : ' + JSON.stringify(this.error));
//         });
// }

// Event to handle onloadmore on lightning datatable markup
// handleLoadMore(event) {
//     event.preventDefault();
//     // increase the offset count by 20 on every loadmore event
//     this.offSetCount = this.offSetCount + 20;
//     //Display a spinner to signal that data is being loaded
//     event.target.isLoading = true;
//     //Set the onloadmore event taraget to make it visible to imperative call response to apex.
//     this.targetDatatable = event.target;
//     //Display "Loading" when more data is being loaded
//     this.loadMoreStatus = 'Loading';
//     // Get new set of records and append to this.data
//     this.getRecords();
//     }
    // async loadData() {
    //     try {
    //         const newData = await this.generateData(this.resBtn, 50, this.loadMoreOffset);
    //         this.filteredData = this.filteredData.concat(newData);
    //         this.loadMoreOffset += 50;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async handleScroll(event) {
    //     const div = event.target;
    //     if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
    //         await this.loadData();
    //     }
    // }
    
    handleResults(event){
        this.filteredData = event.detail.filteredData
    }
    handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
        this.lstIdAccounts = this.selectedRows.map(row => row.Id);
        console.log(JSON.stringify(this.lstIdAccounts));
    }
    // handleSelectAll(event) {
    //     // console.log(event.detail.selectedRows==null ? 'null0' : 'rempli');
    //     console.log('qqqqqqqqqq');
    //     const selectedRows = event.detail.selectedRows;
    //     this.selectedRows = [...selectedRows];
    // }       
    
    
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
        this.isCards = false;
        console.log("L205: " );
        // console.log(JSON.stringify(this.selectedvalues));
        console.log("L207: " );
        // console.log(JSON.stringify(this.selectedvalues));
        this.newowner = undefined;
        console.log("New event: " + event.detail.value);
        // console.log("New event: " + this.selectedvalues);
        // const owners = await getAccounts({ lstStors: event.detail.value });
        const owners = await getOwnersCard({ lstStors: event.detail.value });
        // const owners2 = await JSON.stringify(owners);
console.log("New event: " + JSON.stringify(owners));
// console.log("New event: " + typeof owners2);

this.options6 = await this.Transform(owners);
console.log("New event: " + JSON.stringify(this.options6));

// const ownersCard = await this.Transform(owners2);
        // this.options6 = await ownersCard.map(item => ({
        //     id: item.id,
        //     sellerName: item.sellerName + ' (' + item.totalvals + ')',
        //     storeName: item.storeName,
        //     storeId: item.storeId,
        //     listSegName: item.listSegName,
        //     arrValSeg: item.arrValSeg,
        // }));



    //  this.options6 = await owners.map(item => ({
    //         id: item.OwnerId,
    //         storeName: item.Nom_du_magasin__c,
    //         storeId: item.Main_Boutique__c,
    //         seller: item.FirstName+ ' (' + item.accountCount + ')',
    //         sellerName: item.FirstName + ' ' + item.LastName + ' (' + item.accountCount + ')',
    //     }));

}

Transform(data){
    const transformedData = data.reduce((acc, item) => {
        const ownerId = item.OwnerId;
      
        if (!acc[ownerId]) {
          acc[ownerId] = {
            id: ownerId,
            sellerName: item.Name,
            storeName: item.Nom_du_magasin__c,
            storeId: item.Main_Boutique__c,
            listSegName: [],
            arrValSeg: [],
            totalvals: 0,
          };
        }
      
        acc[ownerId].listSegName.push(item.Segment__c+" ("+item.accCount+")");
        acc[ownerId].arrValSeg.push(item.accCount);
        acc[ownerId].totalvals += item.accCount;
      
        return acc;
      }, {});
      
      // Convert the transformedData object back to an array
      const resultArray = Object.values(transformedData);
      return resultArray.map(item => ({
            id: item.id,
            sellerName: item.sellerName + ' (' + item.totalvals + ')',
            storeName: item.storeName,
            storeId: item.storeId,
            listSegName: item.listSegName,
            arrValSeg: item.arrValSeg,
        }));
    //   console.log(JSON.stringify(resultArray));
}
    
generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}    

//     async GetChartConfig(OwnerId){
//         this.res2 = await getPie({ ownerIds : OwnerId });
//         const valeurs = await this.res2.map(item => item.val);
//         const labs = await this.res1.map(item => item.Segment__c +' ('+ item.val + ' / ' + this.totalvaleurs + ')');
//         const chartConfi = {
//         type: 'donut',
//         datasets: [{
//             data: valeurs,
//         }],
//         labels: labs,
//     }
//     return chartConfi;
// }

    showTooltip() {
        this.isTooltipVisible = true;
    }

    hideTooltip() {
        this.isTooltipVisible = false;
    }
    handleOwnerSelection(event){
      
            this.newowner = event.target.value;
            this.newstors = event.target.dataset.storeId;
            
            this.sellername = event.target.dataset.sellerName;
            this.namestore = event.target.dataset.storeName;
            
            console.log("New Owner: " + this.newowner);
            console.log("New Store: " + this.newstors);
            console.log("Seller Name: " + this.sellername);
            console.log("Name Store: " + this.namestore);
            if (this.selectedValue === 'none') {
                // Logique pour annuler la sélection ici
                // Par exemple, réinitialiser la valeur à null
                this.selectedValue = null;
                this.newowner = null;
            this.newstors = null;
            this.sellername = null;
            this.namestore = null;
            console.log("New Owner N: " + this.newowner);
            console.log("New Store N: " + this.newstors);
            console.log("Seller Name N: " + this.sellername);
            console.log("Name Store N: " + this.namestore);
            }
    
        
        }
     
        
      
    get isBtnRealoc() {
        return this.lstIdAccounts.length > 0 && this.newowner !== undefined ?  false : true;
    }
    get clasSelectNowOwner() {
        return this.newowner !== undefined ?  'slds-theme_success' : 'slds-badge_lightest';
    }
    get txtSelectNowOwner() {
        return this.newowner !== undefined ? this.sellername+ " a été sélectionné" : "Veuillez sélectionner un vendeur";
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
    }

   async handleConfirm() {
       await getReallocation2({ 
            lstIdAccounts: this.lstIdAccounts, 
            newOwnerId: this.newowner, 
            newStorsId: this.newstors 
        })
        .then(result => {
            // Traitement des résultats si nécessaire
            this.showDialog = false;
            this.showSuccess();
            // this.refrech();
            
        })
        .catch(error => {
            // Gestion des erreurs
            console.error(error);
            // this.showError();
            this.showDialog = false;
        });
    }
    showSuccess(){this.dispatchEvent(
    new ShowToastEvent({title:'Success',
        message: this.lstIdAccounts.length +' Successed Realloction',
        variant:'success'
    }))}
    showError(){this.dispatchEvent(
        new ShowToastEvent({title:'Error!',
            message: this.lstIdAccounts.length +' Reallocation failed',
            variant:'error'
        }))}





// async refrech(){
//     this.options5 = null;
//     this.options5 = (await getStores({lstCtry: this.res4}))
//             .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
// }

  
    }
        
        
        
  