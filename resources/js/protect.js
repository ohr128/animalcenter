


var xhr = new XMLHttpRequest();

var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'2btSF2E6uTmzg%2Bd5TE77QXgTmB64yxeV4YmQN9fSae97LGTRZywDpUl7HAjs39r6lmeDT0%2FrXHQPYwqM8fGE%2BA%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5'); /**/

xhr.open('GET', url + queryParams);


xhr.onload = function () {
    console.log(xhr.response);

    let x2js = new X2JS();
    let json = x2js.xml_str2json(xhr.response);
    console.log(json);

    

}


