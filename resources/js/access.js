let xhr = new XMLHttpRequest();

xhr.open("GET", "./shop_data.xlsx");

xhr.responseType = "arraybuffer";


xhr.onload = () => {
    console.log(xhr.response);

    //Unit8Array 객체 생성
    let uint = new Uint8Array(xhr.response);

    // xlsx 라이브러리로 읽기
    let excel = XLSX.read(uint, { type: "array" });

    // 첫번째 Sheet 가져오기
    let sheet = excel.Sheets[excel.SheetNames[0]];

    // sheet를 json 객체로 변환
    let json = XLSX.utils.sheet_to_json(sheet);

    console.log(json);

    // 장소 데이터를 담고있는 배열로 for문 돌리기
    for (var i = 0; i < json.length; i++) {

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(json[i]["Latitude"], json[i]["Longitude"]), // 마커를 표시할 위치
            title: json[i]["업소명"], // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지 
        });

        

        // 마커 배열에 생성된 마커 추가
        markerArray.push(marker);

    }

    // 클러스터러에 마커 배열 추가
    clusterer.addMarkers(markerArray);
}

xhr.send();


// 지도를 표시할 div
var mapContainer = document.getElementById('map');


// 지도 옵션 설정
let mapOption = {
    center: new kakao.maps.LatLng(36.326473, 127.408140), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};


// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);



// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


// 마커 클러스터러를 생성합니다 
var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 6 // 클러스터 할 최소 지도 레벨 
});


// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://cdn-icons-png.flaticon.com/512/12428/12428600.png";


// 마커 이미지의 이미지 크기 입니다
var imageSize = new kakao.maps.Size(36, 36);

// 마커 이미지를 생성합니다    
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

// 마커들을 담을 배열 생성
let markerArray = [];
