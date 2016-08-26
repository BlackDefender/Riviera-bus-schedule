var dataObj = [
    {
        busNumber: '1',
        description: 'Маршрут №1 пр-т Добровольского/ул. Паустовского',
        toRiviera: '8:30,9:25,9:55,10:25,10:55,11:25,11:55,12:25,12:55,13:25,13:55,14:25,14:55,15:25,15:55,16:25,16:55,17:25,17:55,18:25,18:55,19:25,19:55,20:25,20:55,21:25,21:55'.split(','),
        fromRiviera: '9:25,9:55,10:25,10:55,11:25,11:55,12:25,12:55,13:25,13:55,14:25,14:55,15:25,15:55,16:25,16:55,17:25,17:55,18:25,18:55,19:25,19:55,20:25,20:55,21:25,21:55,22:25'.split(',')
    },
    {
        busNumber: '2',
        description: 'Маршрут №2 ул. Ж. Кюри/Бочарова',
        toRiviera: '9:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,12:00,21:30,22:00'.split(','),
        fromRiviera: '10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30'.split(',')
    },
    {
        busNumber: '4',
        description: 'Маршрут №4 Ж. Кюри/Заболотного (Курская)',
        toRiviera: '8:20,9:20,10:20,11:20,12:20,13:20,14:20,15:20,16:20,17:20,18:20,19:20,20:20,21:20,22:20'.split(','),
        fromRiviera: '9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00'.split(',')
    },
    {
        busNumber: '5',
        description: 'Маршрут №5 ул. Кишиневская (пр-т. Добровольского)',
        toRiviera: '8:15,9:15,10:15,11:15,12:15,13:15,14:15,15:15,16:15,17:15,18:15,19:15,20:15,21:15,22:15'.split(','),
        fromRiviera: '8:45,9:45,10:45,11:45,12:45,13:45,14:45,15:45,16:45,17:45,18:45,19:45,20:45,21:45,23:00'.split(',')
    },
    {
        busNumber: '6',
        description: 'Маршрут №6 ТЦ "Семья"',
        toRiviera: '8:20,8:50,9:20,9:50,10:20,10:50,11:20,11:50,12:20,12:50,13:20,13:50,14:20,14:50,15:20,15:50,16:20,16:50,17:20,17:50,18:20,18:50,19:20,19:50,20:20,20:50,21:20,21:50,22:20'.split(','),
        fromRiviera: '8:50,9:20,9:50,10:20,10:50,11:20,11:50,12:20,12:50,13:20,13:50,14:20,14:50,15:20,15:50,16:20,16:50,17:20,17:50,18:20,18:50,19:20,19:50,20:20,20:50,21:20,21:50,22:20,22:50'.split(',')
    },
    {
        busNumber: '7',
        description: 'Маршрут №7 ул. Паустовского (Днепр.дор.)',
        toRiviera: '8:10,9:10,10:10,11:10,12:10,13:10,14:10,15:10,16:10,17:10,18:10,19:10,20:10,21:10,22:10'.split(','),
        fromRiviera: '8:40,9:40,10:40,11:40,12:40,13:40,14:40,15:40,16:40,17:40,18:40,19:40,20:40,21:40,22:40'.split(',')
    }
];

function renderSchedule() {
    document.getElementById('entry-point').innerHTML = '';
    var settings = getSettings();
    var now = new Date();
    var year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();
    var toRiviera = [];
    var fromRiviera = [];
    dataObj.forEach(function (item) {
        if(settings.showBuses.indexOf(item.busNumber) >= 0){
            item.toRiviera.forEach(function(time){
                var timeArr = time.split(':');
                toRiviera.push({busNumber: item.busNumber, time: new Date(year, month, day, timeArr[0], timeArr[1])});
            });

            item.fromRiviera.forEach(function(time){
                var timeArr = time.split(':');
                fromRiviera.push({busNumber: item.busNumber, time: new Date(year, month, day, timeArr[0], timeArr[1])});
            });
        }
    });

    toRiviera.sort(function(a, b){
        return a.time - b.time;
    });
    toRiviera = toRiviera.filter(function(item){
        if(item.time >= now) return true;
        else return false;
    });

    fromRiviera.sort(function(a, b){
        return a.time - b.time;
    });
    fromRiviera = fromRiviera.filter(function(item){
        if(item.time >= now) return true;
        else return false;
    });

    var table = document.createElement('table');
    var tableContent = '<tbody>';
    var _minutes;
    for(var i = 0; i < Math.max(toRiviera.length, fromRiviera.length); ++i){
        tableContent += '<tr>';
        if(toRiviera[i]){
            _minutes = toRiviera[i].time.getMinutes().toString();
            if(_minutes.length === 1) _minutes = '0'+_minutes;
            tableContent += '<td>'+toRiviera[i].busNumber+' - '+toRiviera[i].time.getHours()+':'+_minutes+'</td>';
        }else{
            tableContent += '<td> </td>';
        }
        if(fromRiviera[i]){
            _minutes = fromRiviera[i].time.getMinutes().toString();
            if(_minutes.length === 1) _minutes = '0'+_minutes;
            tableContent += '<td>'+fromRiviera[i].busNumber+' - '+fromRiviera[i].time.getHours()+':'+_minutes+'</td>';
        }else{
            tableContent += '<td> </td>';
        }
    }
    tableContent += '</tbody>';
    table.innerHTML = tableContent;
    document.getElementById('entry-point').appendChild(table);
}

function renderRecordsCount() {
    var oneRecordHeight = 25;
    if(document.querySelector('#entry-point table td')) oneRecordHeight = document.querySelector('#entry-point table td').clientHeight;
    document.getElementById('entry-point').style.height = oneRecordHeight * getSettings().recordsCount + 'px';
}

function renderDescription() {
    var settings = getSettings();
    var descriptionsList = '';
    dataObj.forEach(function (item) {
        if(settings.showBuses.indexOf(item.busNumber) >= 0){
            descriptionsList += '<p>'+item.description+'</p>';
        }
    });
    document.getElementById('description').innerHTML = descriptionsList;
}

function getDefaultSettings(){
    return {
        recordsCount: 8,
        showBuses: ['1', '2', '4', '5', '6', '7']
    };
};

function getSettings(){
    if(localStorage){
        if(localStorage.getItem('rivieraBusSchedule')){
            return JSON.parse(localStorage.getItem('rivieraBusSchedule'));
        }else{
            localStorage.setItem('rivieraBusSchedule', JSON.stringify(getDefaultSettings()));
            return getDefaultSettings();
        }
    }else{
        return getDefaultSettings();
    }
}

function saveAndApplySettings(){
    var settings = getSettings();

    // задаем количество отображаемых записей
    var recordsCount = parseInt(document.querySelector('#settings--records-count input').value);
    if(recordsCount < 2 || recordsCount > 15 || isNaN(recordsCount)) recordsCount = getDefaultSettings().recordsCount;

    settings.recordsCount = recordsCount;

    // задаем отображаемые маршруты
    var routesDOMItemsList = document.querySelectorAll('#settings--routes-list input[type="checkbox"]');
    var showBuses = [];
    Array.prototype.forEach.call(routesDOMItemsList, function(item){
        if(item.checked){
            showBuses.push(item.value);
        }
    });
    settings.showBuses = showBuses;

    // сохраняем данные
    localStorage.setItem('rivieraBusSchedule', JSON.stringify(settings));

    // отрисовываем изменения
    renderRecordsCount();
    renderSchedule();
    renderDescription()
}

function showSettingsPage(){
    // получаем настройки
    var settings = getSettings();

    // задаем количество отображаемых записей
    document.querySelector('#settings--records-count input').value = settings.recordsCount;

    // задаем отображаемые маршруты
    var routesList = '';
    dataObj.forEach(function (item) {
        var checked = settings.showBuses.indexOf(item.busNumber) >= 0 ? 'checked' : '';
        routesList += '<label><input '+checked+' type="checkbox" value="'+item.busNumber+'">'+item.description+'</label>';
    });
    document.getElementById('settings--routes-list').innerHTML = routesList;

    //показываем страницу настроек
    document.getElementById('settings').classList.toggle('active');
}

function hideSettingsPage() {
    saveAndApplySettings();
    window.scrollTo(0, 0);
    document.getElementById('settings').classList.toggle('active');
}

function init(){
    renderSchedule();
    setInterval(renderSchedule, 120000);
    renderRecordsCount();
    renderDescription()
    if(localStorage){
        document.getElementById('open-settings').addEventListener('click', showSettingsPage);
        document.getElementById('close-settings').addEventListener('click', hideSettingsPage);
    }else{
        // при отсутствии localStorage убираем кнопку с настройками. все равно хранить их будет негде.
        document.getElementById('open-settings').style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", init);
