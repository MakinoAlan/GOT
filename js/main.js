function myFunction(){
    var name = document.getElementById('name').value;
    document.getElementById('test').innerHTML = "";
    document.getElementById('test').innerHTML = "<pre id='result'></pre>";
    document.getElementById('name').value = "";

    myHttp(name);
}

function prefetch(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var obj = JSON.parse(this.responseText);
            return obj;
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function display(obj) {

    //Handle the array inside JSON
    if(Array.isArray(obj)) {
        document.getElementById('result').innerHTML = obj[0]['name'] + '</br>';
        for(var key in obj[0]) {

            document.getElementById('result').innerHTML += key.toUpperCase() + ":" + '</br>';

            if(Array.isArray(obj[0][key])) {
                obj[0][key].forEach(function (element) {

                    //Handle the URL inside the Array
                    //if(key === 'allegiances' && element.substring(0,4) === 'http') {
                    //    document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="houses" onclick="innerHttpClick(this)">' + '    ' + element + '</a>' + '</br>';
                    //}
                    if((key === 'books' || key === 'povBooks' || key === 'allegiances') && element.substring(0,4) === 'http') {
                        //prefetch(element);
                        console.log(prefetch(element)[name]);
                        document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="books" onclick="innerHttpClick(this)">' + '    ' + element + '</a>' + '</br>';
                    }

                    //Handle the rest
                    else {
                        document.getElementById('result').innerHTML += '    ' + element + '</br>';
                    }
                })
                continue;
            }

            //Process and print death Information
            if(key === 'died' && obj[0][key] === "") {
                document.getElementById('result').innerHTML += '    ' + "Not died" + '</br>';
                continue;
            }

            //Process and print empty information
            if(key === 'father' || key === 'mother' || key === 'spouse') {
                if(obj[0][key] === "") {
                    document.getElementById('result').innerHTML += '    ' + "Unknown" + '</br>';
                    continue;
                }
                else {
                    document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="characters"  onclick="innerHttpClick(this)">' + '    ' + obj[0][key] + '</a>' + '</br>';
                    continue;
                }

            }

            //Add hyper link to the link string
            if(key === 'url' && obj[0][key].substring(0,4) === 'http') {
                document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="characters"  onclick="innerHttpClick(this)">' + '    ' + obj[0][key] + '</a>' + '</br>';
                continue;
            }
            if((key === 'spouse' || key === 'father' || key ==='mother') && obj[0][key].substring(0,4) === 'http') {
                document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="characters"  onclick="innerHttpClick(this)">' + '    ' + obj[0][key] + '</a>' + '</br>';
                continue;
            }

            document.getElementById('result').innerHTML += '    ' +  obj[0][key] + '</br>';
        }
    }

    //Handle JSON directly
    else {
        document.getElementById('result').innerHTML = obj['name'] + '</br>';
        for(var key in obj) {

            document.getElementById('result').innerHTML += key.toUpperCase() + ":" + '</br>';

            if(Array.isArray(obj[key])) {
                obj[key].forEach(function (element) {

                    //Handle the URL inside the Array
                    if(key === 'allegiances' && element.substring(0,4) === 'http') {
                        document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="houses" onclick="innerHttpClick(this)">' + '    ' + element + '</a>' + '</br>';
                    }
                    else if((key === 'books' || key === 'povBooks') && element.substring(0,4) === 'http') {
                        document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="books" onclick="innerHttpClick(this)">' + '    ' + element + '</a>' + '</br>';
                    }
                    else if(key === 'characters' && element.substring(0,4) === 'http') {
                        document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="characters" onclick="innerHttpClick(this)">' + '    ' + element + '</a>' + '</br>';
                    }

                    //Handle the rest
                    else {
                        if(element === "") {
                            document.getElementById('result').innerHTML += '    ' + "Unknown" + '</br>';
                        }
                        else {
                            document.getElementById('result').innerHTML += '    ' + element + '</br>';
                        }
                    }
                })
                continue;
            }

            //Process and print death Information
            if(key === 'died' && obj[key] === "") {
                document.getElementById('result').innerHTML += '    ' + "Not died" + '</br>';
                continue;
            }

            //Process and print empty information
            if(key === 'father' || key === 'mother' || key === 'spouse' || key === 'born' || key === 'culture') {
                if(obj[key] === "") {
                    document.getElementById('result').innerHTML += '    ' + "Unknown" + '</br>';
                    continue;
                }
            }

            //Add hyper link to the link string
            if(key === 'url' && obj[key].substring(0,4) === 'http') {
                document.getElementById('result').innerHTML += '<a href="' + "#" + '" class="characters"  onclick="innerHttpClick(this)">' + '    ' + obj[key] + '</a>' + '</br>';
                continue;
            }

            document.getElementById('result').innerHTML += '    ' +  obj[key] + '</br>';
        }
    }
}

function apirender(render) {
    document.getElementById('searchName').innerHTML = render.toUpperCase() + " NAME";
    document.getElementById('test').innerHTML = "";

}

function myHttp(name) {

    //var _url= "https://anapioficeandfire.com/api/characters/" + name;
    var _url= "https://anapioficeandfire.com/api/characters?name=" + name;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
            var obj = JSON.parse(this.responseText);

            //Debug in the console
            var str = JSON.stringify(obj, null, 2);
            console.log(str);

            display(obj);         
    }
    xmlhttp.open("GET", _url, true);
    xmlhttp.send();
}

function innerHttpClick(url) {

    if(url.innerHTML.substring(0,8) === 'http:///') {
        url = url.innerHTML.substring(7);
        log.console(url);
    }
    else {
        url = url.innerHTML;
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var obj = JSON.parse(this.responseText);
            document.getElementById('test').innerHTML = "";
            document.getElementById('test').innerHTML = "<pre id='result'></pre>";
            //console.log(JSON.stringify(obj));
            display(obj);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}
