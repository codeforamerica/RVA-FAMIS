var allData;
var json = [
  {
    'service_title': 'waka',
    'covered': 'yes',
    'copay_below': 5,
    'copay_above': 10,
    'copay_extra': 'Lorem ipsum dolor sit amet.',
    'description_original': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'description_updated': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    'service_title': 'flaka',
    'covered': 'no',
    'copay_below': 2,
    'copay_above': 5,
    'copay_extra': '',
    'description_original': 'Tabore et dolore magna orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'description_updated': 'Consequat adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

function init() {
 
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
  var html = '<li class="service-item cf">';
  var title;

  // build html object string
  if (service.covered == 'yes') {
    // add checkmark icon
    title = '<span class="fa fa-check"></span>' + service.service_title;
  } else {
    title = '<span class="fa fa-times"></span>' + service.service_title;
  }
  html += '<h3 class="service-title">' + title + '</h3>';

  // add copay info
  if(service.covered == 'yes') {
    html += '<div class="copay-info"><div class="copay-block copay-below">';
    html += '<p class="copay"><span class="copay-inner">$' + service.copay_below + '</span></span><span class="copay-extra"></span></p></div>';
    html += '<div class="copay-block copay-above">';
    html += '<p class="copay"><span class="copay-inner">$' + service.copay_above + '</span></span><span class="copay-extra"></span></p></div></div>';
  }
  html += '<div class="service-info"><div class="description">';
  html += service.description_updated;
  html += '</div>';
  html += '</li>';

  // append object string to .results-list
  $('.results-list').append(html);

  // <li class="service-item cf">
  //   <h3 class="service-title"></h3>
  //   <div class="copay-info">
  //     <div class="copay-block copay-below">
  //       <div class="copay-header">Below</div>
  //       <p>$<span class="copay"></span><span class="copay-extra"></span></p>
  //     </div>
  //     <div class="copay-block copay-above">
  //       <div class="copay-header">Above</div>
  //       <p>$<span class="copay"></span><span class="copay-extra"></span></p>
  //     </div>
  //   </div>
  //   <div class="service-info">
  //     <div class="description">
  //       <p></p>
  //     </div>
  //     <div class="description-extra">
  //       <p></p>
  //     </div>
  //   </div>
  // </li>

}

window.onload = init;