import Vue from 'vue';
import VueScreenSize from 'vue-screen-size'
import "./import/modules.js";
$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};

Vue.use(VueScreenSize);

new Vue({
  el: '#wrapper',
  data: {
    show:false,
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
  },
  methods: {

  }
});