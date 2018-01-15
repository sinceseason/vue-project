let platformNameFilter = (val) => {
    if(val == undefined || val == "")
        return 'label.title';
    return val;
}