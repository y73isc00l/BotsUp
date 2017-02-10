var natural=require('natural');
natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    classifier.addDocument('long SUNW','business');
    classifier.train();
    console.log(classifier.getClassifications('long SUNW'));
    console.log(classifier.getClassifications('short SUNW'));
});