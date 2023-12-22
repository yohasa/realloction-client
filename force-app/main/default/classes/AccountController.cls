public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    // public static List<Opportunity> GetAccs( String searchKey, String sortBy, String sortDirection) {
    //     String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName , Main_Boutique__r.Nom_du_magasin__c FROM Account WHERE Segment__c =! NULL';
    //     system.debug('query---'+query);
    //     if ( searchKey != null && searchKey != '' ) {
    //         String key = '%' + searchKey + '%';
    //         query += ' AND Name LIKE :key';
    //     }
    //     if ( sortBy != null && sortDirection != null ) {
    //         query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
    //     }
    //     query = query + ' LIMIT 30';
    //     return Database.query( query );
    // }
    // @AuraEnabled(cacheable=true)
    public static List<Opportunity> GetAccs( String searchKey, String sortBy, String sortDirection) {
        String query = 'SELECT Id, Name, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c FROM Account';
        system.debug('query---'+query);
        if ( searchKey != null && searchKey != '' ) {
            String key = '%' + searchKey + '%';
            query += ' WHERE Name LIKE :key';
        }
        if ( sortBy != null && sortDirection != null ) {
            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        query = query + ' LIMIT 30';
        return Database.query( query );
    }
}