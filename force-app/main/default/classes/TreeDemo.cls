public with sharing class TreeDemo {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountDetails(){

        return [Select Id,Name,(Select FirstName,LastName from Contacts) from Account LIMIT 3];
    }
    
}
