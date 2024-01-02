import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const SEARCH_DELAY = 500;

export default class CardSearch extends LightningElement {
    @api placeholder = 'Search';
    @api allData = [];
    @api fieldsToFilterOn = ['sellerName', 'storeName']; // Fields you want to search on
    @api label = '';

    @track noFields = false;
    searchTimeout;

    get labelIncluded() {
        return this.label === '' ? 'label-hidden' : '';
    }

    showToast(title, msg, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
        });
        this.dispatchEvent(toastEvent);
    }

    ensureFilterableFields() {
        if (this.fieldsToFilterOn.length === 0 && this.allData.length !== 0) {
            this.fieldsToFilterOn = Object.keys(this.allData[0]);
            return true;
        } else if (this.fieldsToFilterOn.length === 0) {
            this.noFields = true;
            this.template.querySelector('lightning-input').value = '';
            this.showToast('Search Disabled', 'There are no fields to filter on', 'info');
            return false;
        }
        return true;
    }

    search(event) {
        if (!this.ensureFilterableFields()) return;

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        let searchFilter = event.target.value;

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.searchTimeout = setTimeout(() => {
            if (searchFilter.length <= 1) {
                let returnObj = { filteredData: this.allData, searchTerm: searchFilter, validTerm: false };
                this.dispatchFilteredEvent(returnObj);
            } else {
                this.filterData(searchFilter);
            }
            this.searchTimeout = null;
        }, SEARCH_DELAY);
    }

    filterData(searchFilter) {
        let results;
        try {
            let regex = new RegExp(searchFilter, 'i');
            results = this.allData.filter((card) => {
                let matchFound = false;
                this.fieldsToFilterOn.forEach((filterFieldName) => {
                    if (regex.test(card[filterFieldName])) {
                        matchFound = true;
                    }
                });
                return matchFound;
            });

            let returnObj = { filteredData: results, searchTerm: searchFilter, validTerm: true };
            this.dispatchFilteredEvent(returnObj);
        } catch (e) {
            this.data = [];
        }
    }

    dispatchFilteredEvent(returnObj) {
        let searchResultFound = new CustomEvent('filtered', { detail: returnObj });
        this.dispatchEvent(searchResultFound);
    }
}
