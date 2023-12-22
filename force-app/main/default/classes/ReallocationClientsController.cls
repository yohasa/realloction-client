public with sharing class ReallocationClientsController {
    @AuraEnabled
    public static void execute(List<String> lstIdAccounts, Id newOwnerId, Id newStorsId) {
        ReallocationClients reallocation = new ReallocationClients(lstIdAccounts, newOwnerId, newStorsId);
        System.enqueueJob(reallocation);
    }
}