if(process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI :'mongodb://thilak:thilakal123@ds235251.mlab.com:35251/vidjot-prod'}
}else{
    module.exports = {mongoURI : 'mongodb://localhost/vidjot-dev'}
}