# Buildable Templates for Shield Study Consent Pages


1.  change `data.js` and `copy.md` with your info.

2.  npm install

3.  `gulp build` => `dist` directory with a compiled template (site).

4.  (optional) Turn into an AMO patch (see mozilla/addons-server#3271)

    ```
    # in a 2nd terminal.
    git clone mozilla/addons-server
    cd addons-server

    ## take the built site, turn it into an AMO Static Site patch
    bash ~/path/to/shield-template/reformat-amo.sh ~/path/to/shield-template/dist/ shield_study_4

    ## edit these files
    src/olympia/pages/tests.py
    src/olympia/pages/urls.py
    ```





