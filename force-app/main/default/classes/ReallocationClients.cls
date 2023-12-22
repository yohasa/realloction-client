public with sharing class ReallocationClients implements Queueable {
    private List<String> lstIdAccounts; 
    private Id newOwnerId;
    private Id newStorsId;
    
    public ReallocationClients(List<String> lstIdAccounts, Id newOwnerId, Id newStorsId){
        this.lstIdAccounts = lstIdAccounts;
        this.newOwnerId = newOwnerId;
        this.newStorsId = newStorsId;
    }
    
    public void execute(QueueableContext context) {
        List<Account> accsToUpdate = new List<Account>();
        List<Account> accs = [SELECT Id, OwnerId, Main_Boutique__c FROM Account WHERE RecordType.Id = '012Qy000000QRvpIAG' AND Id IN :lstIdAccounts];
        for (Account a  :accs) {
            a.OwnerId = this.newOwnerId;
            a.Main_Boutique__c = this.newStorsId;
            accsToUpdate.add(a);
        }
        update accsToUpdate;
    }
}