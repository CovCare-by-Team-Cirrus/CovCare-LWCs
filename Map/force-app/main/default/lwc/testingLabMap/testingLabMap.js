import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS=[
    'Testing_Lab__c.Name',
    'Testing_Lab__c.Location__Latitude__s',
    'Testing_Lab__c.Location__Longitude__s',
    'Testing_Lab__c.Street__c',
    'Testing_Lab__c.Pin_Code__c'
];

export default class recordMap extends LightningElement {
    @track mapMarkers;
    @track zoomLevel;
    @track record;
    @track name;

    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredTestingLab({ error, data }) {
        if (data) {
            this.record = data;
            console.log(JSON.stringify(this.record));
            this.mapMarkers = [
               {
                   location: {
                       Latitude: this.record.fields.Location__Latitude__s.value,
                       Longitude: this.record.fields.Location__Longitude__s.value,
                       Street: this.record.fields.Street__c.value,
                       PostalCode: this.record.fields.Pin_Code__c.value,
                   },
                   title: this.record.fields.Name.value,
                   description: 'This is the Testing Lab',
               },
           ];
           this.zoomLevel = 17;
           this.name = this.record.fields.Name.value;
           this.error = undefined;
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
}