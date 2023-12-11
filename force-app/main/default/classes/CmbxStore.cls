public with sharing class CmbxStore {
    @AuraEnabled(cacheable=true)
    public static List<Store__c> getStores(List<String> lstCtry){
        // List<String> stringList = lstCtry.split(',');

//         String inputString = 'a00Qy000003CRLDIA4,a00Qy000003CRLHIA4,a00Qy000003CRLEIA4,a00Qy000003CRLGIA4,a00Qy000003CRLFIA4';
// List<String> stringList = inputString.split(',');
        return [SELECT Id, Nom_du_magasin__c  FROM Store__c WHERE Code_ISO3__c IN :lstCtry ORDER BY Nom_du_magasin__c];
    }
}
// return [SELECT Id, Nom_du_magasin__c  FROM Store__c WHERE Code_ISO3__c = 'a00Qy000003CRLDIA4' ORDER BY Nom_du_magasin__c];



// String inputString = 'a00Qy000003CRLDIA4,a00Qy000003CRLHIA4,a00Qy000003CRLEIA4,a00Qy000003CRLGIA4,a00Qy000003CRLFIA4';
// List<String> stringList = inputString.split(',');
// List<Store__c> res = [SELECT Id, Nom_du_magasin__c  FROM Store__c WHERE Code_ISO3__c IN :stringList ORDER BY Nom_du_magasin__c];    

// System.debug(res);

// 19:09:05.26 (46455526)|VARIABLE_ASSIGNMENT|[4]|res|"List of size 87 too large to display"|0x129ac920
// 19:09:05.26 (46471051)|STATEMENT_EXECUTE|[6]
// 19:09:05.26 (46715109)|USER_DEBUG|[6]|DEBUG|(Store__c:{Id=a01Qy000004ZP1dIAG, Nom_du_magasin__c=Boutique d'Athènes 1}, Store__c:{Id=a01Qy000004ZP2XIAW, Nom_du_magasin__c=Boutique de Amiens 1}, Store__c:{Id=a01Qy000004ZP2VIAW, Nom_du_magasin__c=Boutique de Angers 1}, Store__c:{Id=a01Qy000004ZP1nIAG, Nom_du_magasin__c=Boutique de Ashdod 1}, Store__c:{Id=a01Qy000004ZP1vIAG, Nom_du_magasin__c=Boutique de Atlanta 1}, Store__c:{Id=a01Qy000004ZP21IAG, Nom_du_magasin__c=Boutique de Bari 1}, Store__c:{Id=a01Qy000004ZP1oIAG, Nom_du_magasin__c=Boutique de Beersheba 1}, Store__c:{Id=a01Qy000004ZP1yIAG, Nom_du_magasin__c=Boutique de Bologna 1}, Store__c:{Id=a01Qy000004ZP1NIAW, Nom_du_magasin__c=Boutique de Bordeaux 1}, Store__c:{Id=a01Qy000004ZP1wIAG, Nom_du_magasin__c=Boutique de Boston 1}, ...)
// 19:09:05.46 (46828387)|CUMULATIVE_LIMIT_USAGE
// 19:09:05.46 (46828387)|LIMIT_USAGE_FOR_NS|(default)|
//   Number of SOQL queries: 1 out of 100
//   Number of query rows: 87 out of 50000

