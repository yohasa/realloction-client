import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class Lwcmodal extends LightningModal {
    @api conData;
    @api columns;
    @api label;

    handleOkay(event) {
        // alert(event.detail.fields.LastName);
        this.close('okay');
    }
}
