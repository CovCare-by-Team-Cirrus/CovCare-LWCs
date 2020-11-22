import { LightningElement, wire, api, track } from 'lwc';
import getTests from '@salesforce/apex/getTests.getTests';

export default class TestTimeline extends LightningElement {

    @api recordId;
    @track tests =[];
    //@track isTest=false;

    @wire(getTests, {recordId : '$recordId'})
    wiredTests({data, error}){
        if(data){
            this.tests = data;
            //this.isTest=true;
            this.error=undefined;
            console.log(JSON.stringify(this.tests));
        } else if(error){
            console.log(JSON.stringify(this.error));
            this.tests=undefined;
        }
    }
    
    get isTest(){
        if(this.tests === undefined || this.tests.length == 0)
            return false;
        else
            return true;
    }
}