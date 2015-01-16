var allData;
var json = [
    {
        "id": 1, 
        "name": "Immunizations", 
        "covered": "yes", 
        "search_terms": "Vaccines, Measles, Mumps", 
        "copay_low": 0, 
        "copay_high": 0, 
        "caveats": [
            {
                "legalese": "The MCO shall cover all emergency services provided by out-of-network providers.", 
                "plain": "Includes coverage for out-of-network providers."
            }
        ]
    }, 
    {
        "id": 2, 
        "name": "Emergency Services (Hospital Emergency Room)", 
        "covered": "yes", 
        "search_terms": "ER,", 
        "copay_low": 5, 
        "copay_high": 2, 
        "caveats": []
    }, 
    {
        "id": 3, 
        "name": "Pap Smears", 
        "covered": "yes", 
        "search_terms": "", 
        "copay_low": 0, 
        "copay_high": 0, 
        "caveats": []
    }, 
    {
        "id": 4, 
        "name": "Pregnancy-related Services", 
        "covered": "yes", 
        "search_terms": "", 
        "copay_low": 0, 
        "copay_high": 0, 
        "caveats": [
            {
                "legalese": "The MCO shall cover services to pregnant women, including prenatal services for FAMIS and FAMIS MOMS. There is no co-pay for pregnancy related services.", 
                "plain": "Pregnancy related services and prenatal services are covered with no copay."
            }, 
            {
                "legalese": "No cost sharing at all will be charged to members enrolled in FAMIS MOMS.", 
                "plain": "Members should be enrolled in FAMIS MOMS, a special program for pregnancy services."
            }
        ]
    }, 
    {
        "id": 5, 
        "name": "Prescription Drugs", 
        "covered": "yes", 
        "search_terms": "pills", 
        "copay_low": 5, 
        "copay_high": 2, 
        "caveats": [
            {
                "legalese": "The MCO shall be responsible for covering all medically necessary drugs for its members that by Federal or State law requires a prescription. The MCO shall cover all FAMIS covered prescription drugs prescribed by providers licensed and/or certified as having authority to prescribe the drug. The MCO is required to cover prescription drugs prescribed by the outpatient mental health provider. The MCO is not required to cover Drug Efficacy Study Implementation (DESI) drugs or over the counter prescriptions.\r\nThe MCO may establish a formulary, may require prior authorization on certain medications, and may implement a mandatory generic substitution program. However, the MCO shall have in place special authorization procedures to allow providers to access drugs outside of this formulary, if medically necessary. The MCO shall establish policies and procedures to allow providers to request a brand name drug for a member if it is medically necessary. The MCO shall cover atypical  antipsychotic  medications developed for the treatment of schizophrenia. The MCO shall ensure appropriate access to the most effective means to treat, except where indicated for the safety of the patient. The Contractor shall not cover prescriptions for erectile dysfunction medication for members identified as having been convicted of felony sexual offenses.", 
                "plain": "If a generic is available, member pays the copayment plus 100% of the difference between the allowable charge of the generic drug and the brand drug."
            }
        ]
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
    html += '<div class="copay-block copay-above">';
    html += '<p class="copay"><span class="copay-inner">$' + service.copay_high + '</span></span><span class="copay-extra"></span></p></div>';
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

  html += '</div>';
  html += '</article>';

  // append object string to .results-list
  $('.results-list').append(html);

}

window.onload = init;