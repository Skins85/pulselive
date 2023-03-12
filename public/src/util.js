/**
 * Check an array of objects with a 'name' key returns a defined value.
 *
 * @param {Array} arr - The array of objects.
 * @param {String} id - The ID to filter on.
 * @return {Number} - The number of values returned from the filter.
 **/

 export function checkDataExists(arr, id) {
    const filteredResults = arr.filter(obj => {
        return obj.name === id
    })
    return filteredResults.length > 0 ? true : false;
}

/**
 * Create an element with two spans (label and value) after filtering an array of objects.
 *
 * @param {Array} arr - The array of objects.
 * @param {String} id - The ID to filter on.
 * @param {String} tag - Stringified representation of HTML tag, e.g. 'p'
 * @param {String} label - Text value for the label span.
 * @return {HTML element} - The label and value separated into spans with a wrapping element as defined.
 **/
export function createMarkUpFromFeed(arr, id, tag, label) {
    const filteredResults = arr.filter(obj => {
        return obj.name === id
    })
    
    const el = document.createElement(tag);
    const spanLabel = document.createElement('span');
    const spanValue = document.createElement('span');

    if (filteredResults.length > 0) {
        spanLabel.append(label);
        spanValue.append(filteredResults[0]['value'])
    } else {
        spanLabel.append(label);
        spanValue.append(0)
    }
    el.append(...[spanLabel, spanValue]);
    return el;
}

/**
 * Create an element with two spans (label and value) passing in known values.
 *
 * @param {HTML element} el - The HTML element to append to.
 * @param {String} label - Text value for the label span.
 * @param {String} value - Text value for the value span.
 * @return {HTML element} - The label and value separated into spans with a wrapping element as defined.
 **/
export function createMarkUpFromValues(el, label, value) {
    let spanLabel = document.createElement('span');
    spanLabel.classList.add('stat__single__left');
    spanLabel.append(label);
    
    let spanValue = document.createElement('span');
    spanValue.classList.add('stat__single__right');
    spanValue.append(value);
    
    el.append(...[spanLabel, spanValue]);
    return el;
}

/**
 * Transform a position code into a readable word.
 *
 * @param {String} positionCode - The player code.
 * @return {String} - The readable word equivalent of the player code.
 **/
export function positionAssign(positionCode) {
    let positionWord;
    switch(positionCode) {
        case 'D':
            positionWord = 'Defender';
            break;
        case 'M':
            positionWord = 'Midfielder';
            break;
        case 'F':
            positionWord = 'Forward';
            break;
        default:
            positionWord = 'Goalkeeper';
      }
    return positionWord;
}

export default {
    checkDataExists,
    createMarkUpFromFeed,
    createMarkUpFromValues,
    positionAssign
}