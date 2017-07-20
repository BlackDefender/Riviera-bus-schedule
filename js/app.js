(function () {
    var dataObj = [
        {
            busNumber: '1',
            description: 'Маршрут №1 пр-т Добровольского/ул. Паустовского',
            toRiviera: '8:30,8:55,9:25,9:55,10:25,10:55,11:25,11:55,12:25,12:55,13:25,13:55,14:25,14:55,15:25,15:55,16:25,16:55,17:25,17:55,18:25,18:55,19:25,19:55,20:25,20:55,21:25,21:55'.split(','),
            fromRiviera: '9:25,9:55,10:25,10:55,11:25,11:55,12:25,12:55,13:25,13:55,14:25,14:55,15:25,15:55,16:25,16:55,17:25,17:55,18:25,18:55,19:25,19:55,20:25,20:55,21:25,22:10,22:30'.split(',')
        },
        {
            busNumber: '2',
            description: 'Маршрут №2 ул. Ж. Кюри/Бочарова',
            toRiviera: '9:30,10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00'.split(','),
            fromRiviera: '10:00,10:30,11:00,11:30,12:00,12:30,13:00,13:30,14:00,14:30,15:00,15:30,16:00,16:30,17:00,17:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00,21:30,22:00,22:30'.split(',')
        },
        {
            busNumber: '3',
            days: [1,2,3,4,5],
            description: 'Маршрут №3 мост Пересыпь (с Понедельника по Пятницу)',
            toRiviera: '9:00,11:00,13:00,15:00,17:00,19:00,21:00'.split(','),
            fromRiviera: '10:00,12:00,14:00,16:00,18:00,20:00,22:10'.split(',')
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
        },
        {
            busNumber: '8',
            days: [6,0],
            description: 'Маршрут №8 Пантелеймоновская 58 (Суббота, Воскресенье)',
            toRiviera: '9:00,10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00'.split(','),
            fromRiviera: '10:00,11:00,12:00,13:00,14:00,15:00,16:00,17:00,18:00,19:00,20:00,21:00'.split(',')
        }
    ];
    var schedule, settings;
    function setSchedule() {
        var now = new Date();
        var year = now.getFullYear(),
            month = now.getMonth(),
            day = now.getDate(),
            weekDay = now.getDay();
        var toRiviera = [];
        var fromRiviera = [];
        dataObj.forEach(function (item) {
            if(item.days && item.days.indexOf(weekDay) === -1) return;
            item.toRiviera.forEach(function(time){
                var timeArr = time.split(':');
                toRiviera.push({busNumber: item.busNumber, time: new Date(year, month, day, timeArr[0], timeArr[1])});
            });
            item.fromRiviera.forEach(function(time){
                var timeArr = time.split(':');
                fromRiviera.push({busNumber: item.busNumber, time: new Date(year, month, day, timeArr[0], timeArr[1])});
            });
        });
        toRiviera.sort(function(a, b){
            return a.time - b.time;
        });
        fromRiviera.sort(function(a, b){
            return a.time - b.time;
        });
        schedule = {
            to: toRiviera,
            from: fromRiviera
        };
    }

    function renderSchedule() {
        var now = new Date();
        var toRiviera = schedule.to.filter(function(item){
            return item.time >= now && settings.showBuses.indexOf(item.busNumber) >= 0;
        });
        var fromRiviera = schedule.from.filter(function(item){
            return item.time >= now && settings.showBuses.indexOf(item.busNumber) >= 0;
        });

        var scheduleContent = '';
        for(var i = 0; i < Math.max(toRiviera.length, fromRiviera.length); ++i){
            scheduleContent += '<div class="row">';
            if(toRiviera[i]){
                scheduleContent += '<div class="cell">'+toRiviera[i].busNumber+' - '+toRiviera[i].time.getHours()+':'+addPrevZero(toRiviera[i].time.getMinutes())+'</div>';
            }else{
                scheduleContent += '<div class="cell"></div>';
            }
            if(fromRiviera[i]){
                scheduleContent += '<div class="cell">'+fromRiviera[i].busNumber+' - '+fromRiviera[i].time.getHours()+':'+addPrevZero(fromRiviera[i].time.getMinutes())+'</div>';
            }else{
                scheduleContent += '<div class="cell"></div>';
            }
            scheduleContent += '</div>';
        }
        document.querySelector('#schedule .body').innerHTML = scheduleContent;
    }

    function addPrevZero(val) {
        return (val.toString().length === 1) ? '0' + val : val;
    }

    function setScheduleElementHeight() {
        var oneRecordHeight = 25;
        document.querySelector('#schedule .body').style.height = oneRecordHeight * settings.recordsCount + 'px';
    }

    function renderDescription() {
        document.getElementById('description').innerHTML = dataObj.reduce(function (html, item) {
            return (settings.showBuses.indexOf(item.busNumber) >= 0) ? html += '<p>'+item.description+'</p>' : html;
        }, '');
    }

    function getDefaultSettings(){
        return {
            recordsCount: 8,
            showBuses: ['1', '2', '3', '4', '5', '6', '7', '8']
        };
    }

    function loadSettings(){
        if(localStorage){
            if(localStorage.getItem('rivieraBusSchedule')){
                settings = JSON.parse(localStorage.getItem('rivieraBusSchedule'));
            }else{
                settings = getDefaultSettings();
                localStorage.setItem('rivieraBusSchedule', JSON.stringify(settings));
            }
        }else{
            settings = getDefaultSettings();
        }
    }

    function saveAndApplySettings(){
        // задаем количество отображаемых записей
        var recordsCount = parseInt(document.querySelector('#settings--records-count input').value);
        if(recordsCount >= 2 && recordsCount <= 15) settings.recordsCount = recordsCount;

        // задаем отображаемые маршруты
        var routesDOMItemsList = document.querySelectorAll('#settings--routes-list input[type="checkbox"]:checked');
        settings.showBuses = Array.prototype.map.call(routesDOMItemsList, function(item){
            return item.value;
        });

        // сохраняем данные
        localStorage.setItem('rivieraBusSchedule', JSON.stringify(settings));

        // отрисовываем изменения
        setScheduleElementHeight();
        renderSchedule();
        renderDescription()
    }

    function showSettingsPage(){
        document.querySelector('#settings--records-count input').value = settings.recordsCount;
        document.getElementById('settings--routes-list').innerHTML = dataObj.reduce(function (html, item) {
            return html + '<label><input '+ (settings.showBuses.indexOf(item.busNumber) >= 0 ? 'checked' : '') +' type="checkbox" value="'+item.busNumber+'">'+item.description+'</label>';
        }, '');
        document.getElementById('settings').classList.toggle('active');
    }

    function hideSettingsPage() {
        saveAndApplySettings();
        window.scrollTo(0, 0);
        document.getElementById('settings').classList.toggle('active');
    }

    function init(){
        loadSettings();
        setSchedule();
        setScheduleElementHeight();
        renderSchedule();
        renderDescription();
        if(localStorage){
            document.getElementById('open-settings').addEventListener('click', showSettingsPage);
            document.getElementById('close-settings').addEventListener('click', hideSettingsPage);
        }else{
            // при отсутствии localStorage убираем кнопку с настройками. все равно хранить их будет негде.
            document.getElementById('open-settings').style.display = 'none';
        }
        setInterval(renderSchedule, 120000);
    }
    document.addEventListener("DOMContentLoaded", init);
})();