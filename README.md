# Building and Running

- Install

  ```bash
  npm install
  ```

- Lint and run tests

  ```bash
  npm run build
  ```

- Run CLI

  ```
  npm start
  ```




#### Third party libraries

- **mocha** : for organizing tests
- **eslint**  : for linting




# About Solution

#### **Assumptions**

 - names of family members are unique, or else are appended with I, II etc.



#### **Models** 

- **Person**	

  - has gender
  - has name
  - has ID (lowercase of name)
- **Family**
  - has wife
  - has husband
  - has children
- **Family Tree**
  - is a tree structure
  - each node has a family 
  - each node can have child nodes (containing family of children)
- **Relationships**
  - has a family tree
  - runs functions on family tree to get a relation



#### **Command Interpreter Design**

- **CLI** 
  - listens to console
  - invokes **CommandRunner** for every input
- **Command Runner**
  - contains list of commands
  - for every input, finds a relevant command
  - invokes command and returns output
- **Command**
  - Is super class of all commands
  - appliesTo(input) : returns true if command applies to user input
  - execute(input) : runs user command on relationships and returns output
  - usage() : returns sample usage for a command
- **FindRelation Command**
  - command to find persons of a particular relation
  - e.g Person=<name> ; Relative = <relative-name>
- **FindRelative Comamnd**
  - command to find relation to a relative 
  - e.g. Person=<name> ; Relation = <relation-name>
- **AddChild Command**
  - adds a child to a mother in family tree
  - e.g. Mother=<name> ; Son/Daughter = <child-name>
- **MostGirlChildren Command**
  - returns mothers with most number of girl children
  - e.g Most Girl Children