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
    
    let temp = {};      //구분
    let restemp = {};   //연도별
    for(let i = 0; i < itemsArray.length; i++)
    {
        let item = itemsArray[i]["classification"]; //유기동물 구분(1 : 개 2 : 고양이 3 : 기타동물)
        let resitem = itemsArray[i]["regDtTm"]; //게시글 등록일
        
        if(itemsArray[i]["classification"] == "1")
            {
            item = "개";
        } else if(itemsArray[i]["classification"] == "2")
            {
            item = "고양이";
        } else if(itemsArray[i]["classification"] == "3")
            {
            item = "기타동물";
        }


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

    var test = {};
    var test2 = {};



    // 구분 : 동물수
    var entries = Object.entries(temp);
    
    for (var i = 0; i < entries.length; i++) 
        {
        var gubun = entries[i][0]; // 구분
        var count = entries[i][1]; // 수
        
        if (test[gubun]) 
            {
            test[gubun] += count; // 기존 연도 데이터가 있으면 유기동물 수 더하기
        }
        else 
        {
            test[gubun] = count; // 없으면 새로 추가
        }
    }
    
    // 연도 : 유기동물수
    var entries2 = Object.entries(restemp);
    
    for (var i = 0; i < entries2.length; i++) 
        {
        var date = entries2[i][0]; // 연도
        var count = entries2[i][1]; // 수
        var year = date.split('-')[0];

        if (test2[year]) 
            {
            test2[year] += count; // 기존 연도 데이터가 있으면 유기동물 수 더하기
        } 
        else 
        {
            test2[year] = count; // 없으면 새로 추가
        }
    }


    var labels = Object.keys(test).sort(); // 구분 정렬
    var labels2 = Object.keys(test2).sort(); // 연도 정렬

    var dataValues = []; // 구분별 데이터 값
    var dataValues2 = []; // 연도별 데이터 값

    for (var i = 0; i < labels.length; i++) {
        var gubun = labels[i];
        dataValues.push(test[gubun]);
    }

    for (var i = 0; i < labels2.length; i++) {
        var year = labels2[i];
        dataValues2.push(test2[year]);
    }




    // 차트
    const bar = document.getElementById('barChart');

    new Chart(bar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{  
                data: dataValues,
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
        },
        options: {
            plugins:{
                legend:{
                    display: false
                },
            }
        }
    });


    const pie = document.getElementById('pieChart');

    new Chart(pie, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: [
                    'rgba(54, 162, 235)',
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)'
                    ],
                    borderColor: 'white',
                    borderWidth: 1,
            }], 
        }
    });

    const line = document.getElementById('lineChart');

    new Chart(line, {
        type: 'line',
        data: {
            labels: labels2,
                datasets: [{
                    data: dataValues2,
                    borderWidth: 2
                }],                    
        },
        options: {
            plugins:{
                legend:{
                    display: false
                },
            },
            elements: {
                point: {
                radius: 0,
            },
        },
        }
    });
}



    // pdf 다운로드


    // PDF 다운로드 버튼 클릭 이벤트
    document.querySelector(".down-btn").addEventListener("click", () => {
    // PDF로 변환할 div 태그 불러오기
    let pdfContent = document.querySelector(".chart");

    // 태그를 canvas로 변환
    html2canvas(pdfContent).then((canvas) => {
        // canvas 크기 가져오기
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        // canvas를 이미지로 변환
        let img = canvas.toDataURL("image/png");

        // jsPDF 객체 가져오기
        let { jsPDF } = window.jspdf;

        // A4 용지 크기 기준 PDF 객체 생성 (세로 방향)
        let pdf = new jsPDF("p", "mm", "a4");

        // A4 크기: 210mm × 297mm
        let imgWidth = 210;  // A4 너비
        let imgHeight = (canvasHeight * imgWidth) / canvasWidth; // 비율 유지

        // PDF 페이지에 이미지 추가
        pdf.addImage(img, "PNG", 0, 10, imgWidth, imgHeight);

        // PDF 다운로드
        pdf.save("유기동물_현황.pdf");
    });
});