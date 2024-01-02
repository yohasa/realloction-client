public with sharing class AppRealloc {
    @AuraEnabled(cacheable=true)
    public static List<Country__c> GetCountries(){
    return [
            SELECT  Id, Name 
                FROM Country__c   
                ORDER BY Name
            ];
        }
                        @AuraEnabled(cacheable=true)
                        public static List<Country__c> GetCountryStores(){
                        return[SELECT Id, Name,
                                     (SELECT Id, Nom_du_magasin__c 
                                      FROM Stores1__r
                                      ORDER BY Nom_du_magasin__c) 
                               FROM Country__c 
                               ORDER BY Name];
                        }
                        // SELECT  Id, Name 
                        //     FROM Country__c   
                        //     ORDER BY Name
    @AuraEnabled
    public static List<AggregateResult> GetStores(List<String> lstCtry){
        return[SELECT Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c,  Main_Boutique__c 
        FROM Account 
        WHERE Main_Boutique__c != null AND Main_Boutique__r.Code_ISO3__c IN :lstCtry
        GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c
        ORDER BY Main_Boutique__r.Nom_du_magasin__c];
    }
    // SELECT Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c,  Main_Boutique__c , Main_Boutique__r.Code_ISO3__r.iso__c
    //     FROM Account 
    //     WHERE Main_Boutique__c != null AND Main_Boutique__r.Code_ISO3__c != null
    //     GROUP BY Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c, Main_Boutique__r.Code_ISO3__r.iso__c
    //     ORDER BY Main_Boutique__r.Nom_du_magasin__c
    
    @AuraEnabled
        public static List<Store__c> GetStores2(List<String> lstCtry){
        return [SELECT Id, Nom_du_magasin__c  
                FROM Store__c 
                WHERE Code_ISO3__c IN :lstCtry 
                ORDER BY Nom_du_magasin__c];
            }
            // AND Code_ISO3__c IN :storActive
            // SELECT Id, Nom_du_magasin__c , Code_ISO3__r.iso__c 
            //             FROM Store__c 
            //             WHERE Code_ISO3__c != null 
            //             ORDER BY Code_ISO3__r.iso__c 
    @AuraEnabled
    public static List<AggregateResult> GetOwners(List<String> lstStors){
        return [SELECT
        Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c,  Main_Boutique__r.Code_ISO3__c, Main_Boutique__r.Code_ISO3__r.Name,  OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
        // Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.LastName, Owner.FirstName, COUNT(Id) accountCount 
        FROM Account 
        WHERE Main_Boutique__c IN :lstStors  
        GROUP BY  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Main_Boutique__r.Code_ISO3__c, Main_Boutique__r.Code_ISO3__r.Name, OwnerId , Owner.LastName, Owner.FirstName
        order by Main_Boutique__r.Nom_du_magasin__c
        //  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId , Owner.LastName, Owner.FirstName
        ];
    }
    @AuraEnabled
    public static List<AggregateResult> GetOwnersCard(List<String> lstStors){
        return [SELECT OwnerId, Owner.Name, Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, Segment__c, COUNT(Id) accCount 
        FROM Account 
        WHERE Main_Boutique__c IN :lstStors 
        GROUP BY  Main_Boutique__c, Main_Boutique__r.Nom_du_magasin__c, OwnerId, Owner.Name, Segment__c 
        ORDER BY OwnerId, Segment__c];
    }
    @AuraEnabled
    public static List<Account> GetAccounts(List<String> lstOwner, Integer offSetCount){
        return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
                FROM Account
                WHERE OwnerId  = :lstOwner
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
    public static List<Account> GetAccounts3(List<String> lstOwner){
        return [SELECT Id,  LastName, FirstName, PersonEmail,  Segment__c, OwnerId, Owner.LastName, Owner.FirstName, Main_Boutique__r.Nom_du_magasin__c  
                FROM Account
                LIMIT 10];
                // WHERE OwnerId  = :lstOwner];
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

    // List<String> lstIdAccounts = new List<String>{'001Qy000004vMjsIAE' ,'001Qy000004vPBGIA2'};
    // String newOwnerId='005Qy0000014Mp1IAE';
    // public static void Realloc(List<String> lstIdAccounts, String newOwnerId, String newStorsId) {
        // @future
        //================//================================================================
        // @AuraEnabled(cacheable=true)
        // public static void execute(List<String> lstIdAccounts, Id newOwnerId, Id newStorsId) {
        //     ReallocationClients reallocation = new ReallocationClients(lstIdAccounts, newOwnerId, newStorsId);
        //     System.enqueueJob(reallocation);
        // }
        //================//================================================================

    //     public static void GetReallocation(Map<String, Object> params) {
    //         try {

    //             System.debug(JSON.serialize(params));


    //             System.debug('newStorsId: ' + (Id)params.get('newStorsId'));
    //             System.debug('newOwnerId: ' + (Id)params.get('newOwnerId'));
    //             System.debug('lstIdAccounts: ' + (List<String>)params.get('lstIdAccounts'));
                
    //             // Votre code existant
    //             Id newOwnerId = (Id)params.get('newOwnerId');
    //             Id newStorsId = (Id)params.get('newStorsId');
    //             List<Id> lstIdAccounts = (List<String>)params.get('lstIdAccounts');
        
    //             List<Account> accs = [SELECT Id, OwnerId, Main_Boutique__c FROM Account WHERE Id IN :lstIdAccounts];
    //             List<Account> accsToUpdate = new List<Account>();
                
    //             for (Account a : accs) {
    //                 a.OwnerId = newOwnerId;
    //                 a.Main_Boutique__c = newStorsId;
    //                 accsToUpdate.add(a);
    //             }
                
    //             update accsToUpdate;
        
    //             // Si quelque chose va mal, lancez une exception
    //             throw new AuraHandledException('Une erreur sest produite.');
        
    //         } catch (Exception e) {
    //             // Gérez l'erreur et enregistrez des détails si nécessaire
    //             System.debug('Erreur : ' + e.getMessage());
    //             throw e; // Vous pouvez choisir de gérer différemment l'erreur si nécessaire
    //         }
    //     }
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
    
    
                // System.debug(JSON.serialize(lstIdAccounts));
                // System.debug(JSON.serialize(newOwnerId));
                // System.debug(JSON.serialize(newStorsId));
    
// List<Account> accs = [SELECT Id, OwnerId, Main_Boutique__c FROM Account WHERE Id IN :lstIdAccounts];
// for (Account a : accs) {
    //     a.OwnerId = newOwnerId;
    //     a.Main_Boutique__c = newStorsId;
    //     accsToUpdate.add(a);
    // }
    // Gérez l'erreur et enregistrez des détails si nécessaire
    // Si quelque chose va mal, lancez une exception
    //throw new AuraHandledException('Une erreur sest produite.');
    // throw e; // Vous pouvez choisir de gérer différemment l'erreur si nécessaire

    // public static void Realloction(List<String> lstIdAccounts, String newOwnerId) {
    //     Integer t = 0;
    //     List<User> useers = [SELECT Id, IsActive, IdStore__c FROM User WHERE IdStore__c != null AND Id = :newOwnerId LIMIT 1];
    //     List<Account> accs = [SELECT Id, OwnerId, Main_Boutique__c FROM Account WHERE RecordType.Id = '012Qy000000QRvpIAG' AND Id IN :lstIdAccounts];
    //     List<Store__c> stoores = [SELECT Id, ExIdStore__c FROM Store__c];
    //     for (Integer s = 0; s < stoores.size(); s++) {
    //         if (stoores[s].ExIdStore__c == useers[0].IdStore__c) {
    //             t = s;
    //             break;
    //         }
    //     }
    //     for (Account a : accs) {
    //         a.OwnerId = useers[0].Id;
    //         a.Main_Boutique__c = stoores[t].Id;
    //     }
    //     update accs;
    // }
       
       
    //     List<Account> accounts = [
    //         SELECT Id, OwnerId, Main_Boutique__c 
    //         FROM Account 
    //         WHERE RecordType.Id = '012Qy000000QRvpIAG' AND Id IN :lstIdAccounts
    //     ];
        
    //     for (Account a : accounts) {
    //         a.OwnerId = newOwnerId;
    //         a.Main_Boutique__c = newStorsId;
    //     }
        
    //     update accounts;
    // }
}
    
                                // User newOw = [SELECT Id, IdStore__c FROM User WHERE Id = :newOwnerId];
                                // a.OwnerId = newOw.Id;
                                // a.Main_Boutique__c = newOw.IdStore__c;