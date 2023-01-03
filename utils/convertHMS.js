const convertHMS = (value) => {
    let hours   = Math.floor(value / 3600);
    let minutes = Math.floor((value - (hours * 3600)) / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);


    if (hours   < 10 && hours > 0) {hours   = "0" + hours;}
    if (minutes < 10 && minutes > 0) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return (hours ? hours+':' : '') + (minutes ? minutes + ':' : '') + seconds;
}

export default convertHMS