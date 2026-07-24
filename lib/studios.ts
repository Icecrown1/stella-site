// Общие данные по студиям — единый источник для Footer, JSON-LD (в
// app/page.tsx) и городских страниц /dushanbe, /hudzhand.
// ВАЖНО: при изменении адреса меняй здесь — остальные места это читают.

export type Studio = {
  id: string;
  city: 'Душанбе' | 'Худжанд';
  address: string;
  landmark: string;
  photo?: string;
  // Прямые ссылки на карточку организации (не просто поиск по адресу) —
  // заполнить, когда пришлёшь ссылки на конкретные точки в Яндекс.Картах
  // и Google Maps. Пока пусто — страницы городов используют запасной
  // вариант — поиск по адресу.
  yandexMapUrl?: string;
  googleMapUrl?: string;
};

export const STUDIOS: Studio[] = [
  {
    id: 'dushanbe-huseynzoda',
    city: 'Душанбе',
    address: 'ул. Хусейнзода 29',
    landmark: 'Ориентир: магазин Pari Beauty, ресторан «Оригами», Дом печати'
  },
  {
    id: 'dushanbe-rasulov',
    city: 'Душанбе',
    address: 'ул. Расулов 9/1',
    landmark: 'Ориентир: фабрика «Ширин», Дом «Душанбе Сити», ресторан «Терасса»'
  },
  {
    id: 'dushanbe-zavkibekova',
    city: 'Душанбе',
    address: 'ул. Завкибекова, 10, клиника «Гиппократ»',
    landmark: 'Ориентир: стадион «Спартак», за лабораторией «Гемотест»'
  },
  {
    id: 'khujand-nabiev',
    city: 'Худжанд',
    address: 'проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж',
    landmark: 'Ориентир: рядом с ЗАГСом и Хукуматом'
  }
];

export function getStudiosByCity(city: 'Душанбе' | 'Худжанд'): Studio[] {
  return STUDIOS.filter((s) => s.city === city);
}
