const defaultItem = {
  type: '',
  value: 0,
  draft: '',
  draftType: ''
}
function get(str) {
  let arr = str.split('');
  let result = 0;

  let j = 0;
  let object = {};
  ["2", "3", "+", "4", "*", "3", "*", "1", "-", "1", "5", "/", "3"]
  for (const [i, s] of arr.entries()) {

    const nextS = arr[i + 1];
    if (i === 0) {
      object[j] = {
        ...defaultItem,
        type: '+',
      }
      j++;
    } else if (s === '+' || s === '-') {
      object[j] = {
        ...defaultItem,
        type: s,
      }
      j++;
    }
    const objectItem = object[j - 1];


    switch (s) {
      case '+':
      case '-':

        break;

      case '*':
      case '/':
        objectItem.draftType = s;

        break;

      default:
        if (typeof parseInt(s) === 'number') {
          if (objectItem.draft) {
            objectItem.draft += s;
          } else {
            objectItem.draft = s;
          }
        }
        break;
    }

    switch (nextS) {
      
      case '*':
      case '/':
      case '+':
      case '-':
      case undefined:

        if (objectItem.draftType) {
          if (objectItem.draftType === '*') {
            objectItem.value = objectItem.value * parseInt(objectItem.draft);
          } else if (objectItem.draftType === '/') {
            objectItem.value = objectItem.value / parseInt(objectItem.draft);
          }
          delete objectItem.draftType
        } else {
          objectItem.value = parseInt(objectItem.draft);
        }
        delete objectItem.draft;

        break;

      default:
        break;
    }
  }

  for (const key in object) {
    console.log(1111,object)
    const item = object[key];
    if (item.type === '+') {
      result += item.value;
    } else if (item.type === '-') {
      result -= item.value;
    }
  }

  return result;
}

window.get = get;