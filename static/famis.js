var allData;

function init() {
  Tabletop.init({
    key: '1cNaJmqIIJvWi1OrLSAFPQpddC0uau6nWnLdhyB2FSyU',
    callback: function(data) {allData = data;},
    simpleSheet: true
  });
 
  var searchTerms = ['Vision', 'Ambulance', 'Emergency Room', 'Vaccinations'];
  
  var searchSuggestionEngine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $.map(searchTerms, function(term) { return { value: term }; })
  });

  searchSuggestionEngine.initialize();

  $('#search').typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'searchTerms',
      displayKey: 'value',
      source: searchSuggestionEngine.ttAdapter()
    }
  );
}

function buildFamis(e) {
  printSearchResult(allData[0]);
}

function printSearchResult(result) {
  var coveredText;
  if (result.covered_yn == 'Yes') {
    coveredText = "FAMIS covers ";
  }
  else {
    coveredText = "FAMIS does not cover ";
  }
  coveredText = coveredText.concat(result.service);
  $(".covered").append(coveredText);

  var copayText = "Copay: ".concat(result.copay_below_150);
  $(".copay").append(copayText);
  var descriptionText = result.description_new;
  $(".description").append(descriptionText);
}

window.onload = init;