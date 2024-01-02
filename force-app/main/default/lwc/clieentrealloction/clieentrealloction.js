import { LightningElement, track, api, wire } from 'lwc';
import getCountries from '@salesforce/apex/ClientReallocationControler.GetCountries';
import getStores from '@salesforce/apex/ClientReallocationControler.GetStores';
import getOwners from '@salesforce/apex/ClientReallocationControler.GetOwners';
import getOwnersCard from '@salesforce/apex/ClientReallocationControler.GetOwnersCard';
// import getAccounts from '@salesforce/apex/ClientReallocationControler.GetAccounts';
import getAccounts2 from '@salesforce/apex/ClientReallocationControler.GetAccounts2';
import getAccounts3 from '@salesforce/apex/ClientReallocationControler.GetAccounts3';
import getAccounts4 from '@salesforce/apex/ClientReallocationControler.GetAccounts4';
// import getPie from '@salesforce/apex/ClientReallocationControler.GetPie';
import getReallocation2 from '@salesforce/apex/ClientReallocationControler.Realloction2';
// import STR_ID_FIELD from '@salesforce/schema/Store__c.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { refreshApex } from '@salesforce/apex';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import SEGMENT_FIELD from '@salesforce/schema/Account.Segment__c';

const columns = [ 
    { label: 'Id', fieldName: 'Id', type: 'Id', sortable: true, initialWidthType: 30},
    { label: 'LastName', fieldName: 'LastName', type: 'text', sortable: true, initialWidthType: 50},
    { label: 'FirstName', fieldName: 'FirstName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Mail', fieldName: 'PersonEmail', type: 'email', sortable: true, initialWidthType: 100 },
    { label: 'Segment', fieldName: 'Segment__c', type: 'text', sortable: true, initialWidthType: 40 },
    { label: 'Nom du magasin', fieldName: 'Nom_du_magasin__c',  type: 'text', initialWidthType: 150 },
    { label: 'Nom Vendeur', fieldName: 'OwLaName', type: 'text', initialWidthType: 50 },
    { label: 'Prenom Vendeur', fieldName: 'OwFiName', type: 'text', initialWidthType: 50 }
];
const SEARCH_DELAY = 500;
const LIMIT = 50;
export default class Clieentrealloction extends LightningElement {


    @track res1 = null;
    @track valeurs;
    @track dis1;
    @track labs;
    @track
    value1="";
    @track res2;
    @track
    value2="";
    @track res3;
    value3;
    @track res4;
    value4;
    value5;
    
    @track countryOptions = []; // Définir les options pour la combobox 1
    @track isCombobox2Disabled = true;
    @track storeOptions = undefined; // Définir les options pour la combobox 2
    @track isCombobox3Disabled = true;
    @track ownerOptions; // Définir les options pour la combobox 3
    @track isBtn = true;
    @track isBtnGetAcc = true;
    @track resBtn;
    @track icheckBtn = false;
    
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
    // rowLimit = 25;
    @track rowOffset = 0;
    @track isMoreData = true;
    @track sortedDirection = 'asc';
    @track sortedBy = 'FirstName';
    @track searchKey = '';
    searchTimeout;

    fieldsToFilterOn = ['sellerName', 'storeName'];
    // filterableFields = ['LastName', 'Segment__c','FirstName', 'Owner.FirstName'];
    @track isCombobox4Disabled = false;
    @track options4; // Définir les options pour la combobox 4
    
    @track isCombobox5Disabled = true;
    @track options5; // Définir les options pour la combobox 5
    @track selectedvalues; // Définir les options pour la combobox 5
    
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
    @track segmentOptions = [];
    @track selectedSegment = '';
    @track selectedStore = '';
    @track countryFiltreOptions;
    @track storeFiltreOptions;
    // @track segmentSelected;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues, { recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: SEGMENT_FIELD })
    wiredSegmentOptions({ error, data }) {
        if (data) {
            // Mettez à jour les options de la picklist
            this.segmentOptions = [
                { label: 'Select an option', value: '' }, // Option vide
                ...data.values.map(option => ({ label: option.label, value: option.value }))];
        } else if (error) {
            // Gérez les erreurs
            console.error('Error retrieving segment options', error);
        }
    }
    handleSegmentChange(event) {
    this.selectedSegment = event.detail.value;
        console.log('Selected Segment: ' + this.selectedSegment);
        this.datag = [];
        refreshApex(this.loadData());
    }
    
    handelSelectFiltreStore(event) {
        this.selectedStore = event.detail.value;
            console.log('Selected Store: ' + this.selectedStore);
            this.datag = [];
            refreshApex(this.loadData());
    }
    // @track isCheckedMap = {};
    @track modalClass = 'modal';
    // openModal() {
    //   this.modalClass = 'modal show';
    // }
    // closeModal() {
    //   this.modalClass = 'modal';
    // }
    // constlistSegName = ["Super Elite (13)","Elite (10)","VVIC (11)","VIC (13)","VGC (13)","GC (13)","Prospect (15)","Inactive (13)"];
    // constArrValSeg = [13,10,11,13,13,13,15,13];
    async connectedCallback() {
        this.countryOptions = (await getCountries())
        .map(item=>({label:item.Name, value:item.Id}));
    }
  
    async handleCombobox1Change(event) {
        console.log(JSON.stringify(event.target.value));
        this.res1 = (event.target.value).split(";");
        // console.log(JSON.stringify(event.target.dataValue.label));
        this.storeOptions = (await getStores({lstCtry: this.res1}))
        .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        console.log("this.storeOptions");
        console.log(JSON.stringify(this.storeOptions));

        this.isCombobox2Disabled = false; // Active le deuxième combobox
    }
   
    async handleCombobox2Change(event) {
        // console.log(JSON.stringify(event.detail.value.split(";")));
        this.res2 = event.detail.value.split(";");
        this.ownerOptions = (await getOwners({lstStors: this.res2}))
        .map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId}));
        this.isCombobox3Disabled = false; // Active le combobox 3
        this.isBtn = false; // Activer le btn
    //    event.detail.value.split(";"));
        // console.log("event.detail.value");
        const nullOption = { label: 'Select a story', value: null }; // Personnalisez le label et la valeur selon vos besoins
        this.storeFiltreOptions.unshift(nullOption);
        this.storeFiltreOptions.unshift(this.storeOptions.filter(option => (this.res2).includes(option.value)));
        // this.storeFiltreOptions = this.storeOptions.filter(option => selectedValues.includes(option.value));
        // this.dis1 = true;
        // this.dis1 = false;
    }
    
    async handleCombobox3Change(event) {
        console.log(event.target.label);

        this.resBtn = event.detail.value.split(";");

        // this.resBtn = await getAccounts2({lstOwner: event.detail.value.split(";")});
        this.isBtnGetAcc = false; // Activer le btn
        // this.filteredData  =  (await this.generateData(this.resBtn));
        // this.filteredData  =  (await this.generateData(this.resBtn));
        // this.filteredData = this.resBtn.map(item => ({
        //     Id: item.Id,
        //     LastName: item.LastName,
        //     FirstName: item.FirstName,
        //     PersonEmail: item.PersonEmail,
        //     Segment__c: item.Segment__c,
        //     Nom_du_magasin__c: item.Main_Boutique__r.Nom_du_magasin__c,
        //     OwLaName: item.Owner.LastName,
        //     OwFiName: item.Owner.FirstName,
        //     // chartConfig: this.GetChartConfig(item.OwnerId)
        // }));
        // this.datag =  this.filteredData;
        // this.showTable = true;
    }
    async handleClickBnt(event) {
        // this.resBtn = await getAccounts3({lstOwner: this.resBtn});
        this.icheckBtn=true;
        console.log(JSON.stringify(this.resBtn));
        console.log(JSON.stringify(this.storeOptions));
        console.log(JSON.stringify(this.ownerOptions));
        this.datag = [];
        await this.loadData();
        
        // this.filteredData = this.resBtn.map(item => ({
        //     Id: item.Id,
        //     LastName: item.LastName,
        //     FirstName: item.FirstName,
        //     PersonEmail: item.PersonEmail,
        //     Segment__c: item.Segment__c,
        //     Nom_du_magasin__c: item.Main_Boutique__r.Nom_du_magasin__c,
        //     OwLaName: item.Owner.LastName,
        //     OwFiName: item.Owner.FirstName,
        //     // chartConfig: this.GetChartConfig(item.OwnerId)
        // }));
        // this.datag =  this.filteredData;
        this.showTable = true;
        // await this.getRecords();
        // this.options4 = this.countryOptions;

        // this.loadMoreOffset = 0;

        // console.log(JSON.stringify(this.resBtn));
        // this.filteredData = await this.generateData(this.resBtn, 50); // Charger les 50 premières données
        // this.showTable = true;
        // this.options4 = this.countryOptions;


        // this.isCombobox4Disabled = false; // Activer le combobox 4
        // this.isBtnAll = false; // Activer le button All selection
        
    }

   async loadData(){
        // return getAccounts4({lstOwner: this.resBtn, offset: this.rowOffset, segmentOptions: this.segmentSelected, sortBy: this.sortedBy, sortDirection: this.sortedDirection})
        return getAccounts4({lstOwner: this.resBtn, offset: this.rowOffset, jusqua: 50, searchKey: this.searchKey, segmentOptions: this.selectedSegment, storeOptions:this.selectedStore, sortBy: this.sortedBy, sortDirection: this.sortedDirection})
        // return getAccounts3({lstOwner: this.resBtn, offset: this.rowOffset, searchKey: this.searchKey})
        .then(result =>{
            this.isMoreData = (result.length > 0 );
            // if (result.length <51){this.isMoreData=false;}
            // let updateResult = [...this.filteredData, ...result.map(item => ({
            let updateResult = [...this.datag, ...result.map(item => ({
                Id: item.Id,
                LastName: item.LastName,
                FirstName: item.FirstName,
                PersonEmail: item.PersonEmail,
                Segment__c: item.Segment__c,
                Nom_du_magasin__c: item.Main_Boutique__r.Nom_du_magasin__c,
                OwLaName: item.Owner.LastName,
                OwFiName: item.Owner.FirstName,
            }))];
            this.datag = updateResult;
            // this.filteredData = updateResult;
        // this.datag =  this.filteredData;
            this.error = undefined;
        })
        .catch(err =>{this.error = err;
            this.datag = null;})
    }
   async loadMoreData(event){
    if(this.isMoreData){
        // const currentRecord = this.filteredData;
        const {target} =  event;
        target.isLoading = true;
        this.rowOffset = this.rowOffset + this.LIMIT;
       await this.loadData()
        .then(() =>{
            target.isLoading = false;
        });
    }
    }
   async handleKeyChange( event ) {
        this.searchKey = event.detail.value;
        console.log(JSON.stringify(event.detail.value));
        this.rowOffset = 0;
        this.datag = [];
        await this.loadData();
        // for(var i=0; i<this.items.length;i++){
        //     if(this.items[i]!= undefined && this.items[i].Name.includes(this.searchKey)){
        //         data.push(this.items[i]);
        //     }
        // }
    }
    async sortColumns( event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.rowOffset = 0;
        this.datag = [];
        await this.loadData();
        // return refreshApex(this.result);
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
        this.res4 = event.detail.value.split(";");
        this.options5 = (await getStores({lstCtry: this.res4}))
        .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        this.isCombobox5Disabled = false; // Activer le combobox 5
        console.log("New Owner: " + this.newowner);
    }  
    
    async handleCombobox5Change(event){
        this.isCards = false;
        console.log("L205: " );
        console.log(JSON.stringify(this.selectedvalues));
        console.log("L207: " );
        // console.log(JSON.stringify(this.selectedvalues));
        this.newowner = undefined;
        console.log("New event: " + event.detail.value.split(";"));
        console.log("New event: " + this.selectedvalues);
        // const owners = await getAccounts({ lstStors: event.detail.value });
        const owners = await getOwnersCard({ lstStors: event.detail.value.split(";") });
        // const owners2 = await JSON.stringify(owners);
console.log("New event: " + JSON.stringify(owners));
// console.log("New event: " + typeof owners2);

this.filteredData = await this.Transform(owners);
this.options6 = this.filteredData;
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

handleResults(event){
    this.filteredData = event.detail.filteredData
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
     
     get bollDatag()   {
        return this.datag.length < 1 && this.icheckBtn;
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
        
        
        
  