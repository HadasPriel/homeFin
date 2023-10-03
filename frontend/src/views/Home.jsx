import { Hero } from '../cmps/home/Hero'
import { HomeHeader } from '../cmps/home/HomeHeader'


export const Home = () => {

    return (
        <section className="home-page main-layout" >
            <HomeHeader />
            <Hero />
        </section>
    )
}

