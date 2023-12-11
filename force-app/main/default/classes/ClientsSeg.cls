public  with sharing class ClientsSeg {
    // public class DonneesGraphique {
    //     public String segment { get; set; }
    //     public Integer valeur { get; set; }
    // }
    @AuraEnabled(cacheable=true)
    
    // @AuraEnabled
    // public static List<DonneesGraphique> getPie(List<String> ownerIds) {
    public static List<AggregateResult> getPie(List<String> ownerIds) {
        //    List<Id> ownerIds = new List<Id>{ '005Qy0000014MpKIAU' };

        // List<DonneesGraphique> resultats = new List<DonneesGraphique>();

        // List<AggregateResult> aggregations =
         
        return [
            SELECT Segment__c, COUNT(Id) val
            FROM Account
            WHERE OwnerId IN :ownerIds
            GROUP BY Segment__c
            ORDER BY Segment__c
        ];

        // for (AggregateResult aggregation : aggregations) {
        //     DonneesGraphique donnees = new DonneesGraphique();
        //     donnees.segment = (String)aggregation.get('Segment__c');
        //     donnees.valeur = (Integer)aggregation.get('val');
        //     resultats.add(donnees);
        // }

        // return resultats;
    // }
}

// public with sharing class ClientsSeg {

//     /**
//      * @description Méthode pour récupérer les données pour le graphique en secteurs.
//      * @return Liste d'objets AggregateResult contenant les résultats groupés par Segment__c.
//      */
//     @AuraEnabled
//     public static List<AggregateResult> getPie() {
//     // public static Map<String, Integer> getPie(Id owId) {
//         try {
//             List<Id> ownerIds = new List<Id>{ '005Qy0000014MpKIAU' };
//             // Map<String, Integer> uGloAccPerCnt = new Map<String, Integer>();
//     List<AggregateResult> cntAccgrpRes = [SELECT Segment__c, COUNT(Id) val FROM Account WHERE OwnerId IN :ownerIds GROUP BY Segment__c ORDER BY Segment__c];
//         // SELECT OwnerId, COUNT(Id) accountCount FROM Account
//         //  WHERE OwnerId IN :ownerIds  GROUP BY OwnerId
//     // for (AggregateResult ar : CntAccgrpRes) {
//     //      uGloAccPerCnt.put((String)ar.get('Segment__c'), (Integer)ar.get('val')); }
//             return  cntAccgrpRes;
//             // return  uGloAccPerCnt;
//             // [SELECT Segment__c, COUNT(Id) val FROM Account WHERE OwnerId = :owId GROUP BY Segment__c ORDER BY Segment__c];
//         } catch (Exception e) {
//             // Gérer les erreurs ici, par exemple, en enregistrant les erreurs dans une table de journalisation.
//             System.debug('Erreur lors de l\'exécution de la requête : ' + e.getMessage());
//             return new List<AggregateResult>();
//             // return new Map<String, Integer>();
//         }
//     }
// }



}



