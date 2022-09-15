import 'swiper/css/bundle';
import 'lightgallery/css/lightgallery-bundle.css'
import './css/style.css';
import '../node_modules/js-datepicker/dist/datepicker.min.css';


import {initHeader} from "./js/header";

import {initForms} from "./js/forms";
import {initMap} from "./js/map";
import {initQuestionAnswer} from "./js/questionAnswer";
import {initAdvantages} from "./js/advantages";
import {initNavigation} from "./js/navigation";


document.addEventListener('DOMContentLoaded', function () {
    initHeader()
    initMap()
    initQuestionAnswer()
    initAdvantages()
    initForms()
    initNavigation()
});

