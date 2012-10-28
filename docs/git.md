# git notes

These are notes in progress -- I don't understand git yet, so there will be mistakes in these notes.


## Resources

* [The git website](http://git-scm.com/)
* [Rebasing](http://git-scm.com/book/en/Git-Branching-Rebasing)

## How to clone a repo

    git clone https://github.com/csusbdt/webgame.git

This creates a remote with name `origin.`


## How to ignore files

Create .gitignore in the folder that contains the thing(s) to be ignored and add lines of patterns such as follows.

    *.o
    bin


## How to stage files

    git add <filename> # stage <filename>
    git add .          # stages new and modified, but not deleted
    git add -u         # stages modified and updated, but not new
    git add -A         # stages all


## How to show staged files

    git status -s   # show staged files in short format


## How to unstage files

    git reset       # unstage all


## How to examine differences

    git diff             # working copy versus the staging area
    git diff HEAD        # working copy versus the repository
    git diff --cached    # staging area versus the repository
    git diff --stat      # abbreviated version; works with other options


## How to unstage a file

    git reset HEAD <file>


## How to commit staging area

    git commit -m "message"


## How to modify the last commit without creating a new commit

Do the following after staging new changes.

    git commit --amend


## How to synch with remote repository

Suppose that you just finished working on changes to a project.  Before pushing changes to a remote server, you should make sure that your changes are made against the most recent version of the master branch.

Fetch remote branches.

    git fetch origin

Inspect changes to local master branch before merging with remote master branch (origin/master).

    git log origin/master ^master

Merge the master branch of origin with the working copy.

    git merge origin/master

Stage your changes.

    git add -A

Commit your changes to the current branch.

    git commit

Push master branch to the remote repo.

    git push origin master

