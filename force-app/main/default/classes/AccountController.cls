public with sharing class AccountController {
    // @AuraEnabled
    // public static List<Opportunity> GetAccs( String searchKey, String sortBy, String sortDirection) {
    //         String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName , Main_Boutique__r.Nom_du_magasin__c FROM Account ';
    //         system.debug('query---'+query);
    //         if ( searchKey != null && searchKey != '' ) {
    //                 String key = '%' + searchKey + '%';
    //                 query += ' WHERE Name LIKE :key';
    //             }
    //             if ( sortBy != null && sortDirection != null ) {
    //                     query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
    //                 }
    //                 query = query + ' LIMIT 30';
    //                 return Database.query( query );
    //             }
    @AuraEnabled
    public static List<Opportunity> GetAccs( String searchKey, String sortBy, String sortDirection) {
        String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c FROM Account WHERE RecordType.Id = \'012Qy000000QRvpIAG\' ';
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' AND Name LIKE :key';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        query = query + ' LIMIT 30';
        return Database.query( query );
    }
    @AuraEnabled
    public static List<Account> GetAccounts(List<String> lstOwner,  String searchKey, Integer offSetCount, String sortBy, String sortDirection){
        String query = 'SELECT Id,  LastName, FirstName, PersonEmail, Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  FROM Account ';
        system.debug('query---'+query);
        if ( lstOwner != null ) {
        query += ' WHERE OwnerId  = '+ lstOwner;
        } else return null;
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' AND (Name LIKE :key OR Id LIKE :key)';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        query = query + ' LIMIT 50 OFFSET '+ offSetCount;
        return Database.query( query );        
    }
}