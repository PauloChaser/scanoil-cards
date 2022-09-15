# Вёрстка одностраничного сайта под программу топливных карт Scanoil


![image](https://github.com/PauloChaser/scanoil-cards/blob/master/scanoil.gif)

#### Используемые технологии:

+ HTML5/СSS3
+ JavaScript
+ Webpack

##### В проекте реализовано:

+ Адаптивная кроссбраузерная вёрстка страницы согласно макета из Figma
+ Подгрузка вопросов из JSON файла 
+ Подключение карты и отображение точек АЗС из JSON файла
+ Взаимодействие формы с Backend:
  + Валидация формы в реальном времени (ИНН, почта, проверочный код)
  + Вывод данных в форме в зависимости от введенного ИНН (ИП или организация)
+ Переход к пунктам без "якорей"

Для корректного взаимодействия с backend необходимо запустить chrome в режиме cors disabled

##### В терминале (mac) ввести следующую команду:
```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```
##### Запуск проекта:
```
git clone https://github.com/PauloChaser/scanoil-cards
cd scanoil-cards
npm install
npm start
```
