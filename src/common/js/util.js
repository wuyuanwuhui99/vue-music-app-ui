function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function getValue(data,props,defaultValue){
  if(typeof data !== "object" || !data){
    return defaultValue
  }
  if(typeof keys == "string"){
    props = props.split(".")  
  }  
  let result = data;
  for(let i = 0; i < props.length; i++){
    if(i != props.length - 1){
      result = result[props[i]] || {}
    }else{
      result = result[props[i]]
    }
  }
  if(result === undefined || result === null){
    result = defaultValue;
  }
  return result
}

export function setValue(data,props,value){
  if(typeof data !== "object" || !data){
    return 
  }
  if(typeof keys == "string"){
    props = props.split(".")  
  } 
  let result = data;
  for(let i = 0; i < props.length; i++){
    if(i != props.length - 1){
      if(!result[props[i]])result[props[i]] = {};
      result = result[props[i]]
    }else{
      result[props[i]] = value;
    }
  }
}
