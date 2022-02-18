class EventBus {
    map = {}
    on(evt, cb){
        const cbs = this.map[evt] || []
        if(cbs.indexOf(cb) == -1){
            cbs.push(cb)
        }
        this.map[evt] = cbs
    }
    once(evt, cb){
        const cbs = this.map[evt] || []
        const fire = (...args)=>{
            cb(...args)
            cbs.splice(cbs.indexOf(fire), 1)
        }
        cbs.push(fire)
        this.map[evt] = cbs
    }
    off(evt, cb){
        const cbs = this.map[evt] || []
        cbs.splice(cbs.indexOf(cb), 1)
    }
    emit(evt, payload){
        const cbs = this.map[evt] || []
        cbs.forEach(cb=>{
            cb(payload)
        })
    }
}