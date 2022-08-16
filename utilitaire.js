//#region String extensions

/**
 * Vérifie si la chaîne de caractère est une adresse email valide.
 */
 String.prototype.isValidEmail = function () {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this);
}

//#endregion

//#region Array extensions

/**
 * Tri un tableau d'objet suivant la propriété renseignée de façon ascendante.
 * @param {String} key 
 */
Array.prototype.sortByPropertyAsc = function (key){
    if(this.every(obj => typeof obj[key] === 'string'))
        return this.sortByAlphaAsc(key);

    return this.sort((a, b) => a[key] - b[key]);
}

/**
 * Tri un tableau d'objet suivant la propriété renseignée de façon descendante.
 * @param {String} key 
 */
Array.prototype.sortByPropertyDesc = function (key){
    if(this.every(obj => typeof obj[key] === 'string'))
        return this.sortByAlphaDesc(key);

    return this.sort((a, b) => b[key] - a[key]);
}

/**
 * Tri un tableau par date descendant.
 * @param {String} key 
 */
Array.prototype.sortByDateDesc = function (key = null){
    if(key != null)
        return this.sort((a,b) => new Date(b[key]) - new Date(a[key]));

    return this.sort((a,b) => new Date(b) - new Date(a));
}

/**
 * Tri un tableau par date ascendant.
 * @param {String} key 
 */
Array.prototype.sortByDateAsc = function (key = null){
    if(key != null)
        return this.sort((a,b) => new Date(b[key]) - new Date(a[key]));

    return this.sort((a,b) => new Date(a) - new Date(b));
}

/**
 * Tri un tableau par ordre alphabétique.
 * @param {String} key 
 */
Array.prototype.sortByAlphaAsc = function (key = null){
    if(key != null)
        return this.sort((a, b) => a[key].localeCompare(b[key]));
    
    return this.sort((a, b) => a.localeCompare(b));
}

/**
 * Tri un tableau à l'inverse de l'ordre alphabétique.
 * @param {String} key 
 */
Array.prototype.sortByAlphaDesc = function (key = null){
    if(key != null)
        return this.sort((a, b) => b[key].localeCompare(a[key]));
    
    return this.sort((a, b) => b.localeCompare(a));
}

/**
 * Compare deux tableaux pour savoir s'ils contiennent les mêmes données.
 * @param {Array} arrayToCompare 
 */
Array.prototype.hasSameData = function (arrayToCompare) {

    if (!Array.isArray(arrayToCompare))
        return false;

    if (this.length != arrayToCompare.length)
        return false;

    return this.every(data => arrayToCompare.includes(data));
}

/**
 * Compare deux tableaux d'objets pour savoir s'ils contiennent les mêmes données.
 * @param {Array} arrayObjectToCompare 
 */
Array.prototype.arrayObjectHasSameData = function (arrayObjectToCompare){
    if (!Array.isArray(arrayObjectToCompare))
        return false;

    if (this.length != arrayObjectToCompare.length)
        return false;

    return arrayObjectToCompare.every(objToCompare => this.some(obj => objectsAreEqual(obj, objToCompare)));
}

/**
 * Groupe les données d'un tableau d'objets en fonction de la clé renseignée.
 * @param {String} key 
 */
Array.prototype.groupBy = function (key) {
    return this.reduce(function (callback, current) {
        let prop = current[key];

        if(!callback[prop])
            callback[prop] = [];

        callback[prop].push(current);
        return callback;
    }, []);
}

//#endregion

//#region Object extensions

/**
 * Vérifie si deux objets contiennent les mêmes données.
 * 
 * @param {Object} object
 * @param {Object} objectToCompare
 */
function objectsAreEqual(object, objectToCompare){
    if(typeof object !== "object" || typeof objectToCompare !== "object")
        return false;

    if(object == null || objectToCompare == null)
        return false;

    if(Object.keys(object).length !== Object.keys(objectToCompare).length)
        return false;
    
    for(const prop in object){
        if(objectToCompare[prop] == undefined)
            return false;

        if(Array.isArray(object[prop])){
            if(!object[prop].arrayObjectHasSameData(objectToCompare[prop]))
                return false;

            return true;
        }
        
        if(object[prop] !== objectToCompare[prop])
            return false;
    }

    return true;
}

/**
 * Créer une copie complète de l'objet.
 * @param {Object} object 
 */
function objectCopy(object){
    let copy = {...object};

    for(const prop in object){
        if(Array.isArray(object[prop]))
            copy[prop] = copy[prop].map(obj => objectCopy(obj));
    }
    
    return copy;
}

//#endregion
