let add = function(req, res){
    let n1 = parseInt(req.params.n1);
    let n2 = parseInt(req.query.n2);

    let total = n1+n2;
    res.status(200).json({'Result is':total})
}

module.exports= {
    add 
};