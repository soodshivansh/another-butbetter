const getmovies = async (req , res) => {
    const { name } = req.params;
    res.status(200).json({result: name}); 
}

module.exports = getmovies
