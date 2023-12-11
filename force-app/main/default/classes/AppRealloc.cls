public with sharing class AppRealloc {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> GetCountries(){
        return [SELECT  Id, Name 
                FROM Country__c   
                ORDER BY Name];
    }
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> GetStores(List<String> lstCtry){
        return[SELECT Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c,  Main_Boutique__c 
               FROM Account 
               WHERE Main_Boutique__c != null AND Main_Boutique__r.Code_ISO3__c IN :lstCtry
               GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c
               ORDER BY Main_Boutique__r.Nom_du_magasin__c];
    }
        // public static List<Store__c> GetStores(List<String> lstCtry){
        // return [SELECT Id, Nom_du_magasin__c  
        //         FROM Store__c 
        //         WHERE Code_ISO3__c IN :lstCtry 
        //         ORDER BY Nom_du_magasin__c];
          //      // AND Code_ISO3__c IN :storActive
    // }
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> GetOwners(List<String> lstStors){
        return [SELECT Main_Boutique__c, OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
        FROM Account 
        WHERE Main_Boutique__c IN :lstStors  
        GROUP BY Main_Boutique__c, OwnerId , Owner.LastName, Owner.FirstName];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> GetAccounts(List<String> lstOwner){
        return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
                FROM Account
                WHERE OwnerId  = :lstOwner];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> GetPie(List<String> ownerIds) {
        return [
            SELECT Segment__c, COUNT(Id) val
            FROM Account
            WHERE OwnerId IN :ownerIds
            GROUP BY Segment__c
            ORDER BY Segment__c
        ];
    }

    @AuraEnabled
    public static void Realloc(List<String> lstIdAccounts, String newOwnerId) {
        List<Account> accounts = [SELECT Id, OwnerId, Main_Boutique__c 
                                      FROM Account 
                                      WHERE RecordType.Id = '012Qy000000QRvpIAG' AND Id IN :lstIdAccounts];
        User newOw = [SELECT Id, IdStore__c FROM User WHERE Id = :newOwnerId];
        for (Account a : accounts) {
                a.OwnerId = newOw.Id;
                a.Main_Boutique__c = newOw.IdStore__c;
            }
        update accounts;
    }

}