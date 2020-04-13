import Vue from 'vue';
import VueScreenSize from 'vue-screen-size';
import VueSlider from 'vue-slider-component';
import { format, formatDistance, formatRelative, subDays } from './import/date_fns';
import AirbnbStyleDatepicker from './import/vue-airbnb-style-datepicker';
import "./import/modules.js";
$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};
var datepickerOptions = {
  
}
Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.use(VueScreenSize);

let app = new Vue({
  el: '#wrapper',
  components: {
      VueSlider
  },
  data: {
    showNav:false,
    dateFormat: 'YYYY-MM-D',
    dateOne: '',
    dateTwo: '',
    value: 0,
    minDate: '',
    navList: [
      { 
        navOption: 'Финансовые продукты',
        navLinks: '/financeProducts.html'
      },
      { 
        navOption: 'Практика ФАС РФ',
        navLinks: '/FAS.html'
      },
      { 
        navOption: 'Блог',
        navLinks: '/Blog.html'
      }
    ],
    stepsList: [
      { 
        stepsImg: '/img/step1.svg',
        stepsAlt: 'Photo of the first step',
        stepsText: 'Оформите заявку',
        stepsDesc: 'Оформите заявку на сайте или закажите обратный звонок, наш специалист свяжется с вами'
      },
      { 
        stepsImg: '/img/step2.svg',
        stepsAlt: 'Photo of the second step',
        stepsText: 'Отправьте документы',
        stepsDesc: 'Отправьте нам пакет документов, а мы подготовим заявку соответствующим образом'
      },
      { 
        stepsImg: '/img/step3.svg',
        stepsAlt: 'Photo of the third step',
        stepsText: 'согласование и одобрение',
        stepsDesc: 'Получите предложение от нескольких банков и выберите максимально комфортное для вас'
      }
    ],
    calcList: [
      { 
        calcText: 'Банковские гарантии по 223–ФЗ и 185–ФЗ',
      },
      { 
        calcText: 'Тендерный займ',
      },
      { 
        calcText: 'Банковские гарантии по 44–ФЗ',
      },
      { 
        calcText: 'Кредиты на исполнение заказа',
      }
    ],
    productsList: [
      { 
        productsTitle: 'Банковские гарантии по 223–ФЗ и 185–ФЗ',
        productsPrice: '700',
        productsItemListText1: 'Работа со сложными заказчиками',
        productsItemListText2: 'Подбор банков под конкретную сделку',
        productsItemListText3: 'Согласование сделок на уровне руководства банка',
      },
      { 
        productsTitle: 'Тендерный займ',
        productsPrice: '700',
        productsItemListText1: 'Работа со сложными заказчиками',
        productsItemListText2: 'Подбор банков под конкретную сделку',
        productsItemListText3: 'Согласование сделок на уровне руководства банка',
      },
      { 
        productsTitle: 'Банковские гарантии по 44–ФЗ',
        productsPrice: '900',
        productsItemListText1: 'Выпуск банковской гарантии за 1–3 дня',
        productsItemListText2: 'Банковская гарантия без залога, открытия счета и поручительства',
        productsItemListText3: 'Индивидуальные условия сотрудничества для каждого клиента',
      },
      { 
        productsTitle: 'Кредиты на исполнение заказа',
        productsPrice: '700',
        productsItemListText1: 'Работа со сложными заказчиками',
        productsItemListText2: 'Подбор банков под конкретную сделку',
        productsItemListText3: 'Согласование сделок на уровне руководства банка',
      }
    ],
    companyList: [
      { 
        companyListText: 'Скорость',
      },
      { 
        companyListText: 'Индивидуальный подход',
      },
      { 
        companyListText: 'На связи до выдачи БГ, прямая работа с банками',
      },
      { 
        companyListText: 'Полное сопровождение',
      },
      { 
        companyListText: 'Высокая вероятность добрения БГ',
      },
    ],
    newsList: [
      { 
        newsPic: '/img/newsPic1.png',
        newsText: 'Плюсы и минусы банковских гарантий',
      },
      { 
        newsPic: '/img/newsPic2.png',
        newsText: 'Банковская гарантия: ее риски при использовании в тендерах',
      },
      { 
        newsPic: '/img/newsPic3.png',
        newsText: 'Суд на защите банковской гарантии, интересов принципала, гаранта и бенефициара',
      },
    ],
    footerListOne: [
      { 
        footerLink: 'Банковские Гарантии 44-ФЗ',
      },
      { 
        footerLink: 'Исполнение Контракта',
      },
      { 
        footerLink: 'Участие в Тендере',
      },
      { 
        footerLink: 'Возврат Аванса',
      },
      { 
        footerLink: 'Гарантийные Обязательства',
      },
    ],
    footerListTwo: [
      { 
        footerLink: 'Исполнение Контракта',
      },
      { 
        footerLink: 'Возврат Аванса',
      },
      { 
        footerLink: 'Участие В Торгах',
      },
      { 
        footerLink: 'Возврат Аванса',
      },
      { 
        footerLink: 'Гарантийные Обязательства',
      },
    ],
  },
  methods: {
     formatDates(dateOne, dateTwo) {
      let formattedDates = ''
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat)
      }
      if (dateTwo) {
        formattedDates += ' - ' + format(dateTwo, this.dateFormat)
      }
      return formattedDates
    }
  },
});

var timerID = setInterval(updateTime, 1000);
updateTime();
function updateTime() {
  var cd = new Date();
  app.minDate = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ';
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}