- [x] create a local sync layer using indexedDB
- [x] make the sync layer work
- [x] make the flow work
- [x] make the onboarding work
- [x] make the algorithm show when visualizer is working
- [x] make the solve button disabled when the visualizer is done - [ ] and ask user to click reset to do it again

step 3 :

- [x] implement if cannot reach the end node

step 4 :

- [x] allow user to reselct the start and end nodes

step 5 :

- [x] vercel only run on main branch for now and we will switch to production branch later
- [x] create build system
- [x] fix the deployment on feature branches - (fix the preview deployment issue)
- [x] create ci/cd pipeline
  - [x] ci/cd pipeline should be like
  - [x] listen to push to production branch
  - [x] run my ci/cd pipeline
  - [x] if it passes only then deploy to vercel
  - [x] i want to control the vercel deployment from github actions

step 6:

- [ ] figure out a new way to manage state and solve re-render issues
- [ ] create backend testing
- [ ] create frontend testing using playwright
- [ ] create e2e testing

step 7:

- [ ] add vercel analytics sdk
- [ ] create a staging environment
- [ ] create a production environment
- [ ] create a deployment pipeline

step 8:

- [ ] add sentry
- [ ] add production logging
- [ ] add production linting,formatting
