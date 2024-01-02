import { LightningElement, track, api, wire } from 'lwc';
// import getCountries from '@salesforce/apex/ClientsReallocationControler.GetCountries';
// import getStores from '@salesforce/apex/ClientsReallocationControler.GetStores';
import getCountryStores from '@salesforce/apex/ClientsReallocationControler.GetCountryStores';
import getOwners from '@salesforce/apex/ClientsReallocationControler.GetOwners';
import getOwnersCard from '@salesforce/apex/ClientsReallocationControler.GetOwnersCard';

//=======================================================================
import getStoresByOwners from '@salesforce/apex/ClientsReallocationControler.GetStoresByOwners';
import getOwnersByStores from '@salesforce/apex/ClientsReallocationControler.GetOwnersByStores';
import getStoresByExIdStors from '@salesforce/apex/ClientsReallocationControler.GetStoresByExIdStors';
//===================================================================

// import getAccounts from '@salesforce/apex/ClientsReallocationControler.GetAccounts';
// import getAccounts2 from '@salesforce/apex/ClientsReallocationControler.GetAccounts2';
// import getAccounts3 from '@salesforce/apex/ClientsReallocationControler.GetAccounts3';
import getAccounts4 from '@salesforce/apex/ClientsReallocationControler.GetAccounts4';
// import getSegm from '@salesforce/apex/ClientsReallocationControler.GetSegm';
// import getSegmentOptions from '@salesforce/apex/ClientsReallocationControler.GetSegmentOptions';
// import getPie from '@salesforce/apex/ClientsReallocationControler.GetPie';
import getReallocation2 from '@salesforce/apex/ClientsReallocationControler.Realloction2';
// import STR_ID_FIELD from '@salesforce/schema/Store__c.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
// import { refreshApex } from '@salesforce/apex';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import SEGMENT_FIELD from '@salesforce/schema/Account.Segment__c';

// import { getListUi } from 'lightning/uiListApi';
// import { getRecord } from 'lightning/uiRecordApi';
// import COUNTRY_OBJECT from '@salesforce/schema/Country__c';
// import COUNTRY_FIELD from '@salesforce/schema/Country__c.Name'; 

//yhsaghroun@gmail.com

const columns = [ 
    // { label: 'LastName', fieldName: 'LastName', type: 'text', sortable: true, initialWidthType: 50},
    // { label: 'FirstName', fieldName: 'FirstName', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Client Name', fieldName: 'Name', type: 'text', sortable: true, initialWidthType: 50 },
    { label: 'Client Id', fieldName: 'Id', type: 'Id', sortable: true, initialWidthType: 30},
    { label: 'Mail', fieldName: 'PersonEmail', type: 'email', sortable: true, initialWidthType: 100 },
    { label: 'Segment', fieldName: 'Segment__c', type: 'text', sortable: true, initialWidthType: 40 },
    { label: 'Store Name', fieldName: 'CurentStoreName',  type: 'text', initialWidthType: 150 },
    { label: 'Seller Name', fieldName: 'OwnerName', type: 'text', initialWidthType: 50 }
    // { label: 'Prenom Vendeur', fieldName: 'OwFiName', type: 'text', initialWidthType: 50 }
    // { label: 'Nom Vendeur', fieldName: 'OwLaName', type: 'text', initialWidthType: 50 },
];
export default class ClientsReallocation extends NavigationMixin (LightningElement) {

    @track countryOptions = []; // options pour la combobox 1
    @track storeOptions = []; // options pour la combobox 2
    @track ownerOptions = []; // options pour la combobox 3
    @track storeSelersOptions = []; // options pour la combobox 5
    
    @track countryStrorsOptions = []; // options pour les combobox 1 2
    

    @track res0 = [];
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
    
    @track isCombobox2Disabled = true;
    @track isCombobox3Disabled = true;
    @track isBtn = true;
    @track isBtnGetAcc = true;
    @track resBtn;
    
    @track consData;
    @track datag = [];
    @track total = 0;
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

    fieldsToFilterOn = ['sellerName', 'storeName'];
    @track isCombobox4Disabled = false;
    @track options4; // Définir les options pour la combobox 4
    
    @track isCombobox5Disabled = true;
    @track options5; // Définir les options pour la combobox 5
    @track selectedvalues; // Définir les options pour la combobox 5
    @track lstOwnerId = []; // Définir les options pour la combobox 5
    
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
    // @track bollDatag = false;

    @track isCards = true;
    @track mymessage;
    @track segmentOptions = [];
    @track selectedSegment = '';
    @track storeFiltreOptions = [];
    @track selectedStore = '';
    @track countryFiltreOptions = [];
    @track selectedCountry = '';

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;
    @wire(getPicklistValues, { recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: SEGMENT_FIELD })
    wiredSegmentOptions({ error, data }) {
        if (data) {
            // Mettez à jour les options de la picklist
            this.res0 = [
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
        // this.loadData();
        refreshApex(this.loadData());
    }
    handelSelectFiltreStore(event) {
        this.selectedStore = event.detail.value;
            console.log('Selected Store: ' + this.selectedStore);
            this.datag = [];
            // this.loadData();
            refreshApex(this.loadData());
        }
    handelSelectFiltreCountry(event) {
        this.selectedCountry = event.detail.value;
        console.log('Selected Country : ' + this.selectedCountry);
        let selectedStoCountry = event.detail.store;
        console.log('selectedStoCountry : ' + JSON.stringify(selectedStoCountry, null, 2));
            this.datag = [];
            this.storeFiltreOptions = selectedStoCountry;
            this.selectedStore = '';
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
    //============
        // this.countryOptions = (await getCountries())
        // .map(item=>({label:item.Name, value:item.Id}));
    //==============

        this.countryOptions = (await getCountryStores())
            .map(country => ({
                label: country.Name + ' (' + country.Stores1__r.length + ')',
                value: country.Id,
                // count: country.Stores1__r.length,
                stores: country.Stores1__r.map(store => ({
                label: store.Nom_du_magasin__c,
                value: store.Id,
                exId: store.ExIdStore__c,
                pays: country.Name,
                iso: store.Code_ISO3__c
                }))
            }));
        console.log('this.countryOptions map: ', JSON.stringify(this.countryOptions, null, 2));

    }

    extractStoresLabelsValues = (data) => {
        let storesLabelsValues = [];
        data.forEach(country => {
            country.stores.forEach(store => {
                const storeLabelValue = { "label": store.label, "value": store.value, "exId":store.exId, "pays": store.pays, "iso": store.iso};
                storesLabelsValues.push(storeLabelValue);
            });
        });
        return storesLabelsValues;
    };

    async handleCombobox1Change(event) {
        this.res1 = (event.detail);
        console.log(JSON.stringify(event.detail));
        if (!this.res1 || this.res1 == null || this.res1.length === 0){this.showTable=false;}

        let res = this.extractStoresLabelsValues(event.detail);
        console.log('this.extractStoresLabelsValues  : ', JSON.stringify(res, null, 2));

//============
//   this.storeOptions = (await getStores({lstCtry: (event.detail).map(item => item.value)}))
//         .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
//============

        this.storeOptions = res;

        console.log("this.storeOptions");
        console.log(JSON.stringify(this.storeOptions));
    }
   
    async handleCombobox2Change(event) {
        this.res2 = (event.detail).map(item => item.value);
       
        this.ownerOptions = (await getOwners({lstStors: this.res2}))
          .map(item=>({label:item.FirstName+' '+item.LastName +' ('+item.accountCount+')', value:item.OwnerId, accountCount:item.accountCount,
                          store:{label:item.Nom_du_magasin__c, value:item.Main_Boutique__c},country:{label:item.Name, value:item.Code_ISO3__c}
          }));
    }
    
    async handleCombobox3Change(event) {
        this.resBtn = (event.detail).map(item => item.value);
        console.log(JSON.stringify(this.resBtn));
        this.total = 0;
        this.total = event.detail.reduce((acc, item) => acc + item.accountCount, 0);
        console.log("Total accountCount : ", this.total);
        this.labelButton = this.total + " Clients"

        if(this.total>0){
        //    await this.wiredSegmentOptions();
    //    await refreshApex(this.wiredSegmentOptions());
            this.segmentOptions = this.res0;
            this.isBtnGetAcc = false; // Activer le btn
            this.labelButton = this.total + " Clients";
      }else{
        this.total = 0;
        this.labelButton = 'Clients'
        this.isBtnGetAcc = true; 
        this.datag = [];
        this.resBtn = [];
        this.segmentOptions = [];
        // await this.loadData();

        // this.datag = [];
      }
      this.countryFiltreOptions = [];
      this.storeFiltreOptions = [];

        this.res3 = event.detail;
        console.log('this.handleCombobox3Change map: ', JSON.stringify(this.res3, null, 2));

     

          let transformedData = this.res3.reduce((acc, currentItem) => {
            let { country, store } = currentItem;
            // Vérifier si le pays existe déjà dans l'accumulateur
            let existingCountry = acc.find(item => item.value === country.value);
            // Créer un objet représentant le store
            let storeDetail = { label: store.label, value: store.value };
            // Vérifier si le store existe déjà dans le tableau des stores du pays
            let storeExists = existingCountry && existingCountry.store.some(existingStore => existingStore.value === store.value);
            if (existingCountry && !storeExists) {
              // Le pays existe, et le store n'existe pas, ajouter le store au tableau des stores
              existingCountry.store.push(storeDetail);
            } else if (!existingCountry) {
              // Le pays n'existe pas, créer une nouvelle entrée pour le pays avec un tableau contenant le store
              acc.push({
                label: country.label,
                value: country.value,
                store: [storeDetail],
              });
            }
            return acc;
          }, []);
          // Ajouter l'option "All" au début de la liste des pays
            if (transformedData.length > 1) {
                let allCountries = transformedData.reduce((acc, country) => {
                country.store.forEach(store => {
                    if (!acc.some(existingStore => existingStore.value === store.value)) {
                    acc.push(store);
                    }
                });
                return acc;
                }, []);
            
                transformedData.unshift({
                label: "All",
                value: "",
                store: allCountries
                });
            }
        //   console.log(transformedData);
        console.log('this.transformedData : ', JSON.stringify(transformedData, null, 2));
        console.log('================== : ');
        let dataWithAllOption = transformedData.map(item => {
            if (item.store.length > 1) {
              item.store.unshift({ label: "All", value: "" });
            }
            return item;
          });
        console.log('this.dataWithAllOption : ', JSON.stringify(dataWithAllOption, null, 2));
          
        //   console.log(dataWithAllOption);


        
        
        // let optionFilterCountry = (event.detail).map(item=>({label:item.country.label, value:item.country.value}));
        // console.log("optionFilterCountry : ");
        // console.log(JSON.stringify(optionFilterCountry));
        
        // let optionFilterCountryUnique = Array.from(new Set(event.detail.map(item => JSON.stringify(item.country))))
        // .map(json => JSON.parse(json))
        // .map(item => ({ label: item.label, value: item.value }));
        // console.log("optionFilterCountryUnique : ");
        // console.log(JSON.stringify(optionFilterCountryUnique));


        // const emptyOption = { label: "", value: "" };
        // this.countryFiltreOptions = [emptyOption, optionFilterCountryUnique];


        // this.countryFiltreOptions =  optionFilterCountryUnique;
        this.countryFiltreOptions =  dataWithAllOption;
        
        // let optionFilterStors = (event.detail).map(item=>({label:item.store.label, value:item.store.value}));
        // console.log("optionFilterStors : ");
        // console.log(JSON.stringify(optionFilterStors));
        
        // let optionFilterStorsUnique = Array.from(new Set(event.detail.map(item => JSON.stringify(item.store))))
        // .map(json => JSON.parse(json))
        // .map(item => ({ label: item.label, value: item.value }));
        // console.log("optionFilterStorsUnique : ");
        // console.log(JSON.stringify(optionFilterStorsUnique));
        // this.storeFiltreOptions = [emptyOption, optionFilterStorsUnique];
        // this.storeFiltreOptions =  optionFilterStorsUnique;
        // this.storeFiltreOptions =  dataWithAllOption.store[0];

        // refreshApex(this.accountInfo);
        // refreshApex(this.segmentOptions);
        // this.isBtnGetAcc = false; // Activer le btn
    }

    async handleClickBnt(event) {
        // this.resBtn = await getAccounts3({lstOwner: this.resBtn});
       this.datag = [];
        console.log(JSON.stringify(this.resBtn));
        console.log(JSON.stringify(this.storeOptions));
        console.log(JSON.stringify(this.ownerOptions));
        // let {target} =  event;
        // target.isLoading = true;
        if(this.total>0){
            await this.loadData();
            this.showTable = true;
        }
        // .then(() =>{
        //     target.isLoading = false;
        // });
    
     

        
    }

   async loadData(){
        return getAccounts4({lstOwner: this.resBtn, offset: this.rowOffset, searchKey: this.searchKey, selectedSegment: this.selectedSegment, selectedCountry: this.selectedCountry, selectedStore: this.selectedStore, sortBy: this.sortedBy, sortDirection: this.sortedDirection})
        .then(result =>{
            this.isMoreData = (result.length > 0 );
            let updateResult = [...this.datag, ...result.map(item => ({
                Name: item.Name,
                Id: item.Id,
                PersonEmail: item.PersonEmail,
                Segment__c: item.Segment__c,
                CurentStoreName: item.Main_Boutique__r.Nom_du_magasin__c,
                OwnerName: item.Owner.Name,
            }))];
            this.datag = updateResult;
            this.error = undefined;
        })
        .catch(err =>{this.error = err;
            this.datag = null;})
    }
   async loadMoreData(event){
    if(this.isMoreData){
        const {target} =  event;
        target.isLoading = true;
        this.rowOffset = this.rowOffset + 50;
       await this.loadData()
        .then(() =>{
            target.isLoading = false;
        });
    }
    }
   async handleKeyChange( event ) {
    if(this.total>0){
        this.searchKey = event.detail.value;
        console.log(JSON.stringify(event.detail.value));
        this.rowOffset = 0;
        this.datag = [];

        await this.loadData();
    }else{this.datag = [];}

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
    }



    handleRowSelection(event) {
        // this.selectedRows = event.detail.selectedRows;
        let selectRows = event.detail.selectedRows;
        this.lstIdAccounts = selectRows.map(row => row.Id);
        console.log(JSON.stringify(this.lstIdAccounts));
    }
    // handleSelectAll() {
    //     const allRowKeys = this.datag.map(row => row.id);
    //     this.selectedRows = allRowKeys;
    // }
    // handleRowSelection(event) {
    //     switch (event.detail.config.action) {
    //         case 'selectAllRows':
    //             // let selectRows = event.detail.selectedRows;
    //             // this.lstIdAccounts = selectRows.map(row => row.Id);
    //             // console.log(JSON.stringify(this.lstIdAccounts));
    //             for (let i = 0; i < event.detail.selectedRows.length; i++) {
    //                 selectedData.push(event.detail.selectedRows[i]);
    //                 currentlySelectedData.push(event.detail.selectedRows[i]);
    //             }
    //             break;
    //         case 'deselectAllRows':
    //             this.lstIdAccounts = [];
    //             // currentlySelectedData = [];
    //             break;
    //         case 'rowSelect':
    //             this.lstIdAccounts.push(event.detail.config.value);
    //             // selectedData.push(event.detail.config.value);
    //             break;
    //         case 'rowDeselect':
    //             index = currentlySelectedData.indexOf(event.detail.config.value);
    //             // index = this.lstIdAccounts.indexOf(event.detail.config.value);
    //             if (index !== -1) {
    //                 array.splice(index, 1);
    //             }
    //             break;
    //             default:
    //                 break;
    //             }
    // }

    
    // async handleSelectAll(){
    //     this.lstIdAccounts = await getAccounts4({lstOwner: this.resBtn, searchKey: this.searchKey, offset:2002, selectedSegment: this.selectedSegment, selectedCountry: this.selectedCountry, selectedStore: this.selectedStore, sortBy: this.sortedBy, sortDirection: this.sortedDirection}).map(res => res.Id);
    //     this.selectedRows = this.lstIdAccounts;
    //     console.log('lstIdAccounts');
    //     console.log(this.lstIdAccounts.length);
    //     console.log('selectedRows');
    //     console.log(this.selectedRows.length);
    // }

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

        // this.storeSelersOptions = (await getStores({lstCtry: (event.detail).map(item => item.value)}))
        // .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));

        this.storeSelersOptions = this.extractStoresLabelsValues(event.detail);
        // console.log(this.lstIdAccounts);
        // this.options5 = (await getStores({lstCtry: event.detail.value}))
        // this.res4 = event.detail.value.split(";");
        // this.options5 = (await getStores({lstCtry: this.res4}))
        // .map(item=>({label:item.Nom_du_magasin__c, value:item.Main_Boutique__c}));
        // this.isCombobox5Disabled = false; // Activer le combobox 5
        // console.log("New Owner: " + this.newowner);
    }  
    
    async handleCombobox5Change(event){
        this.isCards = false;
       
        this.newowner = undefined;
        // console.log("New event: " + event.detail.value.split(";"));
        console.log("handleCombobox5Change ===: " + JSON.stringify(event.detail) );
        console.log("New event: " + this.selectedvalues);
        // const owners = await getAccounts({ lstStors: event.detail.value });
        // const owners = await getOwnersCard({ lstStors: event.detail.value.split(";") });

        
        const owners = await getOwnersCard({ lstStors: (event.detail).map(item => item.value)});

        //================================================================================
        // let owners =  (event.detail).map(item => item.exId);
        // this.lstOwnerId = await getOwnersByStores({lstExIdStors: owners});
        // console.log("New lstOwnerId: " + JSON.stringify(this.lstOwnerId, null, 2));

        // let storrrr = await getStoresByExIdStors({lstExIdStors: owners});
        // console.log("New storrrr: " + JSON.stringify(storrrr, null, 2));
        
        // let lstOwnerIdTrans = this.lstOwnerId.map(item => item.Id);
        // let store = await getStoresByOwners({lstOwnerId: lstOwnerIdTrans});
        // console.log("New store ?: " + JSON.stringify(store, null, 2));
        //================================================================================

// console.log("New event: " + typeof owners2);

           this.filteredData = await this.Transform(owners);
           this.options6 = this.filteredData;
// console.log("New event: " + JSON.stringify(this.options6));

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
    
   get bollDatag(){
        return (this.datag && this.datag.length < 1 && this.BtnGetAcc === true) ?  true : false;
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
        
        