//date
module.exports = {
    format_date: (date)=>{
        return`${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            //add years to the year value
            new Date(date).getFullYear()
        }`
    }
};