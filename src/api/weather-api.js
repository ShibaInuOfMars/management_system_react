import jsonp from 'jsonp';
import {message} from 'antd';

const KEY = "KnHVOML3NCoHEjn8SsDESlKnGsexhhr7";
export const getWeather = (city="东莞") => {
    return new Promise((resolve, reject) => {

        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=${KEY}`;

        jsonp(url,{}, (err, data)=> {

            if (err) {

                message.error("网络异常: " + err.message);

            } else {

                // console.log(data);

                if (data.error === 0 ) {

                    let result = data.results[0].weather_data[0];

                    let picURLday = result.dayPictureUrl

                    let picURLnight = result.nightPictureUrl;

                    let notice = result.weather + result.temperature;

                    resolve({picURLday, picURLnight, notice});
                }
            }
        });
    });

};