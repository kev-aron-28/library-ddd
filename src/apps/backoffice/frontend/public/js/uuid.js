function generateUUID(element) {
  const uuid = uuidv4();
  
  if(element != null) {
    document.getElementById(element).value = uuid;
  }

  return uuid;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
