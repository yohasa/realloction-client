public with sharing class ClieentReallocationControler {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> GetCountries(){
        return [SELECT  Id, Name 
                FROM Country__c   
                ORDER BY Name];
    }
    @AuraEnabled
    public static List<AggregateResult> GetCountries2(List<String> lstOwner){
        return[SELECT  Main_Boutique__r.Code_ISO3__c,  Main_Boutique__r.Code_ISO3__r.Name
        FROM Account 
        WHERE Main_Boutique__c != null AND OwnerId = :lstOwner 
        GROUP BY  Main_Boutique__r.Code_ISO3__c,  Main_Boutique__r.Code_ISO3__r.Name
        ORDER BY Main_Boutique__r.Code_ISO3__r.Name];
    }
    @AuraEnabled
    public static List<AggregateResult> GetStores(List<String> lstCtry){
        return[SELECT Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c,  Main_Boutique__c 
        FROM Account 
        WHERE Main_Boutique__c != null AND Main_Boutique__r.Code_ISO3__c IN :lstCtry
        GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c
        ORDER BY Main_Boutique__r.Nom_du_magasin__c];
    }
    
    
    @AuraEnabled
        public static List<Store__c> GetStores2(List<String> lstCtry){
        return [SELECT Id, Nom_du_magasin__c  
                FROM Store__c 
                WHERE Code_ISO3__c IN :lstCtry 
                ORDER BY Nom_du_magasin__c];
    }
    @AuraEnabled
    public static List<AggregateResult> GetOwners(List<String> lstStors){
        return [SELECT Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
        FROM Account 
        WHERE  RecordType.Id = '012Qy000000QRvpIAG' AND Main_Boutique__c IN :lstStors  
        GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId , Owner.LastName, Owner.FirstName];
    }
    @AuraEnabled
    public static List<AggregateResult> GetOwnersCard(List<String> lstStors){
        return [SELECT OwnerId, Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Segment__c, COUNT(Id) accCount 
        FROM Account 
        WHERE  RecordType.Id = '012Qy000000QRvpIAG' AND Main_Boutique__c IN :lstStors 
        GROUP BY  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.Name, Segment__c 
        ORDER BY OwnerId, Segment__c];
    }
    @AuraEnabled
    public static List<Account> GetAccounts(List<String> lstOwner, Integer offSetCount){
        return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
                FROM Account
                WHERE RecordType.Id = '012Qy000000QRvpIAG' AND OwnerId  = :lstOwner
                LIMIT 50 OFFSET :offSetCount];
    }
    @AuraEnabled
    public static List<Account> GetAccounts2(List<String> lstOwner){
        return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
                FROM Account
                WHERE OwnerId  = :lstOwner];
                // LIMIT 10];
    }
    @AuraEnabled
    public static List<Account> GetAccounts3(List<String> lstOwner, Integer offset, String searchKey){
        String query = 'SELECT Id,  LastName, FirstName, PersonEmail, Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  FROM Account  WHERE RecordType.Id= \'012Qy000000QRvpIAG\' ';
        system.debug('query---'+query);
        if ( lstOwner != null ) {
        query += ' AND OwnerId  = :lstOwner';
        }
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' AND FirstName LIKE :key ';
        }
        // if ( sortBy != null && sortDirection != null ) {
        //     query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        // }
        if ( offset < 2001 ) {
        query = query + ' LIMIT 50 OFFSET '+ offset;
        }
        return Database.query( query );        
    }

    @AuraEnabled
    public static List<Account> GetAccounts4(List<String> lstOwner, Integer offset, Integer jusqua, String searchKey, String segmentOptions, String storeOptions, String sortBy, String sortDirection){
        String query = 'SELECT Id,  LastName, FirstName, PersonEmail, Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  FROM Account  WHERE RecordType.Id= \'012Qy000000QRvpIAG\' ';
        system.debug('query---'+query);
        if ( lstOwner != null ) {
        query += ' AND OwnerId  = :lstOwner';
        }
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            // String keye = '%' + searchKey + '%';
            query += ' AND ( PersonEmail LIKE :key OR Id = :searchKey )';
            // query += ' AND (LastName LIKE '+key+' OR FirstName LIKE '+key+' OR Id LIKE '+key+')';
        }
        if ( segmentOptions != null && segmentOptions != '' ) {
            query += ' AND Segment__c   = :segmentOptions';
        }
        if ( storeOptions != null && storeOptions != '' ) {
            query += 'AND Main_Boutique__c = :storeOptions';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        if ( offset < 2001 ) {
        query = query + ' LIMIT '+ jusqua +' OFFSET '+ offset;
        }
        return Database.query( query );        
    }


    @AuraEnabled
    public static List<Account> GetAccs( String searchKey, String sortBy, String sortDirection) {
        String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c FROM Account WHERE RecordType.Id = \'012Qy000000QRvpIAG\' ';
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
            String key = ' LIKE %' + searchKey + '%';
            query += ' AND Name :key';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        query = query + ' LIMIT 30';
        return Database.query( query );
    }
    
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
    
        