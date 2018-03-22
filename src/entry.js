export default function lazyload () {
    return import(/* webpackChunkName: "non-entry" */ './non-entry.js')
        .then(() => {
            console.log('Hello')
        })
}