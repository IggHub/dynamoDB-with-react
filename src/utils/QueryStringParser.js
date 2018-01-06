function QueryStringParser(url) {
  let obj = {
    state: '',
    client_id: '',
    scope: '',
    response_type: '',
    redirect_uri: ''
  };

  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  if(queryString){
    queryString = queryString.split('#')[0];
    let queryArr = queryString.split('&');

    for(let i = 0; i < queryArr.length; i++){
      let a = queryArr[i].split('=');
      let paramValue = typeof(a[1]) === 'undefined' ? true : a[1].toLowerCase();
      let paramName = a[0].toLowerCase();

      obj[paramName] = paramValue;
    }
    console.log(obj);
    return obj;
  } else {
    return;
    console.log('no query strings');
  }
}

export default QueryStringParser;
