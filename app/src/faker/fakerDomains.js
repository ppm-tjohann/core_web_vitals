export const createDomainEntry = (
    name, favicon, siteMapFound = false, pages) => ({
  name, favicon, siteMapFound, pages, ratings: {
    seo: Math.floor((Math.random() * 100)),
    performance: Math.floor((Math.random() * 100)),
    accessibility: Math.floor((Math.random() * 100)),
  },
})

export const DUMMY_DOMAIN_LIST = [
  createDomainEntry('waldkliniken-eisenberg.de',
                    'https://www.waldkliniken-eisenberg.de/favicon.ico', true,
                    10),
  createDomainEntry('landkreis-landshut-erleben.de',
                    'https://www.landkreis-landshut-erleben.de/img/icon.png',
                    true, 5),
  createDomainEntry('ruhrradiologie.de',
                    'https://ruhrradiologie-cms.fra1.digitaloceanspaces.com/ff56b436c55d1cb9f118aa284bbc2d08.png',
                    false, null),
  createDomainEntry('paulaner-presse.de',
                    'https://www.paulaner-presse.de/favicon.png', true, 1)]