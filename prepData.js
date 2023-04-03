
const fs = require('fs')
const data = require('./data/language-tree.json')

const restructureJSON = (obj) => {
  let root = obj.Root ? obj.Root : obj;
  if(root.Node) {
    if(root.Node.Label) { root.name = root.Node.Label }
    if(root.Node.LanguageTreeId) { root.id = root.Node.LanguageTreeId } 
    if(root.Node.Language) { root.language = root.Node.Language }   
    delete root.Node
  }
  
  let children = []

  if(root.Children) {
    for(let i = 0; i < root.Children.length; i ++ ){
      children.push(restructureJSON(root.Children[i]))
    }
    delete root.Children
  }

  root.children = children;
  return root;
  }

const saveData = () => {
  let prepped = restructureJSON(data)
  console.log("prepped", JSON.stringify(prepped))
  fs.writeFile("./data/prepped-language-tree.json", JSON.stringify(prepped), (err) => {
      if(err){
          console.log("There was an error. ", err);
          return
      } else {
          console.log("Successfully saved file.");
          return
      }
  })
}

saveData()