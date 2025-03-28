var xhr = new XMLHttpRequest();

var url = 'https://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList';

var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'2btSF2E6uTmzg%2Bd5TE77QXgTmB64yxeV4YmQN9fSae97LGTRZywDpUl7HAjs39r6lmeDT0%2FrXHQPYwqM8fGE%2BA%3D%3D';
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10000');

xhr.open('GET', url + queryParams);

let itemsArray = [];
let regItemArray = [];

xhr.onload = function () 
{
    //classification

    console.log(xhr.response);

    let x2js = new X2JS();
    let json = x2js.xml_str2json(xhr.response);
    console.log(json);

    let items = json["ServiceResult"]["MsgBody"]["items"];
    
    console.log(items);

    
    if(items)
    {
        for(let i =0; i<items.length; i++)
        {
            itemsArray.push(items[i]);
        }

        console.log(itemsArray);
        statistics();
    }
}

xhr.send();



function statistics()
{

    let temp = {};
    let restemp = {};
    let res;
    for(let i = 0; i < itemsArray.length; i++)
    {
        let item = itemsArray[i]["classification"];
        let resitem = itemsArray[i]["regDtTm"];
        
        if(!temp[item])
        {
            temp[item] = 1;
        }
        else
        {
            temp[item] += 1;
        }

        if(!restemp[resitem])
        {
            restemp[resitem] = 1;
        }
        else
        {
            restemp[resitem] += 1;
        }

    }

    console.log(temp);
    console.log(restemp);






    // 차트
    const bar = document.getElementById('barChart');

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: ["개", "고양이", "기타"],
            datasets: [{  
                data: [1475, 381, 52],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.58)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 5,
            }], 
        }
    });


    const pie = document.getElementById('pieChart');

    new Chart(pie, {
        type: 'pie',
        data: {
            labels: ["개", "고양이", "기타"],
            datasets: [{
                data: [1475, 381, 52],
                backgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 5
            }], 
        }
    });


    const line = document.getElementById('lineChart');

    new Chart(line, {
        type: 'line',
        data: {
            labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
            datasets: [{
                data: []
            }]
        }
    });
}








