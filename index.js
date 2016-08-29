'use strict'
function aop(f) {
  return new aop.prototype.init(f)
}
aop.prototype = {
    init: function(f) {
      this.f = f
      this._before = []
      this._after = []
      return this
    },
    before : function (before) {
      if(this._after.length > 0) {
        throw new Error(`'before()' function must be called before 'after()'`)
      }
      this._before.push(before)
      return this
    },
    after: function (after) {
      this._after.push(after)
      return this
    },
    end: function (f) {
      f = f || function () {}
      function _chain(functionArray, index, chain) {
        if (functionArray.length === 0 || index === -1) return chain
        return _chain(functionArray, index - 1, functionArray[index].bind(this, chain))
      }
      return _chain(this._before, this._before.length - 1, function () {
        const result = this.f()
        const afterFunction = _chain(this._after, this._after.length - 1, f)
        if (result instanceof Promise) {
          result.then(afterFunction)
        }else {
          afterFunction()
        }
      }.bind(this))
    }
}
aop.prototype.init.prototype = aop.prototype;

module.exports = aop
