export function compareObjects(objA, objB) {
    // Remove the [[Prototype]] field from both objects
    const cleanObjA = Object.assign({}, objA);
    const cleanObjB = Object.assign({}, objB);
  
    // Convert the cleaned objects to strings and compare them
    const stringA = JSON.stringify(cleanObjA);
    const stringB = JSON.stringify(cleanObjB);
  
    return stringA === stringB;
  }