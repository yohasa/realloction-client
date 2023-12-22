// confirmDialog.js
import { LightningElement, api } from 'lwc';

export default class ConfirmDialog extends LightningElement {
    @api message;

    // Fonction pour annuler la confirmation
    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    // Fonction pour confirmer l'action
    handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm'));
    }
}
