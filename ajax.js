function ajax(options){

    const method = options.method || 'GET';
    const url = options.url || '';
    const data = options.data || null;

    function json2Url(obj){
        let str = '';
        for(let key in obj){
            str += `&${key}=${obj[key]}`;
        }
        return str.slice(1);
    }

    let xhr
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    }else {
        // ie6-ie8
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    if(method.toLowerCase() === 'get'){
        xhr.open(method, url + '?' + json2Url(data), true)
        xhr.send()
    }else {
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(json2Url(data))
    }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.responseText)
                }else {
                    reject(xhr.status)
                }
            }
        }
        xhr.ontimeout = function(){
            reject('timeout')
        }

        xhr.onerror = function(err){
            reject(err)
        }

    })
}