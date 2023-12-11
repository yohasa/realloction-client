public with sharing class CmbxCountry {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> GetCountrLis(){
        return [SELECT  Id, Name FROM Country__c   ORDER BY Name];
    }

@AuraEnabled(cacheable=true)
public static String GetCountrStr(){
    List<Country__c> countries = [SELECT Id, Name FROM Country__c ORDER BY Name];
    return JSON.serialize(countries);
}

// @AuraEnabled(cacheable=true)
// public static List<AggregateResult> GetCountrAgr(){
//     List<AggregateResult> res = new List<AggregateResult>();
//    res = [SELECT Id, Name FROM Country__c  ORDER BY Name];

//        return  res;
//        }

       // public static String getCountries(){
        //  List<Country__c> countries = [SELECT Id, Name FROM Country__c ORDER BY Name];
        //  String res = JSON.serialize(countries);
        //  System.debug('getCountries');
        //  System.debug(res);
        //  System.debug('getCountries2');
    // }   
    }
