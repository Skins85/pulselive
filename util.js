export function checkData(arr, id) {
    const filteredResults = arr.filter(obj => {
        return obj.name === id
    })
    return filteredResults.length > 0 ? true : false;
}

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
    checkData,
    createMarkUpFromFeed,
    createMarkUpFromValues,
    positionAssign
}