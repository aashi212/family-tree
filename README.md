Models 
- Person	
  - has gender
  - has name
  - has ID (same as name)
- Family
  - has wife
  - has husband
  - has children
- Family Tree
  - is a tree structure
  - each node has a family
  - each node has child families
- Relationships
  - has a family tree
  - runs functions on family tree to get a relation

# Family
    - has husband
    - has wife
    - has children

# Family tree
    - has a root family
    - getFamilyOf(Person)
    - getParentFamliyOf(Person)

# Person
    - has name
    - has gender
    
# Cases
    - Find maternal uncle
        - mother = getParentFamilyOf(Person).wife
        - maternalUncle = getParentFamilyOf(mother).children(filterMales)
        
    - Find sister in law
        - family  = getParentFamilyOf(Person)
        - bhabhis = family.children.(filterMales).forEach(findFamily).map(wives)
        - salis   = getParentFamilyOf(getFamilyOf(Person).wife).chidlren.filterFemales
        
    - Find cousins
        - family  = getParentFamilyOf(Person)
        - paternalCousins = getParentFamilyOf(family.husband).children.map(getFamily).collect(children)
        - maternalCousins = getParentFamilyOf(family.wife).children.map(getFamily).collect(children)
        
    - find grand daughters  
        - family = findFamilyOf(Person)
        - grandDaughters = family.chilren.map(getFamilyOf).collect(children).filterFemales