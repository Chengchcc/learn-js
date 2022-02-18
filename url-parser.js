function urlParser(str) {
    const regex = /^(?:([A-Za-z]+):)?\/{0,3}([\w.\-]+)(?::(\d+))?(?:\/([^#?]*))?(?:\?([^#]*))?(?:#(.*))?$/
    const [url, protocol, host, port, path, query, hash] = regex.exec(str) || []
    const parserQuery = query || ""
    const searchParams = Object.fromEntries(parserQuery.split('&').map(pair => pair.split('=')).filter(pair => pair[0]).map(pair => ([pair[0], encodeURIComponent(pair[1])])))
    return {
        protocol,
        host,
        port,
        path,
        query,
        hash,
        searchParams
    }
}


console.log(urlParser('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%AD%A3%E5%88%99%20url&fenlei=256&oq=url%2520slash&rsv_pq=b2cadf7c0003e10b&rsv_t=c40dGGpdA3WpZPWkV1bMBQ9Q3bmvQTW6GbQUq81znZUkL%2FcimIe7pO0mPE4&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=5069&rsv_sug3=57&rsv_sug1=48&rsv_sug7=100&sug=%25E6%25AD%25A3%25E5%2588%2599%25E8%25A1%25A8%25E8%25BE%25BE%25E5%25BC%258F&rsv_n=1&rsv_sug2=0&rsv_sug4=5069'))
console.log(urlParser('https://blog.csdn.net/wangchaoqi1985/article/details/82810471/'))