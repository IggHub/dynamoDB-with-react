/**
* Create UUID based on timestamp
* source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
**/

function GenerateUUID() { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        let uuid = (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        //console.log(uuid);
        return uuid;
    });
}

export default GenerateUUID;
