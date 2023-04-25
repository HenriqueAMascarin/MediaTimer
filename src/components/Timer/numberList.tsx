export function numberList(maxValue: number){
    let array: number[] = [];
    
    for(let i = 0; i <= maxValue; i++){
        array.push(i);
        // if(i == maxValue) {
        //     array.push(0);
        // }
    }
    return array;
}