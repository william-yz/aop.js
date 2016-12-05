# aop.js

## usage
```javascript
var originFunction = function () {
  return new Promise(function (resolve, reject) {
    console.log('in origin function')
    setTimeout(function () {
      resolve('pass to after')
    }, 1000)
  })
}

var aopi = aop(originFunction)
.before(function a(next) {
  console.log('1')
  next('pass to next')
})
.before(function b(next,a) {
  console.log('here in next :' + a)
  console.log('2')
  next()
})
.before(function (next) {
  console.log('after 2 s')
  setTimeout(next, 2000)
})
.before(function (next) {
  console.log('after 1 s')
  setTimeout(next, 1000)
})
.before(function c(next) {
  console.log('3')
  next()
})
.after(function d(next, b) {
  console.log(b)
  next()
})
.after(function d(next) {
  console.log('after 3 s')
  setTimeout(next, 3000)
})
.end(function () {
  console.log('end')
})

aopi()
```
