import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS=[
    'Patient__c.Name',
    'Patient__c.Patient_Name__c',
    'Patient__c.Contact_Number__c',
    'Patient__c.Gender__c',
    'Patient__c.Age__c',
    'Patient__c.Ward_Number__r.Name',
    'Patient__c.Bed_Number__r.Name',
    'Patient__c.Treated_by_Doctor__r.Name',
    'Patient__c.Health_Status__c'
];

export default class DynamicHighlightsPanel extends NavigationMixin(LightningElement) {
    @track record;
    @track item;
    @track theme = "slds-page-header slds-page-header_record-home slds-theme_inverse slds-theme_alert-texture";
    @track icon="standard:people";
    @track objectName="Patient";

    @api recordId;
    @api objectApiName;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredPatient({ error, data }) {
        if (data) {
            this.record = data;
            console.log(JSON.stringify(this.record));
            this.item = {
                id: this.record.fields.Name.value,
                name: this.record.fields.Patient_Name__c.value,
                phone: this.record.fields.Contact_Number__c.value,
                gender: this.record.fields.Gender__c.value,
                age: this.record.fields.Age__c.value,
                wardno: this.record.fields.Ward_Number__r.displayValue,
                bedno: this.record.fields.Bed_Number__r.displayValue,
                doctor: this.record.fields.Treated_by_Doctor__r.displayValue,
                status: this.record.fields.Health_Status__c.value
            };
            if(this.record.fields.Health_Status__c.value === "Critical")
                this.theme = this.theme + " slds-theme_error slds-theme_alert-texture";
            else if(this.record.fields.Health_Status__c.value === "Deteriorating")
                this.theme = this.theme + " slds-theme_warning slds-theme_alert-texture";
            else if(this.record.fields.Health_Status__c.value === "Discharged")
                this.theme = this.theme + " slds-theme_success slds-theme_alert-texture";
            else if(this.record.fields.Health_Status__c.value === "Deceased")
                this.theme = this.theme + " slds-theme_shade slds-theme_alert-texture";    

            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.log(JSON.stringify(this.error));
            this.record = undefined;
        }
    }
    editHandler() {
        console.log("handleEdit");
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: this.objectApiName,
                actionName: 'edit'
            }
        });
        console.log("edit");
    }
    newHandler() {
        console.log("handleNew");
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: this.objectApiName,
                actionName: 'new'
            }
        });
        console.log("edit");
    }
}