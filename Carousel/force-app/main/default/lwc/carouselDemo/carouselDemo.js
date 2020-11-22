import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS=[
    'Hospital__c.Name',
    'Hospital__c.Img1__c',
    'Hospital__c.Img2__c',
    'Hospital__c.Img3__c'
];

export default class CarouselDemo extends LightningElement {
    options = { autoScroll: true, autoScrollTime: 5 };
    @track record;
    @track items;

    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredHospital({ error, data }) {
        if (data) {
            this.record = data;
            console.log(JSON.stringify(this.record));
            
            this.items = [
                {
                    image: this.record.fields.Img1__c.value,
                    header: this.record.fields.Name.value,
                    description: ''
                }, {
                    image: this.record.fields.Img2__c.value,
                    header: this.record.fields.Name.value,
                    description: '',
                },
                {
                    image: this.record.fields.Img3__c.value,
                    header: this.record.fields.Name.value,
                    description: '',
                }
            ];
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
}