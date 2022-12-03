export type PagespeedApiLoadingExperienceV5 = {
    id: string,
    // metrics: {
    //     string: UserPageLoadMetricV5
    // },
    overall_category: string,
    initial_url: string,
    origin_fallback: boolean
}
export type LighthouseAudit = {
    id: string,
    title: string,
    score: number,
    description?: string,
    manualDescription?: string,
    auditRefs: {
        id: string,
        weight: number,
        group: string,
        acronym: string,
        relevantAudits?: string[],
    }[]
}

export type LighthouseResultV5 = {
    requestedUrl: string,
    finalUrl: string,
    lighthouseVersion: string,
    userAgent: string,
    fetchTime: string,
    environment: {
        string: string | number
    }
    runWarnings: string[],
    configSettings: {
        string: string | string[]
    }
    audits: {
        string: {
            id: string,
            title: string,
            description: string,
            score: number | null
            scoreDisplayMode: string,
            displayValue?: string,
            explanation?: string,
            details?: {
                type: string,
                items: {
                    string: string | string[]
                }[]
            }
        }
    },
    categories: {
        seo: LighthouseAudit,
        performance: LighthouseAudit,
        accessibility: LighthouseAudit
    }
}
export type LighthouseRatingReport = {
    seo: LighthouseAudit,
    performance: LighthouseAudit,
    accessibility: LighthouseAudit,
}

export type PageSpeedResponse = {
    kind: string,
    captchaResult: string,
    id: string,
    loadingExperience: PagespeedApiLoadingExperienceV5
    originLoadingExperience: PagespeedApiLoadingExperienceV5
    analysisUTCTimestamp: string,
    lighthouseResult: LighthouseResultV5,
}