public with sharing class getTests {
    @AuraEnabled(cacheable=true)
    public static List<test__c> getTests(Id recordId){
        return [SELECT Laboratory_Name__r.Name ,Date_and_Time_of_Test__c, Test_Result__c, Result__c, Method_of_Testing__c FROM test__c WHERE RecordTypeId='0122w000001BIUQAA4' AND Patient_ID__c= :recordId ORDER BY Date_and_Time_of_Test__c DESC];
    }
}
