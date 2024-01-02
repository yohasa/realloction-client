public with sharing class ClientsReallocationControler {
    // @AuraEnabled(cacheable=true)
    // public static List<Country__c> GetCountries(){
    //     return [SELECT  Id, Name 
    //             FROM Country__c   
    //             ORDER BY Name];
    // }
    @AuraEnabled
    public static List<Country__c> GetCountryStores(){
    return[SELECT Id, Name, 
                 (SELECT Id, Nom_du_magasin__c, ExIdStore__c 
                  FROM Stores1__r
                  ORDER BY Nom_du_magasin__c) 
           FROM Country__c 
           ORDER BY Name];
    }
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> GetSegm(){
        return [SELECT Segment__c, count(Id) FROM Account GROUP BY Segment__c ORDER BY Segment__c];
    }
    // @AuraEnabled

    //     public static List<String> GetSegmentOptions() {
    //         String objectApiName = 'Account';
    //         String segmentFieldName = 'Segment__c';
    //         Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap();
    //         if (fieldMap.containsKey(segmentFieldName)) {
    //             Schema.DescribeFieldResult fieldDescribe = fieldMap.get(segmentFieldName).getDescribe();
    //             if (fieldDescribe.isUpdateable() && fieldDescribe.isAccessible() && fieldDescribe.isPicklistField()) {
    //                 List<Schema.PicklistEntry> picklistValues = fieldDescribe.getPicklistValues();
    //                 List<String> segmentOptions = new List<String>();
    //                 for (Schema.PicklistEntry picklistEntry : picklistValues) {
    //                     segmentOptions.add(picklistEntry.getValue());
    //                 }
    //                 return segmentOptions;
    //             }
    //         }
    //         return null;
    //     }
    // }
    // SELECT  IdStore__c, count(Id) troisParBoutick 
    //     FROM User
    //     WHERE IdStore__c  !=  null
    //     GROUP BY IdStore__c
    //     ORDER BY IdStore__c



    // @AuraEnabled
    // public static List<AggregateResult> GetCountries2(List<String> lstOwner){
    //     return[SELECT  Main_Boutique__r.Code_ISO3__c,  Main_Boutique__r.Code_ISO3__r.Name
    //     FROM Account 
    //     WHERE Main_Boutique__c != null AND OwnerId = :lstOwner 
    //     GROUP BY  Main_Boutique__r.Code_ISO3__c,  Main_Boutique__r.Code_ISO3__r.Name
    //     ORDER BY Main_Boutique__r.Code_ISO3__r.Name];
    // }
    // @AuraEnabled
    // public static List<AggregateResult> GetStores(List<String> lstCtry){
    //     return[SELECT Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c,  Main_Boutique__c 
    //     FROM Account 
    //     WHERE Main_Boutique__c != null AND Main_Boutique__r.Code_ISO3__c IN :lstCtry
    //     GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c
    //     ORDER BY Main_Boutique__r.Nom_du_magasin__c];
    // }
//Nombre de clients par boutique
//     SELECT  Main_Boutique__r.Nom_du_magasin__c, Count(Id)
// FROM Account 
// GROUP BY  Main_Boutique__r.Nom_du_magasin__c


    // @AuraEnabled
    //     public static List<Store__c> GetStores2(List<String> lstCtry){
    //     return [SELECT Id, Nom_du_magasin__c, ExIdStore__c  
    //             FROM Store__c 
    //             WHERE Code_ISO3__c IN :lstCtry 
    //             ORDER BY Nom_du_magasin__c];
    //     }
        @AuraEnabled
        public static List<User> GetOwnersByStores(List<String> lstExIdStors){
            return [SELECT  Id, Name, IdStore__c
            FROM User
             WHERE  IdStore__c IN :lstExIdStors ];
        }

        @AuraEnabled
        public static List<Store__c> GetStoresByExIdStors(List<String> lstExIdStors){
            return [SELECT Id, Nom_du_magasin__c, ExIdStore__c  
            FROM Store__c 
            WHERE ExIdStore__c = :lstExIdStors 
            ORDER BY Nom_du_magasin__c];
        }
        @AuraEnabled
        public static List<AggregateResult> GetStoresByOwners(List<String> lstOwnerId){
            return [SELECT OwnerId, Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, COUNT(Id) val
                    FROM Account
                    WHERE RecordType.Id = '012Qy000000QRvpIAG' AND OwnerId = :lstOwnerId
                    GROUP BY OwnerId,  Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c
                    ORDER BY OwnerId];
        }
        // @AuraEnabled
// public static List<AggregateResult> GetStoresByOwners(List<String> lstOwnerId){
//     List<AggregateResult> results = [SELECT OwnerId, Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, COUNT(Id) val
//                                      FROM Account
//                                      WHERE RecordType.Id = '012Qy000000QRvpIAG' AND OwnerId = :lstOwnerId
//                                      GROUP BY OwnerId,  Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c
//                                      ORDER BY OwnerId];

    // // Créer une map pour stocker les résultats par OwnerId
    // Map<String, AggregateResult> resultMap = new Map<String, AggregateResult>();
    // for (AggregateResult result : results) {
    //     resultMap.put((String) result.get('OwnerId'), result);
    // }

    // // Ajouter des résultats vides pour les ID sans correspondance
    // for (String ownerId : lstOwnerId) {
    //     if (!resultMap.containsKey(ownerId)) {
    //         AggregateResult emptyResult = new AggregateResult();
    //         emptyResult.put('OwnerId', ownerId);
    //         emptyResult.put('val', 0); // Vous pouvez ajuster cela en fonction de vos besoins
    //         results.add(emptyResult);
    //     }
    // }

//     return results;
// }

        // @AuraEnabled
        // public static List<Map<String, Object>> GetStoresByOwners(List<String> lstOwnerId){
        //     List<AggregateResult> results = [SELECT OwnerId, Main_Boutique__r.Nom_du_magasin__c, COUNT(Id) val
        //                                      FROM Account
        //                                      WHERE RecordType.Id = '012Qy000000QRvpIAG' AND OwnerId IN :lstOwnerId
        //                                      GROUP BY OwnerId, Main_Boutique__r.Nom_du_magasin__c
        //                                      ORDER BY OwnerId];
        
        //     // Créer une map pour stocker les résultats par OwnerId
        //     Map<String, AggregateResult> resultMap = new Map<String, AggregateResult>();
        //     for (AggregateResult result : results) {
        //         resultMap.put((String) result.get('OwnerId'), result);
        //     }
        
        //     // Créer une liste de résultats avec les ID sans correspondance
        //     List<Map<String, Object>> finalResults = new List<Map<String, Object>>();
        //     for (String ownerId : lstOwnerId) {
        //         Map<String, Object> resultEntry = new Map<String, Object>();
        //         if (resultMap.containsKey(ownerId)) {
        //             AggregateResult aggregateResult = resultMap.get(ownerId);
        //             resultEntry.put('OwnerId', (String) aggregateResult.get('OwnerId'));
        //             resultEntry.put('Nom_du_magasin__c', (String) aggregateResult.get('Nom_du_magasin__c'));
        //             resultEntry.put('val', (Integer) aggregateResult.get('val'));
        //         } else {
        //             resultEntry.put('OwnerId', ownerId);
        //             resultEntry.put('Nom_du_magasin__c', null); // Remplacez par la valeur par défaut
        //             resultEntry.put('val', 0); // Vous pouvez ajuster cela en fonction de vos besoins
        //         }
        //         finalResults.add(resultEntry);
        //     }
        
        //     return finalResults;
        // }
        

        @AuraEnabled
        public static List<AggregateResult> GetPie(List<String> ownerIds) {
            return [
                SELECT Segment__c, COUNT(Id) val
                FROM Account
                WHERE OwnerId IN :ownerIds
                GROUP BY Segment__c
                ORDER BY Segment__c
            ];
        }
    // @AuraEnabled
    // public static List<Country__c> GetCountryStores(){
    // return[SELECT Id, Name,
    //              (SELECT Id, Nom_du_magasin__c 
    //               FROM Stores1__r
    //               ORDER BY Nom_du_magasin__c) 
    //        FROM Country__c 
    //        ORDER BY Name];
    // }
    @AuraEnabled
    public static List<AggregateResult> GetOwners(List<String> lstStors){
        return [SELECT
        Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c,  Main_Boutique__r.Code_ISO3__c, Main_Boutique__r.Code_ISO3__r.Name,  OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
        FROM Account 
        WHERE Main_Boutique__c IN :lstStors  
        GROUP BY  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c, Main_Boutique__r.Code_ISO3__r.Name, OwnerId , Owner.LastName, Owner.FirstName
        ORDER BY  Main_Boutique__r.Nom_du_magasin__c
        ];
    }

    // @AuraEnabled
    // public static List<AggregateResult> GetOwners2(List<String> lstStors){
    //     return [SELECT Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
    //     FROM Account 
    //     WHERE  RecordType.Id = '012Qy000000QRvpIAG' AND Main_Boutique__c IN :lstStors  
    //     GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId , Owner.LastName, Owner.FirstName];
    // }
    @AuraEnabled
    public static List<AggregateResult> GetOwnersCard(List<String> lstStors){
        return [SELECT OwnerId, Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Segment__c, COUNT(Id) accCount 
        FROM Account 
        WHERE  RecordType.Id = '012Qy000000QRvpIAG' AND Main_Boutique__c IN :lstStors 
        GROUP BY  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.Name, Segment__c 
        ORDER BY OwnerId, Segment__c];
    }
    // @AuraEnabled
    // public static List<Account> GetAccounts(List<String> lstOwner, Integer offSetCount){
    //     return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
    //             FROM Account
    //             WHERE RecordType.Id = '012Qy000000QRvpIAG' AND OwnerId  = :lstOwner
    //             LIMIT 50 OFFSET :offSetCount];
    // }
    // @AuraEnabled
    // public static List<Account> GetAccounts2(List<String> lstOwner){
    //     return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
    //             FROM Account
    //             WHERE OwnerId  = :lstOwner];
    //             // LIMIT 10];
    // }
    // @AuraEnabled
    // public static List<Account> GetAccounts3(List<String> lstOwner, Integer offset, String searchKey){
    //     String query = 'SELECT Id,  LastName, FirstName, PersonEmail, Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  FROM Account  WHERE RecordType.Id= \'012Qy000000QRvpIAG\' ';
    //     system.debug('query---'+query);
    //     if ( lstOwner != null ) {
    //     query += ' AND OwnerId  = :lstOwner';
    //     }
    //     if ( searchKey != null && searchKey != '' ) {
    //         String key = '%' + searchKey + '%';
    //         query += ' AND FirstName LIKE :key ';
    //     }
    //     // if ( sortBy != null && sortDirection != null ) {
    //     //     query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
    //     // }
    //     if ( offset < 2001 ) {
    //     query = query + ' LIMIT 50 OFFSET '+ offset;
    //     }
    //     return Database.query( query );        
    // }
    // public static List<Account> GetAccounts4(List<String> lstOwner, Integer offset, String searchKey, String segmentOptions, String countryOptions, String storeOptions, Bollean exModifIn3day, String sortBy, String sortDirection){
    @AuraEnabled
        public static List<Account> GetAccounts4(
            List<String> lstOwner, 
            Integer offset, 
            String searchKey, 
            String selectedSegment, 
            String selectedCountry, 
            String selectedStore, 
            Boolean exModifIn3day,  // Correction ici
            String sortBy, 
            String sortDirection
        ) {
        String query = 'SELECT Id, Name, PersonEmail, Segment__c, OwnerId, Owner.Name, Main_Boutique__r.Nom_du_magasin__c  FROM Account  WHERE RecordType.Id= \'012Qy000000QRvpIAG\' ';
        system.debug('query---'+query);
        if ( lstOwner != null && !lstOwner.isEmpty() ) {
        query += ' AND OwnerId  = :lstOwner';
        }
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            // String keye = '%' + searchKey + '%';
            query += ' AND ( Name LIKE :key OR Id = :searchKey )';
            // query += ' AND (LastName LIKE '+key+' OR FirstName LIKE '+key+' OR Id LIKE '+key+')';
        }
        if ( selectedSegment != null && selectedSegment != '' ) {
            query += ' AND Segment__c   = :selectedSegment';
        }
        if ( selectedStore != null && selectedStore != '' ) {
            query += ' AND Main_Boutique__c = :selectedStore';
        }
        if ( selectedCountry != null && selectedCountry != '' ) {
            query += ' AND Main_Boutique__r.Code_ISO3__c = :selectedCountry';
        }
        if (exModifIn3day == true ) {
            query += ' AND LastModifiedDate < LAST_N_DAYS:3';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        if ( offset < 2001 ) {
        query = query + ' LIMIT 50 OFFSET '+ offset;
        }
        return Database.query( query );        
    }

    // @AuraEnabled
    // public static List<Account> GetAccs( String searchKey, String sortBy, String sortDirection) {
    //     String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c FROM Account WHERE RecordType.Id = \'012Qy000000QRvpIAG\' ';
    //     system.debug('query---'+query);
    //     if ( searchKey != null && searchKey != '' ) {
    //         String key = ' LIKE %' + searchKey + '%';
    //         query += ' AND Name :key';
    //     }
    //     if ( sortBy != null && sortDirection != null ) {
    //         query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
    //     }
    //     query = query + ' LIMIT 30';
    //     return Database.query( query );
    // }
    
 

        @AuraEnabled
    public static void Realloction2(List<String> lstIdAccounts, String newOwnerId,  String newStorsId) {
        try {
            List<Account> accsToUpdate = new List<Account>();
            for (String accountId : lstIdAccounts) {
                Account a = new Account();
                a.Id = accountId;
                a.OwnerId = newOwnerId;
                a.Main_Boutique__c = newStorsId;
                accsToUpdate.add(a);
            }
            update accsToUpdate;
        } catch (Exception e) {
            System.debug('Erreur : ' + e.getMessage());
        }
    }
}