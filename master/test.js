let data = {"lin":{"level":{"1":[1500,2000],"30":[25535]}}}

function save() {
    let test = new XMLHttpRequest();
    test.open("POST","./master/player.json");
    test.responseType = 'json'
    test.send(JSON.stringify(data));
    test.onload = () => {
        console.log(test.response);
    }
    
}