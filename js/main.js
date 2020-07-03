'use strict';

//  module3-task2
//  mocks
var titles = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Милое гнездышко для фанатов Анимэ',
  'Чёткая хата',
  'Стандартная квартира в центре'
];
var xCoordinates = [500, 650, 340, 420, 550, 210, 170, 30];
var yCoordinates = [500, 650, 340, 420, 550, 210, 170, 30];
var roomPrices = [42000, 32000, 15000, 23300, 28000, 33500, 44400, 15700];
var roomTypes = ['palace', 'flat', 'house', 'bungalo'];
var roomTime = ['12:00', '13:00', '14:00'];
var roomFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var roomDescriptions = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.'
];
var roomPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  utils
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

//  1. Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
var mainMap = document.querySelector('.map');
var MAIN_MAP_WIDTH = mainMap.offsetWidth;
var MAP_X_MIN = document.querySelector('.map__pin--main img').offsetWidth;
var MAP_X_MAX = MAIN_MAP_WIDTH - MAP_X_MIN;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var AD_QUANTITY = 8;

//  temp
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 8;

var getFewItems = function (array) {
  var newArray = [];
  var itemsQuantity = getRandomNumber(0, array.length);

  for (var i = 0; i < itemsQuantity; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};
// temp

var createAdvertisement = function (imageNumber, title, xCoordinate, yCoordinate, price, description) {
  var advertisement = {
    'author': {
      'avatar': 'img/avatars/user0' + imageNumber + '.png'
    },
    'offer': {
      'title': title,
      'address': xCoordinate + ', ' + yCoordinate,
      'price': price,
      'type': roomTypes[getRandomNumber(0, roomTypes.length - 1)],
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': roomTime[getRandomNumber(0, roomTime.length - 1)],
      'checkout': roomTime[getRandomNumber(0, roomTime.length - 1)],
      'features': getFewItems(roomFeatures),
      'description': description,
      'photos': getFewItems(roomPhotos)
    },
    'location': {
      'x': getRandomNumber(MAP_X_MIN, MAP_X_MAX),
      'y': getRandomNumber(MAP_Y_MIN, MAP_Y_MAX)
    }
  };

  return advertisement;
};

var createAdvertisements = function (num) {
  var advertisements = [];

  for (var i = 0; i < num; i++) {
    advertisements.push(createAdvertisement(i + 1, titles[i], xCoordinates[i], yCoordinates[i], roomPrices[i], roomDescriptions[i]));
  }

  return advertisements;
};

//  2. У блока .map уберите класс .map--faded.
var showMap = function () {
  mainMap.classList.remove('map--faded');
};

showMap();

//  3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
var pinTemplate = document.querySelector('#pin')
                          .content
                          .querySelector('.map__pin');

var createPin = function (advertisement) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');

  pinElement.style.top = advertisement.location.y + 'px';
  pinElement.style.left = advertisement.location.x + 'px';
  pinImage.src = advertisement.author.avatar;
  pinImage.alt = advertisement.offer.title;

  return pinElement;
};

//  4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
var pinsWrapper = document.querySelector('.map__pins');

var renderPins = function (advertisements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(createPin(advertisements[i]));
  }

  pinsWrapper.appendChild(fragment);
};

renderPins(createAdvertisements(AD_QUANTITY));
