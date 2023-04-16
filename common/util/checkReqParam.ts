export const checkReqParam = (req:Array<any>) => {
    let arr = [];
    let arr_val = Object.values(req);
    for(let i=0; i<arr_val.length; i++) {
        if(arr_val[i] === undefined || arr_val[i] === null || arr_val[i] === '') {
            return false;
        } else {
            arr.push(arr_val[i]);
            if(arr_val.length === arr.length) return true;
        }
    }
}