# BOTHERMIONE

![image](https://repository-images.githubusercontent.com/436434470/a28b29f8-4594-45c0-99fa-364d3549fcd7)

BotHermione is a SvelteKit deployment for the extended BotHermione universe. It has the following abilities

- [ML Generated Fics](src/routes/fics)
- [Random Linked AO3 Fics](src/routes/index.svelte)
- [Data Analysis](src/routes/analysis)
- [AO3 Wrapped (New!)](src/routes/wrapped)

### ML Generated Fics

The fics themselves are not generated on the frontend. A micro EC2 instance runs once per day to generate a new fic, which is then stored in a Firebase realtime database. The [[slug].svelte](src/routes/fics/[slug].svelte) then dynamically loads this data to create a new page based on the passed route.

### Random Linked AO3 Fics

These run functionally the same to the ML fics. The EC2 instance loads a random fic that contains Hermione as the primary relationship, generates a string and then saves to the same Firebase realtime database. These are cycled through automatically.

### Data Analysis

A (admittedly very large) [.json file ](static/shrunk_db.json) contains heavily parsed and shrunk data about all fics stored in AO3 with Hermione as the primary relationship. This information can then be parsed using the [analysis](src/routes/analysis/fanfic_analysis.svelte)

### AO3 Wrapped

AO3 wrapped is a frontend display to parse a users 2021 on AO3. The page requests username and password, and then sends this data to a Heroku deployment that performs the following actions:

- Logs in as the user
- Reads their history
- Parses information
- Returns an object containing details about their time online.

This function can be seen in the [bothermione_ao3wrapped repository](https://github.com/kanashter/bothermione-flask). No details about the user are stored or logged.
