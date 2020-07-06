'use strict';

//  module3-task2
//  mocks
var TITLES = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Милое гнездышко для фанатов Анимэ',
  'Чёткая хата',
  'Стандартная квартира в центре'
];
var X_COORDINATES = [500, 650, 340, 420, 550, 210, 170, 30];
var Y_COORDINATES = [500, 650, 340, 420, 550, 210, 170, 30];
var ROOM_PRICES = [42000, 32000, 15000, 23300, 28000, 33500, 44400, 15700];
var ROOM_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOM_TIME = ['12:00', '13:00', '14:00'];
var ROOM_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ROOM_DESCRIPTIONS = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая квартирка на чердаке. Для самых не требовательных.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.'
];
var ROOM_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TypeValues = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

//  utils
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var generateNumbersArray = function (firstNum, lastNum) {
  var numbersArray = [];

  for (var i = firstNum; i <= lastNum; i++) {
    numbersArray.push(i);
  }

  return numbersArray;
};

//  1. Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
var mainMap = document.querySelector('.map');
var MAIN_MAP_WIDTH = mainMap.offsetWidth;
var MAP_X_MIN = document.querySelector('.map__pin--main img').offsetWidth;
var MAP_X_MAX = MAIN_MAP_WIDTH - MAP_X_MIN;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var AD_QUANTITY = 8;
var IMAGES_NUMBERS = generateNumbersArray(1, 8);

//  temp
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 8;

var getFewItems = function (array) {
  var newArray = [];
  var itemsQuantity = getRandomNumber(1, array.length);

  for (var i = 0; i < itemsQuantity; i++) {
    newArray.push(array[i]);
  }

  return newArray;
};
// temp

var createAdvertisement = function (index) {
  var advertisement = {
    'author': {
      'avatar': 'img/avatars/user0' + IMAGES_NUMBERS[index] + '.png'
    },
    'offer': {
      'title': TITLES[index],
      'address': X_COORDINATES[index] + ', ' + Y_COORDINATES[index],
      'price': ROOM_PRICES[index],
      'type': ROOM_TYPES[getRandomNumber(0, ROOM_TYPES.length - 1)],
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': ROOM_TIME[getRandomNumber(0, ROOM_TIME.length - 1)],
      'checkout': ROOM_TIME[getRandomNumber(0, ROOM_TIME.length - 1)],
      'features': getFewItems(ROOM_FEATURES),
      'description': ROOM_DESCRIPTIONS[index],
      'photos': getFewItems(ROOM_PHOTOS)
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
    advertisements.push(createAdvertisement(i));
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
  var pinsFragment = document.createDocumentFragment();

  for (var i = 0; i < advertisements.length; i++) {
    pinsFragment.appendChild(createPin(advertisements[i]));
  }

  pinsWrapper.appendChild(pinsFragment);
};

renderPins(createAdvertisements(AD_QUANTITY));

//  module3-task3
//  1. На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления.
var HOUSE_PHOTO_WIDTH = 45;
var HOUSE_PHOTO_HEIGHT = 40;
var HOUSE_PHOTO_ALT = 'Фотография жилья';

var cardTemplate = document.querySelector('#card')
                            .content
                            .querySelector('.map__card');

var fillFeaturesList = function (features) {
  var featuresFragment = document.createDocumentFragment();

  features.forEach(function (item) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + item;
    featureItem.textContent = item;
    featuresFragment.appendChild(featureItem);
  });

  return featuresFragment;
};

var fillPhotosList = function (photos) {
  var photosFragment = document.createDocumentFragment();

  photos.forEach(function (item) {
    var photoItem = document.createElement('img');
    photoItem.className = 'popup__photo';
    photoItem.src = item;
    photoItem.width = HOUSE_PHOTO_WIDTH;
    photoItem.height = HOUSE_PHOTO_HEIGHT;
    photoItem.alt = HOUSE_PHOTO_ALT;
    photosFragment.appendChild(photoItem);
  });

  return photosFragment;
};

var createAdvertisementCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  var offer = data.offer;

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TypeValues[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ' , выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').append(fillFeaturesList(offer.features));
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').append(fillPhotosList(offer.photos));

  return cardElement;
};

//  2. Вставьте полученный DOM-элемент в блок .map перед блоком .map__filters-container.
document.querySelector('.map__filters-container').before(createAdvertisementCard(createAdvertisements(AD_QUANTITY)[0]));
