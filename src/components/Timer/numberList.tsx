export function numberList(maxValue: number){
    let array: {number: number, key: string}[] = [];
    
    for(var i = 0; i <= maxValue; i++){
        array.push({number: i, key: Math.random().toString()});
    }
    
    return array;
}