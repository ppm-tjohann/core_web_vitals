import axios from 'axios'
import { ObjectId } from 'mongodb'
import { LighthouseAudit, LighthouseRatingReport, PageSpeedResponse } from '../interfaces/PageSpeedResponse'



export const BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const {
    PAGE_SPEED_KEY,
} = process.env

export const getPageRatings = async ( pageLink: string ): Promise<LighthouseRatingReport> => {
    const pageRatings = await fetchRating( pageLink )
    return pageRatings.lighthouseResult.categories
}

export const fetchRating = async ( pageLink: string ): Promise<PageSpeedResponse> => {
    const response = await axios.get(
      `${BASE_URL}?url=${pageLink}&key=${PAGE_SPEED_KEY}&category=SEO&category=PERFORMANCE&category=ACCESSIBILITY&strategy=MOBILE` )
    return response.data
}

