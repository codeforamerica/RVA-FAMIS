var allData;
var json = [
    {
        "name": "Eyeglasses (Frames & Lenses)",
        "covered": "yes", 
        "copay_low": 35, 
        "copay_high": 35, 
        "caveats": [
            {
                "plain": "One pair of eyeglasses at a time are covered if your eye doctor says you need them."
            }
        ]
    }, 
    {
        "name": "Eye Exams",
        "covered": "yes", 
        "copay_low": 2, 
        "copay_high": 5, 
        "caveats": [
            {
                "plain": "Covers routine eye exams every 2 years."
            }
        ]
    }, 
    {
        "name": "Bifocal Eyeglasses",
        "covered": "yes", 
        "copay_low": 50, 
        "copay_high": 50, 
        "caveats": [
            {
                "plain": "One pair of eyeglasses at a time are covered if your eye doctor says you need them."
            }
        ]
    }, 
    {
        "name": "Trifocal Eyeglasses",
        "covered": "yes", 
        "copay_low": 88, 
        "copay_high": 88, 
        "caveats": [
            {
                "plain": "One pair of eyeglasses at a time are covered if your eye doctor says you need them."
            }
        ]
    }, 
    {
        "name": "Contacts",
        "covered": "yes", 
        "copay_low": 100, 
        "copay_high": 100, 
        "caveats": [
            {
                "plain": "Contacts are covered if your eye doctor says you need them."
            }
        ]
    },
    {
        "name": "Colored Contact Lenses",
        "covered": "no", 
        "copay_low": 100, 
        "copay_high": 100, 
        "caveats": [
            {
                "plain": "Colored contacts are not covered by FAMIS."
            }
        ]
    },
];

function init() {
 
  var searchTerms = ['Vision', 'Ambulance', 'Emergency Room', 'Vaccinations', 'School Vaccinations'];
  
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

  $('#submit').on('click', function(e){
    e.preventDefault();
    buildFamis();
  });
}

function buildFamis(e) {
  // remove previous search if it exists

  // make queried call to API
  // ... return

  // if response comes back negative, do noResults()

  // otherwise for each item returned, run object through printSearchResult()
  for (var i = 0; i < json.length; i++) {
    printSearchResult(json[i]);
  }
}

function noResults() {
  // no results
}

function printSearchResult(service) {
  console.log(service);

  // prepare html object string (yuck!)
  var html = '<article class="service-item cf">';
  var title;

  // build html object string
  if (service.covered == 'yes') {
    // add checkmark icon
    title = '<span class="fa fa-check"></span>' + service.name;
  } else {
    title = '<span class="fa fa-times"></span>' + service.name;
  }
  html += '<h3 class="service-title">' + title + '</h3>';

  // add copay info
  if (service.covered == 'yes') {
    html += '<div class="copay-info">';
    html += '<div class="copay-block copay-below">';
    html += '<p class="copay"><span class="copay-inner">$' + service.copay_low + '</span></span><span class="copay-extra"></span></p></div>';
    //html += '<div class="copay-block copay-above">';
    //html += '<p class="copay"><span class="copay-inner">$' + service.copay_high + '</span></span><span class="copay-extra"></span></p></div>';
    html += '</div>';
  }

  // add caveat information
  if (service.caveats.length > 0) {
    html += '<ul class="service-info">';
    for (var c = 0; c < service.caveats.length; c++) {
      html += '<li>' + service.caveats[c].plain + '</li>';
    }
    html += '</ul>';
  }
  

  // caveats loop
  // html += service.description_updated;


  html += "<br><div>Was this helpful? <i class='fa fa-thumbs-o-up'></i> <i class='fa fa-thumbs-o-down'></i> </div>";

  html += '</div>';
  html += '</article>';

  // append object string to .results-list
  $('.results-list').append(html);

}

window.onload = init;
