function sendAjax() 
{
    let xhr = new XMLHttpRequest();

    let url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList';

    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '2btSF2E6uTmzg%2Bd5TE77QXgTmB64yxeV4YmQN9fSae97LGTRZywDpUl7HAjs39r6lmeDT0%2FrXHQPYwqM8fGE%2BA%3D%3D';
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000');

    xhr.open('GET', url + queryParams);

    xhr.onload = () => {
        console.log(xhr.response);

        // JSON 객체로 변환
        let json = JSON.parse(xhr.response);
        console.log(json);
    }

    xhr.send();
}

