import {DUMMY_DOMAIN_LIST} from './fakerDomains'
import {faker} from '@faker-js/faker'

export const createRecentPageEntry = () => ({
  domain: getRandomDomain(), url: faker.internet.domainWord(), ratings: {
    performance: Math.floor(Math.random() * 100),
    seo: Math.floor(Math.random() * 100),
    accessibility: Math.floor(Math.random() * 100),
  },
})

export const getRandomDomain = () => {
  const index = Math.floor(Math.random() * DUMMY_DOMAIN_LIST.length)
  if (!DUMMY_DOMAIN_LIST[index].siteMapFound) {
    return getRandomDomain()
  }
  return DUMMY_DOMAIN_LIST[index]
}

export const DUMMY_RECENT_PAGES_LIST = [
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry(),
  createRecentPageEntry()]