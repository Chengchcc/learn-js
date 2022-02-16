const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }}';

const data = {
    user: {
        id: 10086,
        name: '山月',
    }
};


function render(template, obj) {
    return template.replace(/\{\{\s*([^\s]+)?\s*\}\}/g, function (match, arg1) {
        const path = arg1.replace(/\[(\w*)\]/g, '.$1.').replace(/\['(\w*)'\]/g, '.$1.')
            .replace(/\["(\w*)"\]/g, '.$1.').split('.').filter(Boolean)
        const o = path.slice(0, -1).reduce((o, p) => {
            return o[p] || {}
        }, obj)
        return o[path.pop()]
    })
}

console.log(render(template, data))