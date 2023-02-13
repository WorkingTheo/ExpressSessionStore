How to run: 
  - navigate to directory containing the session store and follow README.md instructions to run an instance of express with the desired session store
  - in a new terminal, run `node experiment.js`, this will do:
    - measure time taken to:
      - (write) post user data and save it in the session store 
      - (read) retrieve existing user data from session store
      - (update) update existing user data in the session store
    - the measurements are averaged over the 100 users present in `./users/` folder
    - this process is repeated 10 times to further reduce the effect of outliers on the averages
