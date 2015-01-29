# RVA-FAMIS

---

### Status

This prototype was created by the 2015 Richmond VA team at Code for America during *Alpha* (build week). Our intention is to leave this repository as a record of our work during Build Week.  **This is no longer an active project and is being developed on a different TBD repository.**

---

### What is this?

This application is a proof-of-concept search tool for parents to quickly check which services are covered for their children under [FAMIS](http://www.coverva.org/programs_famis.cfm). Along with services covered we plan to show copay amounts and human-readable descriptions of the services. Currently, users are only able to learn about which services are covered (and aren't covered!) via a long-form PDF file that lacks consistency and is largely written in legal jargon. This can be confusing to a parent who is simply checking if a specific service is covered and what the copay is.

### How is it built?

This specific repository is purely a **proof of concept** that is statically built to show potential. The intention is to create a two-sided tool with 1) a front-facing interface for users to search coverage, and 2) an analytics tool for admins and health Navigators to learn about which services are being searched for and if the tool/information is helpful.

The front is built using custom CSS & JavaScript with the autocomplete functionality built with [TypeAhead](https://twitter.github.io/typeahead.js/). The backend is built on Django that opens the PDF data into a publicly consumable & query-able API. The user searches, which sends a query that returns results in JSON. The Django interface allows admins to edit information and view search analytics to understand what information is most useful and what needs improvement.

### Next steps

We'd like to better assess the need for this type of service that connects users' questions with Navigator knowledge. Updates to the system would include making it more modular for deployment of different information (other than just FAMIS info), *actually* building the API, incorporating a simple analytics platform (i.e. Google analytics click events), and build proper tests.