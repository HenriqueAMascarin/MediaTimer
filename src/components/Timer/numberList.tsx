export function numberList(maxValue: number){
    let array: number[] = [];
    
    for(let i = 0; i <= maxValue; i++){
        array.push(i);
    }
    const finalNumber = array.length;
    
    array.unshift(finalNumber - 1)
    array.push(0)

    return array;
}