 const taskInterface=name=>{
    return {
        id:guidGenerator(),
        name:name,
        isDone:false,
        tags:[]
    }
}
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const genarateTasks=(fields,id)=>{
    return{
        name:fields.Text,
        isDone:fields.Status==="Done"?true:false,
        tags:JSON.parse(fields.Tags),
        id:id
    }
}
export {genarateTasks};
export default taskInterface;