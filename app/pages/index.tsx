import { Container, Grid, Typography } from '@mui/material'
import { Rating } from '../interfaces/RatingInterface'
import RatingList from '../components/Ratings/RatingList'
import { GetStaticProps } from 'next'
import { DomainHandler, RatingHandler } from '../lib/api'
import DomainList, { DomainListOptions } from '../components/Domains/DomainList'
import { Domain } from '../interfaces/DomainInterface'



interface HomeProps {
    ratings: Rating[],
    domains: Domain[],
}

const Home = ( { ratings, domains }: HomeProps ) => {

    console.log( 'Ratings : ', ratings )

    const domainListOptions: DomainListOptions = {
        displayActions: false, displaySitemap: false, displayUpdate: false,
        displayPagesCount: false, averageVariant: 'small', hasDivider: false,
    }

    return (
      <Container>
          <Grid container>
              <Grid item xs={12}>
                  <Typography variant={'h1'}>Dashboard</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                  <DomainList domains={domains} options={domainListOptions}/>
              </Grid>
              <Grid item xs={12} md={6}>
                  <RatingList ratings={ratings}/>
              </Grid>
          </Grid>
      </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const [ domainsRes, ratingsRes ] = await Promise.all( [ DomainHandler.get(), RatingHandler.get() ] )

    return {
        props: { ratings: ratingsRes.data, domains: domainsRes.data },
        revalidate: 10,
    }
}

export default Home