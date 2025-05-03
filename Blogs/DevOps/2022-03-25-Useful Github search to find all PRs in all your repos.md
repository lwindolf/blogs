The Github "Pull requests" link that you can find on top menu bar leads you to four useful pull request queries:

- PRs created by you
- PRs assigned to you
- PRs mentioning you
- Review requests for you

but what about all PRs in all the repos of your user account / organisation?

To achieve this filter you can click "Created" which will set the filter to this

    is:open is:pr author:lwindolf archived:false 

and change `author:` to `user:` like this

    is:open is:pr user:lwindolf archived:false 

This helps me to get an overview on all PRs in all my repos without being review assigned to those.
